// src/app/shop/page.tsx
import ProductCard from "@/app/components/ProductCard";
import { PRODUCTS } from "@/data/Products";

export default function ShopHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-800 text-center mb-12">
          Oncology Medicines
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}