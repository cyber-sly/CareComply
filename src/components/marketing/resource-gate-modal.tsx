"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Check } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";

const CROSS_SELL: Record<string, { name: string; href: string }> = {
  "Incident Report Form": { name: "Registered Manager Toolkit", href: "/shop/manager-toolkit" },
  "Falls Risk Assessment": { name: "Domiciliary Care Starter Pack", href: "/shop/starter-pack" },
  "Supervision Template": { name: "Registered Manager Toolkit", href: "/shop/manager-toolkit" },
};

export function ResourceGateModal({
  openResource,
  onClose,
}: {
  openResource: string | null;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!openResource) return null;
  const crossSell = CROSS_SELL[openResource];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          name: formData.get("name"),
          source: "free-resources",
          resource_requested: openResource,
        }),
      });
    } catch {
      // Non-critical for the demo flow — still show the confirmation.
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  }

  function handleClose() {
    setSubmitted(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-500 flex items-center justify-center bg-ink/40 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-sm rounded-lg bg-white p-7">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-grey hover:text-clay"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <h3 className="mb-1.5 text-lg">
              Get your free <span className="text-verified">{openResource}</span>
            </h3>
            <p className="mb-5 text-[13.5px] text-grey">
              Enter your details and we&rsquo;ll send it straight to your inbox.
            </p>
            <div className="mb-3.5">
              <label className="mb-1.5 block text-[13px] font-semibold" htmlFor="gate-name">
                Name
              </label>
              <input
                id="gate-name"
                name="name"
                required
                className="w-full rounded border border-line px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
              />
            </div>
            <div className="mb-5">
              <label className="mb-1.5 block text-[13px] font-semibold" htmlFor="gate-email">
                Email
              </label>
              <input
                id="gate-email"
                name="email"
                type="email"
                required
                className="w-full rounded border border-line px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
              />
            </div>
            <Button type="submit" variant="primary" block disabled={loading}>
              {loading ? "Sending…" : "Send Me the Template"}
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-verified-soft text-verified">
              <Check size={22} strokeWidth={3} />
            </div>
            <h3 className="mb-1.5 text-lg">Check your inbox</h3>
            <p className="mb-5 text-[13.5px] leading-relaxed text-grey">
              Your free template is on its way. While you wait — if you found this useful, you
              might like our{" "}
              {crossSell ? (
                <strong className="text-ink">{crossSell.name}</strong>
              ) : (
                <strong className="text-ink">bundles</strong>
              )}
              .
            </p>
            <ButtonLink href={crossSell?.href ?? "/shop"} variant="verified" block>
              See That Bundle
            </ButtonLink>
            <button
              onClick={handleClose}
              className="mt-2.5 w-full rounded-[3px] border-[1.5px] border-ink px-[22px] py-[11px] text-sm font-semibold hover:bg-ink hover:text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
