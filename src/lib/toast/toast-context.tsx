"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2600);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={cn(
          "pointer-events-none fixed bottom-6 right-6 z-400 flex items-center gap-2.5 rounded-md bg-ink px-5 py-3.5 text-sm font-medium text-white shadow-lg transition-all duration-250",
          visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        )}
      >
        <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-verified">
          <Check size={12} strokeWidth={3} />
        </span>
        <span>{message}</span>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
