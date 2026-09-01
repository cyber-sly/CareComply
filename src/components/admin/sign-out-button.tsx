"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
      }}
      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-grey hover:bg-paper-deep hover:text-clay"
    >
      <LogOut size={15} strokeWidth={1.75} />
      Sign out
    </button>
  );
}
