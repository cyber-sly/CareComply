"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionItem({
  question,
  children,
  defaultOpen = false,
}: {
  question: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-line py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left text-[15px] font-semibold"
        aria-expanded={open}
      >
        {question}
        <Plus size={16} className={cn("shrink-0 transition-transform", open && "rotate-45")} />
      </button>
      {open && (
        <div className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{children}</div>
      )}
    </div>
  );
}
