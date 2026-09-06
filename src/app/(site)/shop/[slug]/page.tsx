import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { AddToCartButton, BuyNowButton } from "@/components/product/add-to-cart-buttons";
import { getProduct } from "@/lib/supabase/queries";
import { formatGBP } from "@/lib/utils";
import { Check } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — KEPA HUB`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const summary = { id: product.slug, name: product.name, price: product.price };

  return (
    <Container className="py-10 md:py-14">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
        <div>
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full rounded-lg border border-line object-cover"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-paper-deep">
              <div className="flex gap-2">
                <div className="h-32 w-20 rounded-sm border border-line bg-white" />
                <div className="h-32 w-20 -translate-y-3 rounded-sm border border-line bg-white" />
              </div>
            </div>
          )}
        </div>

        <div>
          <Eyebrow>
            {product.type}
            {product.tag ? ` · ${product.tag}` : ""}
          </Eyebrow>
          <h1 className="mb-3.5 text-[32px] leading-tight">{product.name}</h1>
          <p className="mb-6 text-[15.5px] leading-relaxed text-ink-soft">{product.description}</p>

          <div className="mb-6 flex items-baseline gap-2.5">
            <span className="font-mono text-3xl font-semibold">{formatGBP(product.price)}</span>
            <span className="text-sm text-grey-light">one-time payment, instant download</span>
          </div>

          <div className="mb-7 flex flex-wrap gap-3">
            <AddToCartButton product={summary} variant="outline" />
            <BuyNowButton product={summary} />
          </div>

          {product.contents.length > 0 && (
            <div className="rounded-lg border border-line bg-paper-deep p-6">
              <h3 className="mb-3 text-sm font-semibold">What&rsquo;s included</h3>
              <ul className="space-y-2">
                {product.contents.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                    <Check size={15} strokeWidth={3} className="mt-0.5 shrink-0 text-verified" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
