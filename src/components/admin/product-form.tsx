"use client";

import { useState, useTransition } from "react";
import { saveProduct } from "@/app/admin/(dashboard)/products/actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Button } from "@/components/ui/button";
import type { ProductRow } from "@/lib/supabase/types";

export function ProductForm({ product }: { product?: ProductRow }) {
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          const result = await saveProduct(product?.id ?? null, formData);
          if (result?.error) setError(result.error);
        });
      }}
      className="max-w-2xl space-y-6"
    >
      <input type="hidden" name="image_url" value={imageUrl} />

      <div>
        <label className="mb-1.5 block text-sm font-semibold" htmlFor="name">
          Product name
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={product?.name}
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
          defaultValue={product?.slug}
          placeholder="e.g. manager-toolkit"
          className="w-full rounded border border-line bg-white px-3.5 py-2.5 font-mono text-sm focus:border-verified focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold" htmlFor="price">
            Price (£)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product?.price}
            className="w-full rounded border border-line bg-white px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={product?.type ?? "Bundle"}
            className="w-full rounded border border-line bg-white px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
          >
            <option value="Bundle">Bundle</option>
            <option value="Mini bundle">Mini bundle</option>
            <option value="Single template">Single template</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold" htmlFor="tag">
          Tag <span className="font-normal text-grey-light">(optional, e.g. &ldquo;Most popular&rdquo;)</span>
        </label>
        <input
          id="tag"
          name="tag"
          defaultValue={product?.tag ?? ""}
          className="w-full rounded border border-line bg-white px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={product?.description}
          className="w-full rounded border border-line bg-white px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold" htmlFor="contents">
          What&rsquo;s included <span className="font-normal text-grey-light">(one item per line)</span>
        </label>
        <textarea
          id="contents"
          name="contents"
          rows={4}
          defaultValue={product?.contents?.join("\n")}
          placeholder={"10 person-centred care plans\n6 risk assessments\nWord & PDF, instant download"}
          className="w-full rounded border border-line bg-white px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
        />
      </div>

      <ImageUploader
        bucket="product-images"
        value={imageUrl}
        onChange={setImageUrl}
        label="Product image"
      />

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="featured" defaultChecked={product?.featured} className="h-4 w-4 accent-verified" />
          Featured (shows &ldquo;Most Popular&rdquo; badge)
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="published"
            defaultChecked={product?.published ?? true}
            className="h-4 w-4 accent-verified"
          />
          Published (visible on the site)
        </label>
      </div>

      {error && <p className="text-sm text-clay">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" variant="verified" disabled={pending}>
          {pending ? "Saving…" : product ? "Save changes" : "Create product"}
        </Button>
      </div>
    </form>
  );
}
