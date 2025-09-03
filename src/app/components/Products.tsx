"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  {
    name: "Zerodaks",
    price: 20,
    oldPrice: 30,
    img: "/b1.avif",
    discount: "33% OFF",
  },
  {
    name: "Sakara Mork",
    price: 30,
    oldPrice: 50,
    img: "/b4.avif",
    discount: "40% OFF",
  },
  {
    name: "NK Defense",
    price: 100,
    oldPrice: 150,
    img: "/olive2.avif",
    discount: "30% OFF",
  },
];

const Products = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 0, seconds: 0 });

  // Countdown timer
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
    <section className="container mx-auto py-12 px-4">
      {/* Heading with Timer */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-primary drop-shadow-sm">
          🔥 Special Limited Time Offers
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
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden group transition-all"
          >
            {/* Discount Badge */}
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              {product.discount}
            </span>

            {/* Product Image with Hover Overlay */}
            <div className="relative w-full h-48">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-110 group-hover:blur-sm"
              />

              {/* Overlay with Button */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-lg font-semibold shadow-lg"
                >
                  🛒 Shop Now
                </motion.button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-primary">{product.name}</h3>
              <div className="flex items-center justify-center gap-3 mt-2">
                <p className="text-xl font-semibold text-green-600">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-400 line-through">
                  ${product.oldPrice}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Products;
