// src/app/search/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/app/lib/products";
import Link from "next/link";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const filtered = PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <main className="min-h-screen bg-gray-50 py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl text-[#4b7a2f] font-bold mb-4">Search Products</h1>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products by name..." className="w-full p-3 rounded border" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {filtered.length ? filtered.map((p) => (
          <motion.div key={p.id} whileHover={{ scale: 1.02 }} className="bg-white rounded-lg shadow p-4">
            <div className="h-40 relative rounded overflow-hidden">
              <Image src={p.image} alt={p.name} fill style={{ objectFit: "cover" }} />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-[#4b7a2f]">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            <div className="mt-3 flex gap-2">
              {/* if product is food -> link to that shop page, else to appropriate */}
              <Link href={p.category === "food" ? "/shop/food-supplements" : p.category === "oncology" ? "/shop/oncology-products" : "/shop/branded-oncology"} className="text-sm text-white bg-[#4b7a2f] px-3 py-2 rounded">View</Link>
              <button className="text-sm bg-gray-100 px-3 py-2 rounded">Price: {p.price}</button>
            </div>
          </motion.div>
        )) : (
          <div className="text-center col-span-full text-gray-500 mt-8">No products found.</div>
        )}
      </div>
    </main>
  );
}
