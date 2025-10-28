"use client";

import { useState } from "react";
import Image from "next/image";
import OrderForm from "@/app/components/OrderForm";

export default function ProductDetailsClient({ product }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-emerald-800">{product.name}</h1>
            <p className="text-sm text-emerald-600 mt-2">
              {product.dosage} • {product.packSize}
            </p>

            <p className="mt-6 text-gray-700 leading-relaxed">
              {product.description}
            </p>

            <button
              onClick={() => setOpen(true)}
              className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {open && <OrderForm product={product} onClose={() => setOpen(false)} />}
    </>
  );
}
