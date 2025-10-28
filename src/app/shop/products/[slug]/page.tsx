import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/Products";
import ProductDetailsClient from "./ProductDetailsClient"; // client UI

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return notFound();

  return <ProductDetailsClient product={product} />;
}
