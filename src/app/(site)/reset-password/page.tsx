import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ResetPasswordForm } from "@/components/marketing/reset-password-form";

export const metadata = { title: "Set a new password — KEPA HUB" };

export default function ResetPasswordPage() {
  return (
    <Container className="max-w-sm py-20">
      <h1 className="mb-1.5 text-center text-2xl">Set a new password</h1>
      <p className="mb-8 text-center text-sm text-grey">
        Choose a new password for your account.
      </p>
      <ResetPasswordForm />
      <p className="mt-6 text-center text-sm text-grey">
        <Link href="/login" className="font-semibold text-verified">
          Back to log in
        </Link>
      </p>
    </Container>
  );
}
