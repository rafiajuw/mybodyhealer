import { notFound } from "next/navigation";
import { ALL_PRODUCTS } from "@/data/allProducts";
import ProductDetailsClient from "./ProductDetailsClient";

type PageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { category, slug } = await params;

  const product = ALL_PRODUCTS.find(
    (p) => p.category === category && p.slug === slug
  );

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
