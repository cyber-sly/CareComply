"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import { formatGBP } from "@/lib/utils";
import { ShoppingBasket, X } from "lucide-react";

export default function CartPage() {
  const { lines, removeFromCart, totalPrice, isReady } = useCart();

  if (!isReady) return null;

  return (
    <Container className="py-14 md:py-20">
      <h1 className="mb-10 text-[30px] md:text-[36px]">Your basket</h1>

      {lines.length === 0 ? (
        <div className="rounded-lg border border-line bg-white px-6 py-16 text-center text-grey">
          <ShoppingBasket size={36} strokeWidth={1.5} className="mx-auto mb-4 text-grey-light" />
          <p className="mb-6">Your basket is empty.</p>
          <ButtonLink href="/shop" variant="primary">Browse the Shop</ButtonLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_0.6fr] md:items-start">
          <div>
            {lines.map((line) => (
              <div
                key={line.id}
                className="flex items-center gap-4 border-b border-line py-[18px] first:pt-0"
              >
                <div className="h-14 w-11 shrink-0 rounded-sm border border-line bg-paper-deep" />
                <div className="flex-1">
                  <div className="mb-1 text-[14.5px] font-semibold">{line.name}</div>
                  <div className="font-mono text-xs text-grey-light">Qty {line.qty}</div>
                </div>
                <div className="font-mono text-[15px] font-semibold">
                  {formatGBP(line.price * line.qty)}
                </div>
                <button
                  onClick={() => removeFromCart(line.id)}
                  className="ml-3.5 flex items-center gap-1 text-[12.5px] font-semibold text-clay"
                >
                  <X size={13} /> Remove
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-line bg-white p-7">
            <div className="mb-3 flex justify-between text-[14.5px] text-ink-soft">
              <span>Subtotal</span>
              <span className="font-mono">{formatGBP(totalPrice)}</span>
            </div>
            <div className="mt-1.5 flex justify-between border-t border-line pt-3.5 text-[17px] font-bold">
              <span>Total</span>
              <span className="font-mono">{formatGBP(totalPrice)}</span>
            </div>
            <ButtonLink href="/checkout" variant="verified" block className="mt-6">
              Proceed to Checkout
            </ButtonLink>
            <Link
              href="/shop"
              className="mt-3.5 block text-center text-[13px] font-semibold text-ink-soft hover:text-verified"
            >
              ← Continue shopping
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
}
