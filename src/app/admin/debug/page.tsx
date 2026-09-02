import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminDebugPage() {
  const configured = isSupabaseConfigured();

  if (!configured) {
    return (
      <pre className="p-8 text-sm">
        NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing
        at runtime. isSupabaseConfigured() returned false.
      </pre>
    );
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  let adminRow = null;
  let adminError = null;

  if (user) {
    const result = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();
    adminRow = result.data;
    adminError = result.error;
  }

  const allResult = await supabase.from("admin_users").select("*");
  const allAdminRows = allResult.data;
  const allAdminRowsError = allResult.error;

  return (
    <pre className="whitespace-pre-wrap break-all p-8 text-xs leading-relaxed">
      {JSON.stringify(
        {
          supabaseConfigured: configured,
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
          user: user ? { id: user.id, email: user.email } : null,
          userError: userError?.message ?? null,
          adminRowForThisUser: adminRow,
          adminRowError: adminError?.message ?? null,
          allAdminUsersRowsVisibleToThisRequest: allAdminRows,
          allAdminUsersRowsError: allAdminRowsError?.message ?? null,
        },
        null,
        2
      )}
    </pre>
  );
}