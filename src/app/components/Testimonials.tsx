"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const testimonials = [
  {
    name: "Gareth Smith",
    role: "System Analyst",
    text: "Far away behind the word mountains, they deliver the best holistic healing solutions.",
    rating: 5,
  },
  {
    name: "Jane Doe",
    role: "Marketing Manager",
    text: "Excellent products and outstanding customer service. My wellness improved drastically!",
    rating: 4,
  },
  {
    name: "John Lee",
    role: "Interface Designer",
    text: "Highly recommend My Body Healer for anyone seeking quality and professionalism.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="container mx-auto py-20 px-6">
      {/* Section Title */}
      <motion.h2
        className="text-center text-4xl md:text-5xl font-extrabold text-emerald-800 mb-14 tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        What Our Customers Are Saying
      </motion.h2>

      {/* Sliding Testimonials */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex gap-8"
          animate={{ x: paused ? 0 : "-100%" }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {testimonials.concat(testimonials).map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="min-w-[320px] max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-gray-100 select-none"
            >
              <p className="text-gray-700 italic leading-relaxed mb-4">
                “{t.text}”
              </p>

              {/* Rating Stars */}
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    className={`h-5 w-5 ${
                      index < t.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Name + Role */}
              <h4 className="text-lg font-bold text-emerald-700">{t.name}</h4>
              <p className="text-sm text-gray-500">{t.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
