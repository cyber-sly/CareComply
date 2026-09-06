# KEPA HUB — Next.js Rebuild

Rebuilt from the original static HTML site into Next.js 14 (App Router) + TypeScript + Tailwind CSS v4, backed by Supabase, ready to deploy on Vercel.

## What's built so far

**Public site — fully built**
- Homepage — hero, pathways, bundle grid, consultancy strip, free resources teaser, testimonials, final CTA
- `/shop` — all published products, pulled live from Supabase
- `/shop/[slug]` — individual product pages with Add to Basket / Buy Now
- `/blog` — all published articles, including the original 4 articles ported from the static site
- `/blog/[slug]` — individual articles, rendering the admin's rich-text content
- `/cart` — basket with line items, remove, subtotal/total
- `/checkout` — contact details + order summary, redirects to Stripe Checkout
- `/checkout/success` — order confirmation, clears the basket
- `/consultancy` — service cards + booking panel (Calendly placeholder, same as the original prototype)
- `/free-resources` — free template cards + email-gate modal (writes real leads to Supabase)
- `/about` — founder story, values, mission statement (placeholders intact where the original had them)
- `/contact` — contact form (writes to `leads`), booking/email/social side cards
- `/faqs` — categorized accordion (templates & formats, orders & licensing, consultancy & booking)
- `/legal/privacy-policy`, `/legal/terms`, `/legal/licence-terms`, `/legal/cookie-policy` — all four legal pages, content ported as-is (still marked for solicitor review, as in the original)
- Shared `SiteHeader` / `SiteFooter`
- Cart (React Context + localStorage), toast notifications
- Newsletter, contact form, and free-resources signups all write to the `leads` table

**Admin panel** (`/admin`)
- Email/password login via Supabase Auth, gated to whoever is in the `admin_users` table
- Dashboard with counts of products, posts, and captured leads
- **Products**: list, create, edit, delete, publish/unpublish, feature toggle, image upload
- **Blog posts**: list, create, edit, delete, publish/unpublish, full rich-text editor (bold, italic, headings, lists, quotes, links, inline images), cover image upload

**Payments**
- `/api/checkout` creates a Stripe Checkout Session — prices are looked up server-side from Supabase, never trusted from the client, so basket totals can't be tampered with
- `/api/webhooks/stripe` verifies the webhook signature and writes a row to `orders`/`order_items` once payment completes

**Still open / needs a business decision, not code**
- Founder bio, consultancy pricing (`£[X]`), real contact email, testimonials, and the "used by X+ agencies" trust number are all still placeholders — same as the original site, waiting on real content from the client
- Legal pages need solicitor review before going live (flagged in the pages themselves)
- Licence terms multi-location policy needs a business decision
- A "My Downloads" customer account area (requires customer accounts, not just admin auth) — not built
- Automatic file delivery after purchase — the success page confirms the order, but actually serving the purchased documents needs a decision on file storage (Supabase Storage with signed URLs would be the natural next step)
- Calendly isn't actually embedded yet — the booking panels show the same "this is where it would go" placeholder as the original prototype

---

## Setting up Supabase (one-time)

### 1. Create the project
Go to [supabase.com](https://supabase.com), create a new project, and wait for it to finish provisioning.

### 2. Run the schema
Open **SQL Editor** in the Supabase dashboard → New query → paste the entire contents of `supabase/schema.sql` → Run.

This creates all tables (`products`, `blog_posts`, `admin_users`, `leads`, `orders`, `order_items`), sets up row-level security so the public can only ever read *published* content, creates the `product-images` and `blog-images` storage buckets, and seeds the original 12-product catalogue so the shop isn't empty on day one.

### 3. Get your API keys
**Project Settings → API**. Copy the **Project URL** and the **anon/public key**.

Create a `.env.local` file in the project root (copy `.env.local.example`) and paste them in:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 4. Create the admin login
Supabase Auth needs a real user account before anyone can log into `/admin`.

1. Dashboard → **Authentication → Users → Add user** → enter the admin's email + a password (tick "Auto Confirm User" so no email verification step is needed)
2. Copy that user's **UID** from the users table
3. Back in **SQL Editor**, run:
   ```sql
   insert into admin_users (user_id) values ('paste-the-uid-here');
   ```

That's it — that email/password can now sign in at `/admin/login`. Repeat step 4 for any additional admin.

---

## Setting up Stripe (for real payments)

1. Create a [Stripe](https://stripe.com) account (test mode is fine to start)
2. **Developers → API keys** → copy the **Secret key** into `STRIPE_SECRET_KEY`
3. Deploy the site (or use the Stripe CLI locally) so you have a public URL, then go to **Developers → Webhooks → Add endpoint**:
   - Endpoint URL: `https://your-domain.com/api/webhooks/stripe`
   - Event to send: `checkout.session.completed`
   - Copy the **Signing secret** into `STRIPE_WEBHOOK_SECRET`
4. In Supabase, get your **service_role** key (Project Settings → API — different from the anon key) and set it as `SUPABASE_SERVICE_ROLE_KEY`

Until these are set, the checkout page still works end-to-end as a prototype — submitting shows a clear "no real payment taken" message instead of erroring, so you can demo the flow before Stripe is connected.

**Testing locally:** use the [Stripe CLI](https://stripe.com/docs/stripe-cli) (`stripe listen --forward-to localhost:3000/api/webhooks/stripe`) to receive webhooks on your machine, and Stripe's test card `4242 4242 4242 4242` with any future expiry/CVC.

---

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without Supabase configured, the public site still runs using built-in seed data (`src/lib/data/products-seed.ts`) — useful for previewing design work before Supabase is set up. The admin panel (`/admin`) requires Supabase to be configured.

**Note:** the build needs internet access to fetch Google Fonts (Source Serif 4, Inter, JetBrains Mono) on first run — this works automatically on Vercel and any normal dev machine.

## Deploying

1. Push this to a GitHub repo
2. Import into Vercel
3. Add the environment variables from `.env.local.example` in Vercel → Project Settings → Environment Variables
4. Deploy

## Design tokens

All colors, fonts, and the `--container-site` max-width live in `src/app/globals.css` under `@theme`. Change a token there and it updates everywhere via Tailwind classes like `bg-paper`, `text-verified`, `border-line`, `font-display`, etc.

## Image uploads

Product and blog images upload directly from the admin panel into Supabase Storage (`product-images` and `blog-images` buckets, both public-read). No external image host needed.
