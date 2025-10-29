"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    title: "Superior Quality",
    img: "/superior.webp",
    desc: "We provide premium-grade wellness products crafted with precision and care to ensure maximum purity and effectiveness.",
  },
  {
    title: "Always Fresh Packaging",
    img: "/fresh.webp",
    desc: "Our products are handled and packed with strict hygiene and freshness standards to preserve their natural potency.",
  },
];

export default function Features() {
  return (
    <section className="container mx-auto py-20 px-6">
      {/* Heading */}
      <motion.h2
        className="text-center text-4xl md:text-5xl font-extrabold text-emerald-800 mb-16 tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Why Choose Us
      </motion.h2>

      {/* Feature Grid (2 columns center aligned) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-10 shadow-lg text-center hover:shadow-2xl transition-all duration-300"
            whileHover={{ y: -8, scale: 1.03 }}
          >
            {/* Icon */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <Image
                src={f.img}
                alt={f.title}
                fill
                className="object-contain drop-shadow-md"
              />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-emerald-700 mb-3">
              {f.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
