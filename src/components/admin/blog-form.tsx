"use client";

import { useState, useTransition } from "react";
import { saveBlogPost } from "@/app/admin/(dashboard)/blog/actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import type { BlogPostRow } from "@/lib/supabase/types";

export function BlogForm({ post }: { post?: BlogPostRow }) {
  const [coverImage, setCoverImage] = useState(post?.cover_image_url ?? "");
  const [contentHtml, setContentHtml] = useState(post?.content_html ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          const result = await saveBlogPost(post?.id ?? null, formData);
          if (result?.error) setError(result.error);
        });
      }}
      className="max-w-3xl space-y-6"
    >
      <input type="hidden" name="cover_image_url" value={coverImage} />
      <input type="hidden" name="content_html" value={contentHtml} />

      <div>
        <label className="mb-1.5 block text-sm font-semibold" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={post?.title}
          className="w-full rounded border border-line bg-white px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold" htmlFor="slug">
          URL slug <span className="font-normal text-grey-light">(leave blank to auto-generate)</span>
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={post?.slug}
          className="w-full rounded border border-line bg-white px-3.5 py-2.5 font-mono text-sm focus:border-verified focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold" htmlFor="excerpt">
          Excerpt <span className="font-normal text-grey-light">(shown on the blog index)</span>
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt ?? ""}
          className="w-full rounded border border-line bg-white px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold" htmlFor="author">
          Author
        </label>
        <input
          id="author"
          name="author"
          defaultValue={post?.author ?? "KEPA HUB"}
          className="w-full rounded border border-line bg-white px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
        />
      </div>

      <ImageUploader
        bucket="blog-images"
        value={coverImage}
        onChange={setCoverImage}
        label="Cover image"
      />

      <div>
        <label className="mb-1.5 block text-sm font-semibold">Article content</label>
        <RichTextEditor content={contentHtml} onChange={setContentHtml} />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" name="published" defaultChecked={post?.published} className="h-4 w-4 accent-verified" />
        Published (visible on the site)
      </label>

      {error && <p className="text-sm text-clay">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" variant="verified" disabled={pending}>
          {pending ? "Saving…" : post ? "Save changes" : "Create post"}
        </Button>
      </div>
    </form>
  );
}
