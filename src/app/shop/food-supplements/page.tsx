// src/app/shop/food-supplements/page.tsx
import ProductCard from "@/app/components/ProductCard";
import { FOOD_SUPPLEMENTS } from "@/data/foodsupplements";

export default function FoodSupplementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 md:py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 text-center mb-10 md:mb-14">
          Food Supplements
        </h1>

        {FOOD_SUPPLEMENTS.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg md:text-xl">
              No food supplements available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {FOOD_SUPPLEMENTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}