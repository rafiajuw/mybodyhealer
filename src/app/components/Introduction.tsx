"use client";

import { motion } from "framer-motion";

export default function Introduction() {
  return (
    <section className="container mx-auto py-20 px-6 text-center">
      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold tracking-tight text-emerald-800 mb-6 leading-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Rebuilding Health Through{" "}
        <span className="bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
          Natural Science
        </span>
      </motion.h2>

      {/* Subline */}
      <motion.p
        className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed mb-8"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        viewport={{ once: true }}
      >
        At <span className="font-semibold text-emerald-700">My Body Healer</span>, 
        we believe the body has an inherent ability to restore itself. 
        Our formulations are developed with **clinical precision**, focusing on 
        natural healing, cellular regeneration, and long-term well-being.
      </motion.p>

      {/* Supporting Line */}
      <motion.p
        className="max-w-2xl mx-auto text-gray-600 text-base leading-relaxed"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
      >
        We don’t just manage symptoms — we work to address the **root cause**, 
        empowering you to live balanced, energized, and fully aligned with your natural health.
      </motion.p>
    </section>
  );
}
