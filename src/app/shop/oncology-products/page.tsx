// src/app/shop/oncology/page.tsx
import ProductCard from "@/app/components/ProductCard";
import { PRODUCTS } from "@/data/Products";

const oncologyProducts = PRODUCTS.filter(p => p.category === "oncology");

export default function OncologyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-800 text-center mb-12">
          Oncology Medicines
        </h1>

        {oncologyProducts.length === 0 ? (
          <p className="text-center text-gray-500">No oncology products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {oncologyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}