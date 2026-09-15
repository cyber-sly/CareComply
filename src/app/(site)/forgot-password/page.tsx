import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ForgotPasswordForm } from "@/components/marketing/forgot-password-form";

export const metadata = { title: "Reset your password — KEPA HUB" };

export default function ForgotPasswordPage() {
  return (
    <Container className="max-w-sm py-20">
      <h1 className="mb-1.5 text-center text-2xl">Reset your password</h1>
      <p className="mb-8 text-center text-sm text-grey">
        Enter your email and we&rsquo;ll send you a link to reset your password.
      </p>
      <ForgotPasswordForm />
      <p className="mt-6 text-center text-sm text-grey">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-verified">
          Log in
        </Link>
      </p>
    </Container>
  );
}
