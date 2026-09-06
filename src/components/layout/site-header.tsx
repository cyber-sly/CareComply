"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import { cn } from "@/lib/utils";
import { ShoppingBasket, Menu, X, User } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/consultancy", label: "Consultancy" },
  { href: "/free-resources", label: "Free Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { totalCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-100 border-b border-line bg-paper">
      <Container className="flex items-center justify-between gap-5 py-[14px]">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 font-display text-[21px] font-bold tracking-[-0.01em]"
        >
          <Image
            src="/Logo.png"
            alt="KEPA HUB"
            width={56}
            height={56}
            className="h-14 w-auto"
            priority
          />
          KEPA HUB
        </Link>

        <nav
          className="hidden gap-7 text-[14.5px] font-medium md:flex"
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "border-b-2 border-transparent py-2 transition-colors hover:border-verified",
                  isActive && "border-verified"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <ButtonLink
            href="/consultancy"
            variant="outline"
            className="hidden sm:inline-flex"
          >
            Book a Call
          </ButtonLink>
          <Link href="/account" aria-label="My Account" className="inline-flex text-[19px]">
            <User size={21} strokeWidth={1.75} />
          </Link>
          <Link
            href="/cart"
            aria-label="Basket"
            className="relative inline-flex text-[19px]"
          >
            <ShoppingBasket size={22} strokeWidth={1.75} />
            <span className="absolute -top-[7px] -right-[9px] flex h-[17px] w-[17px] items-center justify-center rounded-full bg-clay font-mono text-[10px] text-white">
              {totalCount}
            </span>
          </Link>
          <button
            className="inline-flex text-[22px] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <nav
          className="border-t border-line bg-paper md:hidden"
          aria-label="Mobile"
        >
          <Container className="flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded px-2 py-2.5 text-[15px] font-medium hover:bg-paper-deep"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}