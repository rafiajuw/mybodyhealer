// src/app/shop/products/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { ONCOLOGY_PRODUCTS } from '@/data/oncology';
import { FOOD_SUPPLEMENTS } from '@/data/foodsupplements'; // ← corrected filename (most common convention)
import ProductDetailsClient from '@/app/shop/products/[slug]/ProductDetailsClient'; // ← recommended location

// Combine all products in one array (ensure slugs are unique!)
const ALL_PRODUCTS = [
  ...ONCOLOGY_PRODUCTS,
  ...FOOD_SUPPLEMENTS,
  // ... add other categories later if needed (e.g. ...HERBAL_PRODUCTS)
];

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = ALL_PRODUCTS.find((p) => p.slug === slug);

  // Debug helper - remove in production if you want
  if (!product) {
    console.warn(`[Product Detail Page] Product not found for slug: "${slug}"`);
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}

// Generate static paths for all products → crucial for production
export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

// Dynamic SEO metadata (good for sharing & search engines)
import type { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | My Body Healer',
    };
  }

  return {
    title: `${product.name}${product.dosage ? ` - ${product.dosage}` : ''} | My Body Healer`,
    description: product.description?.slice(0, 160) + (product.description?.length > 160 ? '...' : '') || 'Premium health & wellness product',
    openGraph: {
      title: product.name,
      description: product.description,
      url: `https://www.mybodyhealer.pk/shop/products/${slug}`,
      images: product.image ? [{ url: product.image, alt: product.name }] : undefined,
      type: 'website',
    },
  };
}