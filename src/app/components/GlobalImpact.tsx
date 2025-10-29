"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const Counter = ({ end, duration = 2, suffix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60);

    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(handle);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(handle);
  }, [end, duration, isInView]);

  return (
    <motion.h3
      ref={ref}
      className="text-5xl font-extrabold bg-gradient-to-r from-emerald-700 to-lime-600 bg-clip-text text-transparent drop-shadow-sm"
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {count}
      {suffix}
    </motion.h3>
  );
};

export default function GlobalImpact() {
  return (
    <section className="container mx-auto py-20 px-6 text-center">
      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-emerald-800 tracking-tight mb-14 leading-tight"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        A Trusted Name in <br className="hidden md:block" /> Global Herbal & Therapeutic Wellness
      </motion.h2>

      {/* Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {[
          { value: 24, label: "Team Members" },
          { value: 7, label: "Countries of Presence" },
          { value: 100, label: "Regulatory Registrations", suffix: "+" },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 py-10 px-6 transition-all"
            whileHover={{ y: -6 }}
          >
            <Counter end={item.value} suffix={item.suffix || ""} />
            <p className="mt-3 text-gray-600 font-medium">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Description */}
      <motion.p
        className="mt-12 text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Since our foundation in 2015, we have grown with a vision to make
        advanced natural healing solutions accessible worldwide, while upholding
        the highest standards of science, purity, and trust.
      </motion.p>
    </section>
  );
}
