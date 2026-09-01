import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-(--container-site) px-[18px] sm:px-8", className)}>
      {children}
    </div>
  );
}
