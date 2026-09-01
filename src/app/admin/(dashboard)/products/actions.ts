"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ProductFormState = { error?: string } | undefined;

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveProduct(
  productId: string | null,
  formData: FormData
): Promise<ProductFormState> {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "");
  const type = String(formData.get("type") ?? "Bundle");
  const tag = String(formData.get("tag") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const contentsRaw = String(formData.get("contents") ?? "");
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";
  let slug = String(formData.get("slug") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();

  if (!name) return { error: "Name is required." };
  const price = Number(priceRaw);
  if (Number.isNaN(price) || price < 0) return { error: "Enter a valid price." };
  if (!slug) slug = slugify(name);
  else slug = slugify(slug);

  const contents = contentsRaw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const payload = {
    slug,
    name,
    price,
    type,
    tag: tag || null,
    description,
    contents,
    image_url: imageUrl || null,
    featured,
    published,
  };

  if (productId) {
    const { error } = await supabase.from("products").update(payload).eq("id", productId);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("products").insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", productId);
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/shop");
}
