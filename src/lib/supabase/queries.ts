import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { PRODUCTS_SEED } from "@/lib/data/products-seed";
import type { ProductRow, BlogPostRow } from "@/lib/supabase/types";

export async function getProducts(): Promise<ProductRow[]> {
  if (!isSupabaseConfigured()) return PRODUCTS_SEED;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return PRODUCTS_SEED;
  return data;
}

export async function getProduct(slug: string): Promise<ProductRow | null> {
  if (!isSupabaseConfigured()) {
    return PRODUCTS_SEED.find((p) => p.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  return data;
}

export async function getPosts(): Promise<BlogPostRow[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error || !data) return [];
  return data;
}

export async function getPost(slug: string): Promise<BlogPostRow | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  return data;
}
