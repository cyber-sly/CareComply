import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SignupForm } from "@/components/marketing/signup-form";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata = { title: "Create an account — KEPA HUB" };

export default async function SignupPage({
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

  const loginHref = redirectParam
    ? `/login?redirect=${encodeURIComponent(redirectParam)}`
    : "/login";

  return (
    <Container className="max-w-sm py-20">
      <h1 className="mb-1.5 text-center text-2xl">Create an account</h1>
      <p className="mb-8 text-center text-sm text-grey">
        {redirectParam === "/checkout"
          ? "Create an account to complete your order and access your purchases anytime."
          : "Access your order history and purchases in one place."}
      </p>
      <Suspense fallback={null}>
        <SignupForm />
      </Suspense>
      <p className="mt-6 text-center text-sm text-grey">
        Already have an account?{" "}
        <Link href={loginHref} className="font-semibold text-verified">
          Log in
        </Link>
      </p>
    </Container>
  );
}