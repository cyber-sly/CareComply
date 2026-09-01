"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import { CheckCircle2 } from "lucide-react";

function SuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <Container className="py-24 text-center">
      <CheckCircle2 size={44} strokeWidth={1.5} className="mx-auto mb-5 text-verified" />
      <h1 className="mb-3 text-[28px]">Thank you — your order is confirmed</h1>
      <p className="mx-auto mb-8 max-w-md text-[15px] text-grey">
        A confirmation and your download links have been sent to your email. If anything&rsquo;s
        missing, contact us and we&rsquo;ll sort it out.
      </p>
      <ButtonLink href="/shop" variant="primary">Continue Browsing</ButtonLink>
    </Container>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
