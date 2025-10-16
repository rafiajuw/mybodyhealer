"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function CancerNutritionPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image src="/b2.avif" alt="Oncology Support" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-900/60 via-olive-800/40 to-transparent"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold drop-shadow-lg"
          >
            Nutrition Support for Oncology Patients
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4 text-lg max-w-2xl"
          >
            Empowering patients with healing nutrition to regain strength and balance.
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
            Nutritional therapy plays a vital role during cancer recovery. High-quality nutrition supports the immune system, muscle repair, and mental well-being.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-olive-700">Recommended Nutrients</h2>
          <ul className="list-disc pl-6 mt-4 space-y-1 text-gray-700">
            <li>Omega-3 Fatty Acids – reduce inflammation and boost energy.</li>
            <li>Proteins – rebuild muscle tissue and promote healing.</li>
            <li>Antioxidants – combat free radicals.</li>
            <li>Herbal Extracts – restore balance and immunity.</li>
          </ul>

          <p className="mt-6">
            At My Body Healer, we combine medical expertise with nature’s nutrition to deliver safe, supportive care solutions.
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
