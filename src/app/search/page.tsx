// src/app/search/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
// import { ONCOLOGY_PRODUCTS } from "@/data/oncology"; // DISABLED
import { FOOD_SUPPLEMENTS } from "@/data/foodsupplements";

// Combine both categories for global search
const ALL_PRODUCTS = [
  // ...ONCOLOGY_PRODUCTS.map(p => ({ ...p, categoryLabel: "Oncology" })), // DISABLED
  ...FOOD_SUPPLEMENTS.map(p => ({ ...p, categoryLabel: "Food Supplement" })),
];

export default function SearchPage() {
  const [q, setQ] = useState("");

  const filtered = ALL_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.description.toLowerCase().includes(q.toLowerCase()) ||
    (p.keyBenefits || []).some((b: string) =>
      b.toLowerCase().includes(q.toLowerCase())
    )
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
          Search Products
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Find oncology medicines, food supplements and more...
        </p>

        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, benefit, description..."
            className="w-full p-5 pl-14 text-lg rounded-full border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none shadow-sm transition-all"
          />
          <svg
            className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-700 text-xl font-bold"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {q ? (
          <p className="text-center text-gray-600 mb-8">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for{" "}
            <strong className="text-emerald-700">&quot;{q}&quot;</strong>
          </p>
        ) : (
          <p className="text-center text-gray-500 mb-8">
            Start typing to search products...
          </p>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      {p.categoryLabel}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-sm text-emerald-600 mb-3">
                    {p.dosage || "N/A"}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {p.description}
                  </p>
                  <Link
                    href={`/shop/products/${p.slug}`}
                    className="block text-center bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : q ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">
              No products found for <strong>&quot;{q}&quot;</strong>
            </p>
            <p className="text-gray-400 mt-2">
              Try different keywords or check spelling
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}