"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function OliveOilPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image src="/b6.avif" alt="Olive Oil" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-900/60 via-olive-800/40 to-transparent"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold drop-shadow-lg"
          >
            Cold-Pressed Olive Oil: Benefits & Uses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4 text-lg max-w-2xl"
          >
            The heart of Mediterranean health — pure, powerful, and naturally healing.
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto py-16 px-6">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-8 border border-olive-100"
        >
          <p>
            Olive oil is the foundation of natural wellness — rich in antioxidants and monounsaturated fats that promote cardiovascular and skin health.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-olive-700">Key Health Benefits</h2>
          <ul className="list-disc pl-6 mt-4 space-y-1 text-gray-700">
            <li>Reduces LDL cholesterol and boosts heart strength.</li>
            <li>Improves digestion and nutrient absorption.</li>
            <li>Hydrates skin and boosts elasticity.</li>
            <li>Contains antioxidants that slow aging.</li>
          </ul>

          <p className="mt-6">
            Include one tablespoon daily for holistic health benefits — a small step toward lifelong vitality.
          </p>
        </motion.article>

        {/* BACK BUTTON */}
        <div className="mt-10 text-center">
          <Link href="/services/blogs">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#4b7a2f] hover:bg-[#6fa84b] text-white font-semibold rounded-full shadow transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </motion.span>
          </Link>
        </div>
      </section>
    </main>
  );
}
