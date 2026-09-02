import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminLoginPage() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: adminRow } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminRow) redirect("/admin");
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6 py-20">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink font-mono text-sm font-semibold">
          CC
        </div>
        <h1 className="text-2xl">Admin sign in</h1>
        <p className="mt-1.5 text-sm text-grey">
          Manage products and blog articles for CareComply UK.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}