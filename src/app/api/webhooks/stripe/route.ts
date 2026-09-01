import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import type Stripe from "stripe";

export async function POST(request: Request) {
  if (!isStripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 200 });
  }

  const stripe = getStripe();
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature ?? "",
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const supabase = createServiceRoleClient();

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
    });

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        stripe_session_id: session.id,
        email: session.customer_email ?? session.customer_details?.email ?? "unknown",
        total: (session.amount_total ?? 0) / 100,
        status: "paid",
      })
      .select()
      .single();

    if (!orderError && order) {
      const itemsPayload = lineItems.data.map((li) => ({
        order_id: order.id,
        product_name: li.description ?? "Item",
        qty: li.quantity ?? 1,
        unit_price: (li.price?.unit_amount ?? 0) / 100,
      }));

      if (itemsPayload.length > 0) {
        await supabase.from("order_items").insert(itemsPayload);
      }
    }
  }

  return NextResponse.json({ received: true });
}
