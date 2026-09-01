import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  center,
  className,
}: {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-[18px] flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-verified",
        center && "justify-center",
        className
      )}
    >
      {!center && <span className="h-px w-[18px] bg-verified" aria-hidden />}
      {children}
    </p>
  );
}
