"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const products = [
  {
    name: "Zerodaks",
    price: "",
    img: "/b3.avif",
  },
  {
    name: "Sakara Mork",
    price: "",
    img: "/b2.avif",
  },
  {
    name: "NK Defense",
    price: "",
    img: "/b5.avif",
  },
];

const ProductCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-slide logic
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="container mx-auto py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
        🌟 Featured Products
      </h2>

      <div className="relative w-full max-w-lg mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="bg-white rounded-2xl shadow-xl"
          >
            {/* Product Image */}
            <div className="relative w-full h-60 rounded-t-2xl overflow-hidden">
              <Image
                src={products[current].img}
                alt={products[current].name}
                fill
                className={`object-cover transition-all duration-500 ${
                  paused ? "blur-md scale-105" : ""
                }`}
              />
            </div>

            {/* Product Info */}
            <div className="p-6 text-center">
              <h3 className="font-semibold text-lg text-primary mb-2">
                {products[current].name}
              </h3>
              <p className="text-gray-700 font-medium">
                {products[current].price}
              </p>

              <button
                className="mt-4 w-full bg-primary text-green py-2 px-4 rounded-xl font-semibold shadow hover:bg-primary/90 transition"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                🛒 Shop Now
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductCarousel;
