import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getPosts } from "@/lib/supabase/queries";

export const metadata = {
  title: "Blog — KEPA HUB",
  description: "Compliance tips and guidance for UK domiciliary care agencies.",
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <Container className="py-14 md:py-20">
      <div className="mb-12 max-w-[600px]">
        <Eyebrow>The blog</Eyebrow>
        <h1 className="text-[30px] md:text-[36px]">Compliance tips &amp; guidance</h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-grey">No articles published yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-lg border border-line bg-white transition hover:-translate-y-1 hover:shadow-[0_16px_32px_-12px_rgba(28,43,57,0.16)]"
            >
              {post.cover_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.cover_image_url}
                  alt=""
                  className="h-40 w-full border-b border-line object-cover"
                />
              ) : (
                <div className="flex h-40 items-center justify-center border-b border-line bg-paper-deep p-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.jpg" alt="" className="max-h-full max-w-full object-contain" />
                </div>
              )}
              <div className="p-6">
                <div className="mb-2.5 font-mono text-[11px] tracking-wide text-grey-light">
                  {formatDate(post.published_at)}
                </div>
                <h3 className="mb-2.5 text-lg leading-snug">{post.title}</h3>
                {post.excerpt && (
                  <p className="text-[13.5px] leading-relaxed text-grey">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}