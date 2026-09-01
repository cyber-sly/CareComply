import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body?.email ?? "").trim();
  const name = body?.name ? String(body.name).trim() : null;
  const source = body?.source ? String(body.source) : "newsletter";
  const resourceRequested = body?.resource_requested ? String(body.resource_requested) : null;

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    // Supabase isn't set up yet — accept silently so the UI still works in local preview.
    return NextResponse.json({ ok: true });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    email,
    name,
    source,
    resource_requested: resourceRequested,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
