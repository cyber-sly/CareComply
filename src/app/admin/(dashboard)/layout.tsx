import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { LayoutDashboard, Package, Newspaper } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/blog", label: "Blog posts", icon: Newspaper },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware already redirects unauthenticated/non-admin visitors, but we
  // double-check here since layouts render before middleware guarantees in
  // some edge/runtime configurations, and to fetch the admin's email for display.
  let email: string | null = null;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/admin/login");

    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!adminRow) redirect("/admin/login");
    email = user.email ?? null;
  } else {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-paper-deep">
      <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-white">
        <div className="flex items-center gap-2.5 border-b border-line px-5 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink font-mono text-[10px] font-semibold">
            CC
          </span>
          <span className="font-display text-sm font-bold">Admin</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-paper-deep hover:text-ink"
              >
                <Icon size={17} strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line px-4 py-4">
          <p className="mb-2 truncate text-xs text-grey-light">{email}</p>
          <SignOutButton />
        </div>
      </aside>
      <div className="flex-1 overflow-y-auto px-8 py-8 md:px-12 md:py-10">
        {children}
      </div>
    </div>
  );
}
