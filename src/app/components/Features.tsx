"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    img: "/freeshipping.webp", // ✅ direct public se access hoga
    title: "Free Shipping Over $50",
  },
  {
    img: "/fresh.webp",
    title: "Always Fresh Product Package",
  },
  {
    img: "/superior.webp",
    title: "Superior Quality",
  },
];

const Features = () => {
  return (
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">
        Why Choose Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            {/* Feature Image */}
            <div className="relative w-20 h-20 mb-4">
              <Image
                src={feature.img}
                alt={feature.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-primary">
              {feature.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
