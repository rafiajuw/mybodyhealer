// src/app/components/ProductCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OrderForm from "./OrderForm";

// OrderForm ke hisaab se interface
interface Product {
  image: string;
  name: string;
  category: string;
  slug: string;
  dosage: string;
  packSize: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-xl shadow-md p-4 text-center hover:shadow-xl transition duration-300">
        <div className="relative w-full h-64 overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
            priority
          />
        </div>
        <h2 className="text-xl font-semibold mt-3 text-gray-900">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-1">{product.category}</p>
        <p className="text-gray-500 text-xs mt-1">{product.dosage} • {product.packSize}</p>

        <div className="flex justify-center gap-4 mt-4">
          {/* FIXED: product → products (plural) */}
          <Link
            href={`/shop/products/${product.slug}`}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-900 transition"
          >
            View Details
          </Link>
          <button
            onClick={() => setOrderOpen(true)}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
          >
            Order Now
          </button>
        </div>
      </div>

      {orderOpen && <OrderForm product={product} onClose={() => setOrderOpen(false)} />}
    </>
  );
}