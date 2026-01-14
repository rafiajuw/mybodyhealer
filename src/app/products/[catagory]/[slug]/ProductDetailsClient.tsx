"use client";

import { useState } from "react";
import Image from "next/image";
import OrderForm from "@/app/components/OrderForm";
import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductDetailsClient({ product }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.name || "Product image"}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product Content */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-3">
              {product.name}
            </h1>

            {(product.dosage || product.packSize) && (
              <p className="text-lg text-emerald-600 font-medium mb-6">
                {product.dosage || ""}
                {product.packSize ? ` • ${product.packSize}` : ""}
              </p>
            )}

            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              {product.description}
            </p>

            {product.keyBenefits && product.keyBenefits.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {product.keyBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2.5 mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setIsOpen(true)}
              className="mt-auto w-full md:w-auto max-w-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Order Now →
            </button>
          </div>
        </div>
      </section>

      {isOpen && (
        <OrderForm 
          product={product} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}