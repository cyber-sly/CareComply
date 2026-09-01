"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import { useToast } from "@/lib/toast/toast-context";
import { formatGBP } from "@/lib/utils";

type ProductSummary = {
  id: string;
  name: string;
  price: number;
};

export function AddToCartButton({
  product,
  variant = "outline",
}: {
  product: ProductSummary;
  variant?: "outline" | "primary" | "verified";
}) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  return (
    <Button
      variant={variant}
      onClick={() => {
        addToCart(product);
        showToast(`${product.name} added to basket`);
      }}
    >
      Add to Basket
    </Button>
  );
}

export function BuyNowButton({
  product,
  label,
}: {
  product: ProductSummary;
  label?: string;
}) {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <Button
      variant="verified"
      onClick={() => {
        addToCart(product);
        router.push("/checkout");
      }}
    >
      {label ?? `Buy Now — ${formatGBP(product.price)} →`}
    </Button>
  );
}
