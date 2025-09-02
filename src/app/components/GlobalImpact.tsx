"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const Counter = ({ end, duration = 2, suffix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60); // 60fps approx
    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(handle);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16); // 16ms ≈ 60fps
    return () => clearInterval(handle);
  }, [end, duration]);

  return (
    <motion.h3
      className="text-5xl font-extrabold text-primary"
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {count}
      {suffix}
    </motion.h3>
  );
};

const GlobalImpact = () => {
  return (
    <section className="container mx-auto py-16 px-6 text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-primary mb-12"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Our Global Impact in Numbers
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Counter end={24} />
          <p className="text-gray-600 mt-2">Number of Members</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Counter end={7} />
          <p className="text-gray-600 mt-2">Country Presence</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Counter end={100} suffix="+" />
          <p className="text-gray-600 mt-2">Number of MAs</p>
        </div>
      </div>

      <motion.p
        className="mt-8 text-gray-700 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Established in Malta in 2015, we have expanded across the globe with a
        strong presence and impact in multiple regions.
      </motion.p>
    </section>
  );
};

export default GlobalImpact;
