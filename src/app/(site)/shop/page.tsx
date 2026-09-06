import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getProducts } from "@/lib/supabase/queries";
import { formatGBP } from "@/lib/utils";

export const metadata = {
  title: "Shop — KEPA HUB",
  description: "Browse care plans, risk assessments and policy packs for UK domiciliary care agencies.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <Container className="py-14 md:py-20">
      <div className="mb-12 max-w-[600px]">
        <Eyebrow>The shop</Eyebrow>
        <h1 className="text-[30px] md:text-[36px]">All templates &amp; bundles</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className={
              "relative flex flex-col rounded-lg border bg-white p-6 " +
              (product.featured ? "border-verified" : "border-line")
            }
          >
            {product.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-verified px-3 py-1 font-mono text-[10px] font-semibold tracking-wide text-white">
                MOST POPULAR
              </span>
            )}
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image_url}
                alt=""
                className="mb-5 h-32 w-full rounded-md border border-line object-cover"
              />
            ) : (
              <div className="mb-5 flex h-24 items-center justify-center rounded-md bg-paper-deep">
                <div className="flex gap-1.5">
                  <div className="h-14 w-9 rounded-sm border border-line bg-white" />
                  <div className="h-14 w-9 -translate-y-1.5 rounded-sm border border-line bg-white" />
                </div>
              </div>
            )}
            <p className="mb-1.5 font-mono text-[11px] tracking-wide text-grey-light">
              {product.type.toUpperCase()}
            </p>
            <div className="mb-2.5 font-display text-lg font-bold leading-snug">
              {product.name}
            </div>
            <p className="mb-4 flex-1 text-[13.5px] leading-relaxed text-grey">
              {product.description}
            </p>
            <div className="mb-4 font-mono text-2xl font-semibold">
              {formatGBP(product.price)}
            </div>
            <ButtonLink
              href={`/shop/${product.slug}`}
              variant={product.featured ? "verified" : "outline"}
              block
            >
              View {product.type === "Bundle" ? "Bundle" : "Details"}
            </ButtonLink>
          </div>
        ))}
        {products.length === 0 && (
          <p className="col-span-full text-grey">No products published yet.</p>
        )}
      </div>
    </Container>
  );
}
