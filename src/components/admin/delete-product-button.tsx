"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/app/admin/(dashboard)/products/actions";
import { Trash2 } from "lucide-react";

export function DeleteProductButton({ productId, productName }: { productId: string; productName: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      className="flex items-center gap-1.5 text-xs font-semibold text-clay hover:underline disabled:opacity-50"
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete "${productName}"? This can't be undone.`)) {
          startTransition(() => deleteProduct(productId));
        }
      }}
    >
      <Trash2 size={13} />
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
