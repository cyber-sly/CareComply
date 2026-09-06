"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import { formatGBP } from "@/lib/utils";

export function CheckoutClient({
  userEmail,
  userName,
}: {
  userEmail: string;
  userName: string;
}) {
  const { lines, totalPrice, isReady } = useCart();
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  if (!isReady) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(null);

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({ id: l.id, qty: l.qty })),
        }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      if (data.error === "stripe_not_configured") {
        setNotice(
          "This is a working prototype of the checkout flow. No real payment has been taken — Stripe hasn't been connected yet. Add your Stripe keys to enable real payments."
        );
      } else {
        setNotice(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setNotice("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (lines.length === 0) {
    return (
      <Container className="py-20 text-center">
        <p className="mb-6 text-grey">
          Your basket is empty.{" "}
          <Link href="/shop" className="font-semibold text-verified">
            Browse the shop →
          </Link>
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-14 md:py-20">
      <h1 className="mb-10 text-[30px] md:text-[36px]">Checkout</h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_0.55fr] md:items-start">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="mb-4 flex items-center gap-2.5 text-base font-bold">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink font-mono text-xs text-white">
                1
              </span>
              Your details
            </h3>
            <div className="rounded-md border border-line bg-paper-deep px-4 py-3.5 text-[13.5px]">
              <div className="font-semibold">{userName || "Signed in"}</div>
              <div className="text-grey-light">{userEmail}</div>
            </div>
          </div>

          <div className="rounded-md border border-[#E0BFAF] bg-clay-soft px-4 py-3.5 text-[13px] leading-relaxed text-[#7A331F]">
            You&rsquo;ll be redirected to Stripe&rsquo;s secure checkout to enter payment details. Nothing is charged on this page.
          </div>

          {notice && (
            <div className="rounded-md border border-line bg-paper-deep px-4 py-3.5 text-[13px] leading-relaxed text-ink-soft">
              {notice}
            </div>
          )}

          <Button type="submit" variant="verified" block disabled={loading}>
            {loading ? "Redirecting…" : `Pay ${formatGBP(totalPrice)} securely →`}
          </Button>
        </form>

        <div className="rounded-lg border border-line bg-white p-6">
          <h4 className="mb-4 text-sm font-bold">Order summary</h4>
          {lines.map((line) => (
            <div key={line.id} className="mb-2.5 flex justify-between text-[13.5px] text-ink-soft">
              <span>
                {line.name} × {line.qty}
              </span>
              <span className="font-mono">{formatGBP(line.price * line.qty)}</span>
            </div>
          ))}
          <div className="mt-4 flex justify-between border-t border-line pt-3.5 text-base font-bold">
            <span>Total</span>
            <span className="font-mono">{formatGBP(totalPrice)}</span>
          </div>
        </div>
      </div>
    </Container>
  );
}