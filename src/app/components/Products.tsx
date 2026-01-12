"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// Combined list of featured products (Oncology + Food Supplements)
const featuredProducts = [
  // Oncology Products
  { name: "Anastrozole", img: "/anastrozole.webp", category: "Oncology" },
  { name: "Letrozole", img: "/letrozole.webp", category: "Oncology" },
  { name: "Bicalutamide", img: "/bicalutamide.jpg", category: "Oncology" },
  { name: "Capecitabine", img: "/capecitabine.avif", category: "Oncology" },
  
  // Food Supplements
  { name: "Ibooster", img: "/ibooster.jpg", category: "Food Supplement" },
  { name: "Bestman", img: "/bestman.jpg", category: "Food Supplement" },
  { name: "Femopause", img: "/femopause.jpg", category: "Food Supplement" },
  { name: "Origin Collagen", img: "/origin-collagen.jpg", category: "Food Supplement" },
  { name: "Goutrol", img: "/goutrol.jpg", category: "Food Supplement" },
  { name: "Prostatol", img: "/prostatol.jpg", category: "Food Supplement" },
];

export default function Products() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container mx-auto py-16 px-6">
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 tracking-wide mb-4">
          Limited Time Offers
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Oncology Medicines & Food Supplements – Best Prices & Trusted Quality
        </p>

        <div className="inline-block bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg">
          Offer Ends in: {timeLeft.hours.toString().padStart(2, '0')}h{" "}
          {timeLeft.minutes.toString().padStart(2, '0')}m{" "}
          {timeLeft.seconds.toString().padStart(2, '0')}s
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden group flex flex-col"
          >
            {/* Product Image */}
            <div className="relative w-full h-64 overflow-hidden">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Category Badge */}
              <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {product.category}
              </span>
            </div>

            {/* Text & Button */}
            <div className="p-6 text-center flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-2">
                {product.name}
              </h3>

              <Link href="/shop/products" className="mt-auto">
                <motion.button
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transition"
                >
                  Shop Now →
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}