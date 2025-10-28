// src/app/search/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { PRODUCTS } from "@/data/Products";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.description.toLowerCase().includes(q.toLowerCase()) ||
    p.keyBenefits.some(b => b.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">Search Oncology Products</h1>
        <div className="relative">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, benefit, or cancer type..."
            className="w-full p-4 pl-12 text-lg rounded-full border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition"
          />
          <svg className="absolute left-4 top-5 w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {q && (
            <button onClick={() => setQ("")} className="absolute right-4 top-5 text-emerald-500 hover:text-emerald-700">X</button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image src={p.image} alt={p.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-emerald-800">{p.name}</h3>
                <p className="text-sm text-emerald-600 mt-1">{p.dosage}</p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{p.description}</p>
                <Link
                  href={`/shop/products/${p.slug}`}
                  className="mt-4 block text-center bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg py-12">
            No products found for <strong className="text-emerald-600">&quot;{q}&quot;</strong>
          </p>
        )}
      </div>
    </main>
  );
}