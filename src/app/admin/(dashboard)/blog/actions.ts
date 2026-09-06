"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type BlogFormState = { error?: string } | undefined;

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveBlogPost(
  postId: string | null,
  formData: FormData
): Promise<BlogFormState> {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const contentHtml = String(formData.get("content_html") ?? "");
  const coverImageUrl = String(formData.get("cover_image_url") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const published = formData.get("published") === "on";
  let slug = String(formData.get("slug") ?? "").trim();

  if (!title) return { error: "Title is required." };
  if (!slug) slug = slugify(title);
  else slug = slugify(slug);

  const payload: Record<string, unknown> = {
    slug,
    title,
    excerpt: excerpt || null,
    content_html: contentHtml,
    cover_image_url: coverImageUrl || null,
    author: author || "KEPA HUB",
    published,
  };

  if (published) {
    payload.published_at = new Date().toISOString();
  }

  if (postId) {
    const { error } = await supabase.from("blog_posts").update(payload).eq("id", postId);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("blog_posts").insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(postId: string) {
  const supabase = await createClient();
  await supabase.from("blog_posts").delete().eq("id", postId);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
