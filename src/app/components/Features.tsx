"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-primary mb-14 tracking-tight">
        Why Choose Us
      </h2>

      <motion.div
        className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 border border-gray-200"
        whileHover={{ scale: 1.05 }}
      >
        <div className="relative w-24 h-24 mb-6">
          <Image
            src="/superior.webp"
            alt="Superior Quality"
            fill
            className="object-contain"
          />
        </div>

        <h3 className="text-2xl font-semibold text-primary mb-2">
          Superior Quality
        </h3>
        <p className="text-gray-600 max-w-md text-sm leading-relaxed">
          We offer premium grade products that meet the highest quality
          standards to ensure a fresh and exceptional experience every time.
        </p>
      </motion.div>
    </section>
  );
};

export default Features;
