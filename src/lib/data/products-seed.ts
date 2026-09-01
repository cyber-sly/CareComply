import type { ProductRow } from "@/lib/supabase/types";

// Used only when Supabase isn't configured yet (local dev before setup).
// Once Supabase is connected, real data comes from the `products` table —
// see supabase/schema.sql for the seed insert that mirrors this list.
const now = new Date().toISOString();

function row(partial: Omit<ProductRow, "id" | "created_at" | "updated_at" | "published" | "sort_order" | "image_url" | "tag" | "contents" | "featured"> & Partial<ProductRow>): ProductRow {
  return {
    id: partial.slug,
    tag: null,
    image_url: null,
    contents: [],
    featured: false,
    published: true,
    sort_order: 0,
    created_at: now,
    updated_at: now,
    ...partial,
  };
}

export const PRODUCTS_SEED: ProductRow[] = [
  row({
    slug: "starter-pack",
    name: "Domiciliary Care Starter Pack",
    price: 49,
    type: "Bundle",
    tag: "Most popular for new agencies",
    description:
      "10 person-centred care plans and 6 risk assessments, fully editable and ready for CQC/CIW-aligned care delivery from day one.",
    contents: ["10 person-centred care plans", "6 risk assessments", "Word & PDF, instant download"],
    sort_order: 1,
  }),
  row({
    slug: "manager-toolkit",
    name: "Registered Manager Toolkit",
    price: 79,
    type: "Bundle",
    description: "Supervisions, spot checks, audits and appraisals — 10 management forms total.",
    contents: ["Supervisions & spot checks", "Audits & appraisals", "10 management forms total"],
    sort_order: 2,
  }),
  row({
    slug: "policy-pack",
    name: "Policies & Procedures Pack",
    price: 149,
    type: "Bundle",
    description: "80+ policies covering safeguarding, MCA/DoLS, IPC and the full inspection scope.",
    contents: ["80+ policies included", "Safeguarding, MCA/DoLS, IPC", "Covers full inspection scope"],
    featured: true,
    sort_order: 3,
  }),
  row({
    slug: "premium-kit",
    name: "Complete Care Agency Start-Up Kit",
    price: 299,
    type: "Bundle",
    description: "Everything above, plus a Statement of Purpose and more — best value for new agencies.",
    contents: ["Everything above, plus", "Statement of Purpose & more", "Best value for new agencies"],
    sort_order: 4,
  }),
  row({
    slug: "falls-risk-assessment",
    name: "Falls Risk Assessment",
    price: 5,
    type: "Single template",
    description: "A single, CQC/CIW-aligned falls risk assessment template.",
    sort_order: 5,
  }),
  row({
    slug: "medication-care-plan",
    name: "Medication Care Plan",
    price: 5,
    type: "Single template",
    description: "A single, editable medication care plan template.",
    sort_order: 6,
  }),
  row({
    slug: "all-risk-assessments",
    name: "All Risk Assessments",
    price: 19,
    type: "Mini bundle",
    description: "Every risk assessment template in one mini bundle.",
    sort_order: 7,
  }),
  row({
    slug: "spot-check-form",
    name: "Spot Check Form",
    price: 5,
    type: "Single template",
    description: "A single spot check form for registered managers.",
    sort_order: 8,
  }),
  row({
    slug: "supervision-form",
    name: "Supervision Form",
    price: 5,
    type: "Single template",
    description: "A single staff supervision form.",
    sort_order: 9,
  }),
  row({
    slug: "safeguarding-policy",
    name: "Safeguarding Policy",
    price: 5,
    type: "Single template",
    description: "A single safeguarding policy document.",
    sort_order: 10,
  }),
  row({
    slug: "incident-report-form",
    name: "Incident Report Form",
    price: 5,
    type: "Single template",
    description: "A single incident report form.",
    sort_order: 11,
  }),
  row({
    slug: "manager-forms-bundle",
    name: "Manager Forms Bundle",
    price: 19,
    type: "Mini bundle",
    description: "All manager forms in one mini bundle.",
    sort_order: 12,
  }),
];
