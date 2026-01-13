// src/app/shop/page.tsx
import ProductCard from "@/app/components/ProductCard";
// import { ONCOLOGY_PRODUCTS } from "@/data/oncology"; // DISABLED
import { FOOD_SUPPLEMENTS } from "@/data/foodsupplements";

// Combine both categories into one array
const ALL_PRODUCTS = [
  // ...ONCOLOGY_PRODUCTS, // DISABLED
  ...FOOD_SUPPLEMENTS,
];

export default function ShopHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 md:py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
            Our Shop
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Premium Oncology Medicines & Food Supplements – Trusted Quality & Best Prices
          </p>
        </div>

        {/* Products Grid */}
        {ALL_PRODUCTS.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl">
              No products available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {ALL_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Optional: Quick category info at bottom */}
        <div className="mt-16 text-center text-gray-600">
          <p>
            Showing {ALL_PRODUCTS.length} products • Oncology Medicines + Food Supplements
          </p>
        </div>
      </div>
    </div>
  );
}