import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SignOutLink } from "@/components/marketing/sign-out-link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { formatGBP } from "@/lib/utils";
import { Package } from "lucide-react";

export const metadata = { title: "My Account — KEPA HUB" };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AccountPage() {
  if (!isSupabaseConfigured()) redirect("/login");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/account");

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const fullName = (user.user_metadata?.full_name as string | undefined) ?? null;

  return (
    <Container className="py-14 md:py-16">
      <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-1 text-[28px] md:text-[32px]">
            {fullName ? `Welcome back, ${fullName.split(" ")[0]}` : "My Account"}
          </h1>
          <p className="text-sm text-grey">{user.email}</p>
        </div>
        <SignOutLink />
      </div>

      <h2 className="mb-4 text-lg font-bold">Your purchases</h2>

      {!orders || orders.length === 0 ? (
        <div className="rounded-lg border border-line bg-white px-6 py-14 text-center text-grey">
          <Package size={32} strokeWidth={1.5} className="mx-auto mb-4 text-grey-light" />
          <p className="mb-6">You haven&rsquo;t purchased anything yet.</p>
          <ButtonLink href="/shop" variant="primary">Browse the Shop</ButtonLink>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border border-line bg-white p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
                <div>
                  <div className="font-mono text-xs text-grey-light">
                    Order #{order.id.slice(0, 8)} · {formatDate(order.created_at)}
                  </div>
                  <span
                    className={
                      order.status === "paid"
                        ? "mt-1 inline-block rounded-full bg-verified-soft px-2 py-0.5 text-xs text-verified"
                        : "mt-1 inline-block rounded-full bg-paper-deep px-2 py-0.5 text-xs text-grey"
                    }
                  >
                    {order.status === "paid" ? "Paid" : order.status}
                  </span>
                </div>
                <div className="font-mono text-lg font-semibold">{formatGBP(order.total)}</div>
              </div>
              <div className="space-y-2">
                {(order.order_items ?? []).map((item: { id: string; product_name: string; qty: number }) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-ink-soft">
                      {item.product_name} × {item.qty}
                    </span>
                    <span className="text-xs font-semibold text-grey-light">
                      Download link emailed separately
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="text-center text-xs text-grey-light">
            Downloads are sent by email for now — automatic in-account downloads are coming soon.
          </p>
        </div>
      )}
    </Container>
  );
}