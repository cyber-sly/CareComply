import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] font-semibold text-sm px-[22px] py-[11px] transition-[transform,box-shadow] duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";

const variants = {
  primary:
    "bg-ink text-white hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(28,43,57,0.25)]",
  outline:
    "bg-transparent text-ink border-[1.5px] border-ink hover:bg-ink hover:text-white",
  verified:
    "bg-verified text-white hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(47,111,79,0.3)]",
  "verified-outline":
    "bg-transparent text-verified border-[1.5px] border-verified hover:bg-verified hover:text-white",
  "on-dark": "bg-white text-ink hover:-translate-y-px",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = {
  variant?: Variant;
  block?: boolean;
  className?: string;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  block,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], block && "w-full", className)}
      {...props}
    />
  );
}

type ButtonLinkProps = {
  variant?: Variant;
  block?: boolean;
  className?: string;
} & ComponentProps<typeof Link>;

export function ButtonLink({
  variant = "primary",
  block,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(base, variants[variant], block && "w-full", className)}
      {...props}
    />
  );
}
