"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const products = [
  { name: "Mormiks", img: "/b4.avif", slug: "mormiks" },
  { name: "Zeredemiks", img: "/b5.avif", slug: "zeredemiks" },
  { name: "Lifmo", img: "/b3.avif", slug: "lifmo" },
  { name: "Olive Oil", img: "/olive2.avif", slug: "olive-oil" },
  { name: "NK Defense", img: "/foodsupplement/nk.png", slug: "nk-defense" },
];

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="container mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold text-center text-emerald-800 mb-14 tracking-wide">
        Featured Food Supplements
      </h2>

      <div
        className="relative max-w-lg mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="backdrop-blur-xl shadow-2xl rounded-3xl bg-white/80 border border-white/60 overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={products[current].img}
                alt={products[current].name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
                priority
              />
            </div>

            {/* TEXT + BUTTON */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-emerald-900 mb-3 tracking-wide">
                {products[current].name}
              </h3>

              <div className="flex gap-3">
                <Link href={`/shop/products/${products[current].slug}`} className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-xl text-white font-semibold shadow-lg
                    bg-gray-800 hover:bg-gray-900 transition-all text-sm"
                  >
                    View Details
                  </motion.button>
                </Link>
                <Link href={`/shop/products/${products[current].slug}`} className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-xl text-white font-semibold shadow-lg
                    bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600
                    transition-all text-sm"
                  >
                    Order COD
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* DOT INDICATORS */}
        <div className="flex justify-center space-x-2 mt-5">
          {products.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                current === i ? "bg-emerald-600 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
