-- ============================================================================
-- CareComply UK — Supabase schema
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query)
-- ============================================================================

-- ---------- Extensions ----------
create extension if not exists "pgcrypto";

-- ============================================================================
-- ADMIN USERS
-- Marks which Supabase Auth users are allowed into /admin.
-- After the admin signs up (Supabase Auth → Users → Add user), insert their
-- user id here. See README "Setting up the admin login" for the exact steps.
-- ============================================================================
create table if not exists admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table admin_users enable row level security;

-- Only an existing admin (or the service role, used server-side) can read this table.
create policy "Admins can read admin_users"
  on admin_users for select
  using (auth.uid() = user_id);

-- Helper function: is the current request from a logged-in admin?
create or replace function is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from admin_users where user_id = auth.uid()
  );
$$;

-- ============================================================================
-- PRODUCTS
-- ============================================================================
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  price numeric(10,2) not null,
  type text not null check (type in ('Bundle', 'Single template', 'Mini bundle')),
  tag text,
  description text not null,
  contents text[] default '{}',      -- bullet list of what's included
  image_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table products enable row level security;

create policy "Anyone can read published products"
  on products for select
  using (published = true);

create policy "Admins can read all products"
  on products for select
  using (is_admin());

create policy "Admins can insert products"
  on products for insert
  with check (is_admin());

create policy "Admins can update products"
  on products for update
  using (is_admin());

create policy "Admins can delete products"
  on products for delete
  using (is_admin());

-- ============================================================================
-- BLOG POSTS
-- ============================================================================
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content_html text not null default '',  -- rich text output from the admin editor
  cover_image_url text,
  author text default 'CareComply UK',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table blog_posts enable row level security;

create policy "Anyone can read published posts"
  on blog_posts for select
  using (published = true);

create policy "Admins can read all posts"
  on blog_posts for select
  using (is_admin());

create policy "Admins can insert posts"
  on blog_posts for insert
  with check (is_admin());

create policy "Admins can update posts"
  on blog_posts for update
  using (is_admin());

create policy "Admins can delete posts"
  on blog_posts for delete
  using (is_admin());

-- ============================================================================
-- LEADS (newsletter + free-resources email gate)
-- ============================================================================
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  source text not null default 'newsletter', -- 'newsletter' | 'free-resources'
  resource_requested text,
  created_at timestamptz not null default now()
);

alter table leads enable row level security;

create policy "Anyone can submit a lead"
  on leads for insert
  with check (true);

create policy "Admins can read leads"
  on leads for select
  using (is_admin());

-- ============================================================================
-- ORDERS (populated by the Stripe webhook once payments are wired up)
-- ============================================================================
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  email text not null,
  total numeric(10,2) not null,
  status text not null default 'pending', -- 'pending' | 'paid' | 'failed'
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id),
  product_name text not null,
  qty integer not null default 1,
  unit_price numeric(10,2) not null
);

alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Admins can read orders"
  on orders for select
  using (is_admin());

create policy "Admins can read order_items"
  on order_items for select
  using (is_admin());

-- Orders/order_items are otherwise written only by the Stripe webhook route,
-- which uses the Supabase service-role key (bypasses RLS) — no public policy needed.

-- ============================================================================
-- updated_at triggers
-- ============================================================================
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

create trigger blog_posts_set_updated_at
  before update on blog_posts
  for each row execute function set_updated_at();

-- ============================================================================
-- STORAGE (product images + blog cover/inline images)
-- Run the storage bucket creation from the Supabase dashboard Storage tab,
-- or via this SQL (works in SQL editor too):
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Admins can upload product images"
  on storage.objects for insert
  with check (bucket_id = 'product-images' and is_admin());

create policy "Admins can delete product images"
  on storage.objects for delete
  using (bucket_id = 'product-images' and is_admin());

create policy "Public can view blog images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

create policy "Admins can upload blog images"
  on storage.objects for insert
  with check (bucket_id = 'blog-images' and is_admin());

create policy "Admins can delete blog images"
  on storage.objects for delete
  using (bucket_id = 'blog-images' and is_admin());

