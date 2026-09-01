"use client";

import { useTransition } from "react";
import { deleteBlogPost } from "@/app/admin/(dashboard)/blog/actions";
import { Trash2 } from "lucide-react";

export function DeleteBlogPostButton({ postId, title }: { postId: string; title: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      className="flex items-center gap-1.5 text-xs font-semibold text-clay hover:underline disabled:opacity-50"
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete "${title}"? This can't be undone.`)) {
          startTransition(() => deleteBlogPost(postId));
        }
      }}
    >
      <Trash2 size={13} />
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
