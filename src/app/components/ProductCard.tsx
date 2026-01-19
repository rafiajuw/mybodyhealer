"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OrderForm from "./OrderForm";
import { type Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [orderOpen, setOrderOpen] = useState(false);

  // Optional: Agar dosage ya packSize missing ho to gracefully handle karo
  const showDosage = product.dosage && product.packSize 
    ? `${product.dosage} • ${product.packSize}`
    : "Details on product page";

  return (
    <>
      <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
        {/* Image Section */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={product.id <= 6} // thoda zyada prioritize
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h2>

          <p className="text-emerald-700 font-medium text-sm mb-2">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </p>

          <p className="text-gray-600 text-sm mb-5 flex-grow">
            {showDosage}
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-auto">
            <Link
              href={`/shop/products/${product.slug}`}
              className="flex-1 px-5 py-3 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-900 transition-colors"
            >
              View Details
            </Link>

            <button
              onClick={() => setOrderOpen(true)}
              className="flex-1 px-5 py-3 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              COD
            </button>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {orderOpen && (
        <OrderForm 
          product={product} 
          onClose={() => setOrderOpen(false)} 
        />
      )}
    </>
  );
}