"use client";

import { motion } from "framer-motion";

const Introduction = () => {
  return (
    <section className="container mx-auto py-16 px-6 text-center">
      {/* Animated Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-snug"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Empowering Your Journey to <span className="text-olive">Natural Wellness</span>
      </motion.h2>

      {/* Animated Paragraph */}
      <motion.p
        className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        At <span className="font-semibold text-primary">My Body Healer</span>, we are dedicated to providing 
        <span className="text-olive"> natural</span>, safe, and effective products that support 
        your mind, body, and spirit. Our carefully curated wellness range is designed 
        to enhance your holistic lifestyle and bring balance into your everyday life.
      </motion.p>
    </section>
  );
};

export default Introduction;
