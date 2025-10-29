"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Food Supplements",
    href: "/shop",
    img: "/b1.avif",
    hoverImg: "/b2.avif",
  },
  {
    title: "Olive Oils & Edibles",
    href: "/shop",
    img: "/olive.avif",
    hoverImg: "/olive1.avif",
  },
  {
    title: "Oncology Medicines",
    href: "/shop",
    img: "/b4.avif",
    hoverImg: "/b5.avif",
  },
];

export default function Categories() {
  return (
    <section className="container mx-auto py-20 px-6">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-5xl font-extrabold text-emerald-800 mb-14 tracking-tight"
      >
        Explore Wellness By{" "}
        <span className="text-emerald-600">Category</span>
      </motion.h2>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl bg-white"
          >
            <Link href={cat.href}>
              {/* Default Image */}
              <Image
                src={cat.img}
                alt={cat.title}
                width={450}
                height={300}
                className="object-cover w-full h-64 transition-all duration-500 group-hover:opacity-0"
              />

              {/* Hover Image */}
              <Image
                src={cat.hoverImg}
                alt={`${cat.title} Hover`}
                width={450}
                height={300}
                className="object-cover w-full h-64 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
              />

              {/* Overlay Button */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.93 }}
                  className="px-6 py-3 rounded-full font-semibold bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition"
                >
                  Shop Now
                </motion.button>
              </div>

              {/* Title Tag */}
              <h3 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-lg md:text-xl font-bold text-white bg-black/50 px-5 py-2 rounded-xl backdrop-blur-md">
                {cat.title}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
