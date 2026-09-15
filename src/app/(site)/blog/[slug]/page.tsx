import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { getPost } from "@/lib/supabase/queries";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — KEPA HUB`,
    description: post.excerpt ?? undefined,
  };
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <Container className="max-w-[760px] pt-12 pb-6 md:pt-16">
        <div className="mb-4 font-mono text-xs tracking-wide text-grey-light">
          {formatDate(post.published_at)} · {post.author}
        </div>
        <h1 className="mb-6 text-[32px] leading-tight md:text-[40px]">{post.title}</h1>
        {post.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt=""
            className="mb-8 w-full rounded-lg border border-line object-cover"
          />
        ) : (
          <div className="mb-8 flex h-48 items-center justify-center rounded-lg border border-line bg-paper-deep p-8 sm:h-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="" className="max-h-full max-w-full object-contain" />
          </div>
        )}
      </Container>
      <Container className="max-w-[760px] pb-20">
        {/* Content comes from the admin's rich-text editor (trusted, admin-only writes) */}
        <div
          className="prose prose-headings:font-display prose-a:text-verified max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />
      </Container>
    </article>
  );
}
