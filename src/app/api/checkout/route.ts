import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";

type CheckoutRequestItem = { id: string; qty: number };

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "stripe_not_configured" },
      { status: 200 }
    );
  }

  const body = await request.json();
  const items: CheckoutRequestItem[] = Array.isArray(body?.items) ? body.items : [];

  if (items.length === 0) {
    return NextResponse.json({ error: "Basket is empty." }, { status: 400 });
  }

  const supabase = await createClient();

  // Defense in depth: the /checkout page already redirects logged-out
  // visitors to /login, but this route enforces it too since it can be
  // called directly.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  const slugs = items.map((i) => i.id);
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .in("slug", slugs)
    .eq("published", true);

  if (error || !products || products.length === 0) {
    return NextResponse.json({ error: "Could not verify basket items." }, { status: 400 });
  }

  const line_items = items
    .map((item) => {
      const product = products.find((p) => p.slug === item.id);
      if (!product) return null;
      return {
        quantity: item.qty,
        price_data: {
          currency: "gbp",
          unit_amount: Math.round(Number(product.price) * 100),
          product_data: { name: product.name },
        },
      };
    })
    .filter((li): li is NonNullable<typeof li> => li !== null);

  if (line_items.length === 0) {
    return NextResponse.json({ error: "No valid items in basket." }, { status: 400 });
  }

  const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    customer_email: user.email,
    client_reference_id: user.id,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  });

  return NextResponse.json({ url: session.url });
}