-- ============================================================================
-- SEED DATA (the original 12-product catalogue, so the site isn't empty)
-- ============================================================================
insert into products (slug, name, price, type, tag, description, contents, featured, sort_order) values
  ('starter-pack', 'Domiciliary Care Starter Pack', 49, 'Bundle', 'Most popular for new agencies', '10 person-centred care plans and 6 risk assessments, fully editable and ready for CQC/CIW-aligned care delivery from day one.', array['10 person-centred care plans','6 risk assessments','Word & PDF, instant download'], false, 1),
  ('manager-toolkit', 'Registered Manager Toolkit', 79, 'Bundle', null, 'Supervisions, spot checks, audits and appraisals — 10 management forms total.', array['Supervisions & spot checks','Audits & appraisals','10 management forms total'], false, 2),
  ('policy-pack', 'Policies & Procedures Pack', 149, 'Bundle', null, '80+ policies covering safeguarding, MCA/DoLS, IPC and the full inspection scope.', array['80+ policies included','Safeguarding, MCA/DoLS, IPC','Covers full inspection scope'], true, 3),
  ('premium-kit', 'Complete Care Agency Start-Up Kit', 299, 'Bundle', null, 'Everything above, plus a Statement of Purpose and more — best value for new agencies.', array['Everything above, plus','Statement of Purpose & more','Best value for new agencies'], false, 4),
  ('falls-risk-assessment', 'Falls Risk Assessment', 5, 'Single template', null, 'A single, CQC/CIW-aligned falls risk assessment template.', array[]::text[], false, 5),
  ('medication-care-plan', 'Medication Care Plan', 5, 'Single template', null, 'A single, editable medication care plan template.', array[]::text[], false, 6),
  ('all-risk-assessments', 'All Risk Assessments', 19, 'Mini bundle', null, 'Every risk assessment template in one mini bundle.', array[]::text[], false, 7),
  ('spot-check-form', 'Spot Check Form', 5, 'Single template', null, 'A single spot check form for registered managers.', array[]::text[], false, 8),
  ('supervision-form', 'Supervision Form', 5, 'Single template', null, 'A single staff supervision form.', array[]::text[], false, 9),
  ('safeguarding-policy', 'Safeguarding Policy', 5, 'Single template', null, 'A single safeguarding policy document.', array[]::text[], false, 10),
  ('incident-report-form', 'Incident Report Form', 5, 'Single template', null, 'A single incident report form.', array[]::text[], false, 11),
  ('manager-forms-bundle', 'Manager Forms Bundle', 19, 'Mini bundle', null, 'All manager forms in one mini bundle.', array[]::text[], false, 12)
on conflict (slug) do nothing;

-- ============================================================================
-- SEED DATA — the original 4 blog articles, ported from the static site
-- ============================================================================
insert into blog_posts (slug, title, excerpt, author, published, published_at, content_html) values
(
  'how-to-pass-a-ciw-inspection',
  'How to Pass a CIW Inspection',
  'The documentation and preparation steps that make the biggest difference when CIW comes to inspect your domiciliary care service.',
  'CareComply UK',
  true,
  '2026-06-01T09:00:00Z',
  '<p>A CIW inspection can feel like it arrives all at once, but the agencies that come through it well usually have one thing in common: their documentation already tells the story the inspector is trying to piece together. Passing isn''t about last-minute scrambling — it''s about your paperwork doing the talking before you even open your mouth.</p>
<h2>Start with what CIW is actually looking for</h2>
<p>CIW inspections in Wales assess your service against the National Minimum Standards and the Regulation and Inspection of Social Care (Wales) Act. In practice, that means inspectors are checking whether your care plans, risk assessments, and policies reflect what''s actually happening for each person you support — not just whether the paperwork exists.</p>
<p>The gap most agencies fall into isn''t a missing document. It''s a mismatch between what''s written down and what staff are actually doing day to day.</p>
<h2>The documents inspectors ask for first</h2>
<ul>
<li>Up-to-date, person-centred care plans for every service user</li>
<li>Risk assessments that have been reviewed recently, not just created once at the start</li>
<li>Medication records that are complete and consistent with the care plan</li>
<li>Staff training matrices showing current certifications</li>
<li>Incident and accident logs with evidence of follow-up action</li>
<li>Your Statement of Purpose and Service User Guide</li>
</ul>
<blockquote><p>Want all of these already drafted and aligned to inspection standards? Our Starter Pack includes 10 care plans and 6 risk assessments, ready to edit today. <a href="/shop/starter-pack">View Starter Pack →</a></p></blockquote>
<h2>Preparation in the weeks before</h2>
<p>Review every care plan for the people currently using your service, not a sample. Inspectors increasingly speak directly to service users and their families, so anything written in your care plans should match what those conversations will reveal.</p>
<p>Walk through a recent incident report from start to finish. Does it show what happened, what was done immediately, and what changed afterward? A single well-handled incident, properly documented, often reassures an inspector more than a stack of policies that have never been tested.</p>
<h2>On the day</h2>
<p>Make it easy for the inspector to find what they ask for. A simple, well-organised filing system — physical or digital — signals competence before a single document is even read. If you''re not sure your systems would hold up to that kind of scrutiny, a mock inspection beforehand can surface the gaps while there''s still time to fix them.</p>
<blockquote><p>A mock inspection walks through your documentation exactly as CIW would, with a written report of strengths and gaps. <a href="/consultancy">See Mock Inspection Service →</a></p></blockquote>
<p><em>This article is general guidance, not a substitute for reviewing current CIW inspection frameworks directly. Always check the latest published standards for your service type.</em></p>'
),
(
  'top-20-care-policies',
  'Top 20 Care Policies Every Agency Needs',
  'Not every policy carries equal weight in an inspection. Here''s which ones matter most, and where to focus first.',
  'CareComply UK',
  true,
  '2026-06-05T09:00:00Z',
  '<p>Every domiciliary care agency needs policies, but not every policy carries equal weight in an inspection. Some get read closely, tested against real incidents, and cross-checked with staff knowledge. Knowing which ones matter most helps you prioritise where to focus first.</p>
<h2>The policies inspectors check first</h2>
<p>Safeguarding sits at the top of almost every inspection checklist, followed closely by medication management and infection prevention and control. These three areas come up repeatedly because they relate directly to a service user''s immediate safety.</p>
<ul>
<li>Safeguarding Adults Policy</li>
<li>Medication Management Policy</li>
<li>Infection Prevention and Control Policy</li>
<li>Mental Capacity Act and DoLS Policy</li>
<li>Whistleblowing Policy</li>
<li>Complaints Handling Policy</li>
<li>Equality and Diversity Policy</li>
<li>Health and Safety Policy</li>
<li>Lone Working Policy</li>
<li>Data Protection and Confidentiality Policy</li>
<li>Moving and Handling Policy</li>
<li>Recruitment and DBS Checking Policy</li>
<li>Staff Training and Development Policy</li>
<li>Business Continuity Policy</li>
<li>End of Life Care Policy</li>
<li>Nutrition and Hydration Policy</li>
<li>Falls Prevention Policy</li>
<li>Record Keeping Policy</li>
<li>Visitors and Volunteers Policy</li>
<li>Equal Opportunities Employment Policy</li>
</ul>
<blockquote><p>All 20 of these, plus 60 more, are included in our Policies &amp; Procedures Pack — written around current CQC/CIW expectations. <a href="/shop/policy-pack">View Policy Pack →</a></p></blockquote>
<h2>Having the policy isn''t the same as living it</h2>
<p>Inspectors don''t just want to see a safeguarding policy exists — they''ll often ask a member of staff what they''d do if they suspected abuse. If the answer doesn''t match the policy, that gap gets noticed. Treat every policy as something your team should be able to talk through in their own words, not just something filed away.</p>
<h2>Reviewing what you already have</h2>
<p>If your agency already has policies in place, the question worth asking isn''t "do we have one?" but "when did we last update it, and does it reflect how we actually work now?" Policies that haven''t been reviewed in years are a common inspection finding, even when the content itself is reasonable.</p>
<blockquote><p>Not sure if your existing policies would hold up? We review policies against current CQC/CIW expectations and return tracked-change recommendations. <a href="/consultancy">See Policy Review Service →</a></p></blockquote>
<p><em>This article is general guidance. Always confirm current requirements against the latest published CQC or CIW frameworks for your service type.</em></p>'
),
(
  'writing-person-centred-care-plans',
  'Writing Person-Centred Care Plans',
  'A care plan can use all the right language and still describe a generic service user rather than the specific person it''s meant for.',
  'CareComply UK',
  true,
  '2026-06-10T09:00:00Z',
  '<p>"Person-centred" is one of the most-used phrases in care documentation, and one of the easiest to write without actually doing. A care plan can use all the right language and still describe a generic service user rather than the specific person it''s meant for.</p>
<h2>What person-centred actually means</h2>
<p>A genuinely person-centred care plan reflects how this individual wants to be supported — their routines, preferences, history, and what matters to them — not just their diagnoses and care tasks. Two people with identical mobility needs can need very different care plans if one values independence above all else and the other prioritises company and reassurance.</p>
<h2>Signs a care plan isn''t person-centred</h2>
<ul>
<li>It reads the same as every other care plan in the file, just with the name changed</li>
<li>It lists tasks ("assist with washing") without saying how the person likes this done</li>
<li>It was written once at the start of care and never updated as needs changed</li>
<li>It doesn''t mention what the person can still do for themselves</li>
<li>It was written about the person, not with them or their family</li>
</ul>
<blockquote><p>Our care plan templates are structured to prompt person-centred detail in every section, not just generic task lists. <a href="/shop/starter-pack">View Care Plan Templates →</a></p></blockquote>
<h2>A simple test for any care plan</h2>
<p>Read the plan without the name at the top. If it could describe almost any service user, it needs more specific detail. If it clearly couldn''t apply to anyone else, you''re on the right track.</p>
<p>Involve the person — and where appropriate, their family — in writing and reviewing it. Their own words about their preferences and history are often the most person-centred content you can include, and they''re hard to fake.</p>
<h2>Keeping plans alive, not just compliant</h2>
<p>A care plan that''s accurate on the day it''s written but never revisited stops being person-centred the moment something changes. Build in regular reviews, and update the plan immediately after any change in the person''s needs, not just at the scheduled review date.</p>
<blockquote><p>If you''d like a second opinion on whether your current care plans are genuinely person-centred, our consultancy service offers a full review. <a href="/consultancy">See Consultancy Services →</a></p></blockquote>
<p><em>This article is general guidance. Always check current CQC or CIW standards for the specific requirements of person-centred care documentation.</em></p>'
),
(
  'documents-required-by-cqc-and-ciw',
  'What Documents Are Required by CQC and CIW',
  'CQC and CIW have different frameworks, but the documentation they expect from a domiciliary care agency overlaps heavily. A complete checklist.',
  'CareComply UK',
  true,
  '2026-06-15T09:00:00Z',
  '<p>CQC (England) and CIW (Wales) have different frameworks, but in practice the documentation they expect to see from a domiciliary care agency overlaps heavily. If you''re operating across the border, or simply want a complete picture, this checklist covers the core categories both regulators look for.</p>
<h2>Care delivery documentation</h2>
<ul>
<li>Person-centred care plans for every service user</li>
<li>Risk assessments covering falls, medication, environment, and nutrition at minimum</li>
<li>Medication administration records (MAR charts)</li>
<li>Daily care/visit notes showing what support was actually given</li>
<li>Reviews showing care plans are updated as needs change</li>
</ul>
<h2>Governance and management documentation</h2>
<ul>
<li>Statement of Purpose</li>
<li>Service User Guide</li>
<li>Staff supervision and appraisal records</li>
<li>Spot check and audit records</li>
<li>Complaints log with evidence of resolution</li>
<li>Incident and accident reports</li>
</ul>
<blockquote><p>Our Registered Manager Toolkit covers the governance side — spot checks, supervisions, audits, and appraisal forms in one bundle. <a href="/shop/manager-toolkit">View Manager Toolkit →</a></p></blockquote>
<h2>Policy documentation</h2>
<p>Both regulators expect a comprehensive set of written policies covering safeguarding, medication, infection control, the Mental Capacity Act, whistleblowing, equality and diversity, and health and safety, among others. See our related article on the top 20 policies every agency needs for a fuller breakdown.</p>
<h2>Workforce documentation</h2>
<ul>
<li>DBS checks and recruitment records</li>
<li>Staff training matrix showing current certifications</li>
<li>Induction records for new staff</li>
<li>Staff rotas demonstrating adequate coverage</li>
</ul>
<h2>Business continuity and emergency planning</h2>
<p>Increasingly, both CQC and CIW expect to see a Business Continuity Plan and emergency planning documentation — covering what happens if staff can''t get to service users, or if a major disruption affects the service.</p>
<blockquote><p>Our Complete Start-Up Kit includes Business Continuity Planning and Emergency Planning documents alongside the full template library. <a href="/shop/premium-kit">View Complete Start-Up Kit →</a></p></blockquote>
<p><em>This article is general guidance. Requirements vary by service type and nation — always confirm against the latest published CQC or CIW frameworks.</em></p>'
)
on conflict (slug) do nothing;
