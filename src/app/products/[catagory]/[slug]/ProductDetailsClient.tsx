"use client";

import { useState } from "react";
import Image from "next/image";
import OrderForm from "@/app/components/OrderForm";
import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductDetailsClient({ product }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          
          {/* IMAGE */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* CONTENT */}
          <div>
            <h1 className="text-4xl font-bold text-emerald-800">
              {product.name}
            </h1>

            {(product.dosage || product.packSize) && (
              <p className="text-sm text-emerald-600 mt-2">
                {product.dosage} {product.packSize && `• ${product.packSize}`}
              </p>
            )}

            <p className="mt-6 text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* BENEFITS */}
            {product.keyBenefits && (
              <ul className="mt-6 space-y-2">
                {product.keyBenefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700"
                  >
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                    {benefit}
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => setOpen(true)}
              className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition"
            >
              Order Now
            </button>
          </div>
        </div>
      </section>

      {/* ORDER MODAL */}
      {open && (
        <OrderForm product={product} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
