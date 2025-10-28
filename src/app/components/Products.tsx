"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  { name: "Zerodaks", img: "/b1.avif" },
  { name: "Sakara Mork", img: "/b4.avif" },
  { name: "NK Defense", img: "/olive2.avif" },
];

export default function Products() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 0, seconds: 0 });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container mx-auto py-12 px-4">
      {/* Heading with Timer */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-emerald-700 drop-shadow-sm">
          Special Limited Time Offers
        </h2>
        <p className="text-gray-600 mt-2">
          Grab your favorite products before the deal ends!
        </p>
        <div className="mt-4 inline-block bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
          Ends in: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map((product, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300"
          >
            {/* Product Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay with Shop Now */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
                >
                  Shop Now
                </motion.button>
              </div>
            </div>

            {/* Product Name Only */}
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900">
                {product.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}