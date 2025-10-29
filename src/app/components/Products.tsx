"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  { name: "Anastrozole", img: "/anastrozole.webp" },
  { name: "Letrozole", img: "/letrozole.webp" },
  { name: "Bicalutamide", img: "/bicalutamide.jpg" },
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
        <h2 className="text-4xl font-bold text-emerald-800 tracking-wide">
          Limited Time Oncology Offers
        </h2>
        <p className="text-gray-600 mt-2">
          Best prices - clinically trusted formulations
        </p>

        <div className="mt-5 inline-block bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
          Offer Ends in: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {products.map((product, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden group"
          >
            {/* Product Image */}
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Text & Button */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {product.name}
              </h3>

              <Link href="/shopnow">
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
