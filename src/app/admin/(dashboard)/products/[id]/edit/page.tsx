import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("*").eq("id", id).maybeSingle();

  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl">Edit product</h1>
      <ProductForm product={product} />
    </div>
  );
}
