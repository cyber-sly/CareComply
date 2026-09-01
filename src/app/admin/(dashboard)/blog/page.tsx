import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ButtonLink } from "@/components/ui/button";
import { DeleteBlogPostButton } from "@/components/admin/delete-blog-post-button";
import { Plus } from "lucide-react";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl">Blog posts</h1>
          <p className="text-sm text-grey">{posts?.length ?? 0} total</p>
        </div>
        <ButtonLink href="/admin/blog/new" variant="verified">
          <Plus size={16} /> New post
        </ButtonLink>
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-deep text-left text-xs font-semibold text-grey">
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Author</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(posts ?? []).map((post) => (
              <tr key={post.id} className="border-b border-line last:border-0">
                <td className="px-5 py-3.5 font-medium">
                  <Link href={`/admin/blog/${post.id}/edit`} className="hover:text-verified">
                    {post.title}
                  </Link>
                </td>
                <td className="px-5 py-3.5 text-grey">{post.author}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={
                      post.published
                        ? "rounded-full bg-verified-soft px-2 py-0.5 text-xs text-verified"
                        : "rounded-full bg-paper-deep px-2 py-0.5 text-xs text-grey"
                    }
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="text-xs font-semibold text-ink-soft hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteBlogPostButton postId={post.id} title={post.title} />
                  </div>
                </td>
              </tr>
            ))}
            {(!posts || posts.length === 0) && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-grey">
                  No blog posts yet. Write your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
