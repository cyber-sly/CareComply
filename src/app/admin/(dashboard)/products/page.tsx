import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ButtonLink } from "@/components/ui/button";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { formatGBP } from "@/lib/utils";
import { Plus } from "lucide-react";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl">Products</h1>
          <p className="text-sm text-grey">{products?.length ?? 0} total</p>
        </div>
        <ButtonLink href="/admin/products/new" variant="verified">
          <Plus size={16} /> New product
        </ButtonLink>
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-deep text-left text-xs font-semibold text-grey">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((product) => (
              <tr key={product.id} className="border-b border-line last:border-0">
                <td className="px-5 py-3.5 font-medium">
                  <Link href={`/admin/products/${product.id}/edit`} className="hover:text-verified">
                    {product.name}
                  </Link>
                  {product.featured && (
                    <span className="ml-2 rounded-full bg-verified-soft px-2 py-0.5 text-[10px] font-semibold text-verified">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-grey">{product.type}</td>
                <td className="px-5 py-3.5 font-mono">{formatGBP(product.price)}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={
                      product.published
                        ? "rounded-full bg-verified-soft px-2 py-0.5 text-xs text-verified"
                        : "rounded-full bg-paper-deep px-2 py-0.5 text-xs text-grey"
                    }
                  >
                    {product.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-xs font-semibold text-ink-soft hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton productId={product.id} productName={product.name} />
                  </div>
                </td>
              </tr>
            ))}
            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-grey">
                  No products yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
