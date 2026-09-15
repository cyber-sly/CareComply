"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

type Status = "checking" | "ready" | "invalid";

export function ResetPasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // Clicking the emailed link redirects here with a recovery code in the
    // URL. The browser client exchanges it for a short-lived session as
    // soon as it initializes, firing PASSWORD_RECOVERY (or SIGNED_IN,
    // depending on the link format) once that's done.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setStatus("ready");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setStatus("ready");
    });

    // No valid session showed up in time — the link is missing, expired, or
    // already used.
    const timeout = setTimeout(() => {
      setStatus((current) => (current === "checking" ? "invalid" : current));
    }, 4000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/login");
      router.refresh();
    }, 1800);
  }

  if (success) {
    return (
      <div className="rounded-md border border-line bg-paper-deep px-4 py-3.5 text-[13.5px] leading-relaxed text-ink-soft">
        Password updated — redirecting you to log in…
      </div>
    );
  }

  if (status === "checking") {
    return <p className="text-center text-sm text-grey">Verifying your reset link…</p>;
  }

  if (status === "invalid") {
    return (
      <div className="rounded-md border border-line bg-paper-deep px-4 py-3.5 text-[13.5px] leading-relaxed text-ink-soft">
        This reset link is invalid or has expired.{" "}
        <Link href="/forgot-password" className="font-semibold text-verified">
          Request a new one
        </Link>
        .
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-semibold" htmlFor="password">
          New password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border border-line bg-white px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold" htmlFor="confirmPassword">
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded border border-line bg-white px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
        />
      </div>
      {error && <p className="text-sm text-clay">{error}</p>}
      <Button type="submit" variant="verified" block disabled={loading}>
        {loading ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
