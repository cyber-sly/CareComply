import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { CustomerLoginForm } from "@/components/marketing/customer-login-form";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata = { title: "Log in — KEPA HUB" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect: redirectParam } = await searchParams;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect(redirectParam || "/account");
  }

  const signupHref = redirectParam
    ? `/signup?redirect=${encodeURIComponent(redirectParam)}`
    : "/signup";

  return (
    <Container className="max-w-sm py-20">
      <h1 className="mb-1.5 text-center text-2xl">Log in</h1>
      <p className="mb-8 text-center text-sm text-grey">
        Access your account and order history.
      </p>
      <Suspense fallback={null}>
        <CustomerLoginForm />
      </Suspense>
      <p className="mt-6 text-center text-sm text-grey">
        Don&rsquo;t have an account?{" "}
        <Link href={signupHref} className="font-semibold text-verified">
          Create one
        </Link>
      </p>
    </Container>
  );
}