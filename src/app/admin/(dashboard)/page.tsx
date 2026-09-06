import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Package, Newspaper, Mail } from "lucide-react";

export default async function AdminHomePage() {
  const supabase = await createClient();

  const [{ count: productCount }, { count: postCount }, { count: leadCount }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }),
    ]);

  const cards = [
    { label: "Products", count: productCount ?? 0, href: "/admin/products", icon: Package },
    { label: "Blog posts", count: postCount ?? 0, href: "/admin/blog", icon: Newspaper },
    { label: "Leads captured", count: leadCount ?? 0, href: "#", icon: Mail },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl">Dashboard</h1>
      <p className="mb-8 text-sm text-grey">
        Manage what shows up on the KEPA HUB website.
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-lg border border-line bg-white p-6 transition hover:border-verified"
            >
              <Icon size={20} strokeWidth={1.75} className="mb-4 text-verified" />
              <div className="mb-1 font-mono text-3xl font-semibold">{card.count}</div>
              <div className="text-sm text-grey">{card.label}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
