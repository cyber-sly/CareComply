import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Uses the service role key — bypasses RLS entirely. NEVER import this into
// anything that runs in the browser or is reachable from a user request
// without a trust boundary (e.g. a verified Stripe webhook signature).
export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase service role client is not configured");
  }

  return createSupabaseClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
