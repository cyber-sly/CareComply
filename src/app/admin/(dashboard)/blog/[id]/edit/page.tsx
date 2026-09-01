import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "@/components/admin/blog-form";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();

  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl">Edit blog post</h1>
      <BlogForm post={post} />
    </div>
  );
}
