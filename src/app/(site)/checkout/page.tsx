import { redirect } from "next/navigation";
import { CheckoutClient } from "@/components/marketing/checkout-client";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata = { title: "Checkout — KEPA HUB" };

export default async function CheckoutPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login?redirect=/checkout");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/checkout");
  }

  const fullName = (user.user_metadata?.full_name as string | undefined) ?? "";

  return <CheckoutClient userEmail={user.email ?? ""} userName={fullName} />;
}