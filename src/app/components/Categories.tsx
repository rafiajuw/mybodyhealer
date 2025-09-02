"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Vitamins",
    img: "/b1.avif",
    hoverImg: "/b2.avif",
  },
  {
    title: "Nutritions",
    img: "/olive.avif",
    hoverImg: "/olive1.avif",
  },
  {
    title: "Tablets",
    img: "/b4.avif",
    hoverImg: "/b5.avif",
  },
];

const Categories = () => {
  return (
    <section className="container mx-auto py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        Explore Our Categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all"
            whileHover={{ scale: 1.03 }}
          >
            {/* Default Image */}
            <Image
              src={cat.img}
              alt={cat.title}
              width={500}
              height={350}
              className="object-cover w-full h-64 transition-opacity duration-500 group-hover:opacity-0"
            />

            {/* Hover Image */}
            <Image
              src={cat.hoverImg}
              alt={`${cat.title} hover`}
              width={500}
              height={350}
              className="object-cover w-full h-64 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Overlay with Shop Now */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-primary to-olive text-white font-semibold rounded-full shadow-lg transition duration-300 hover:shadow-2xl"
              >
                Shop Now
              </motion.button>
            </div>

            {/* Category Title */}
            <h3 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-lg font-bold text-white bg-black/60 px-4 py-1 rounded-lg backdrop-blur-sm">
              {cat.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
