"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 bg-gradient-to-b from-emerald-50 to-white border-t border-emerald-100">
      <motion.div
        className="container mx-auto px-6 text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 drop-shadow-sm leading-tight">
          Stay Connected with <span className="text-emerald-600">Wellness</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 mt-4 text-lg">
          Subscribe to receive health tips, product releases & exclusive offers.
        </p>

        {/* Form */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-auto flex-1 px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none transition shadow-sm"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            Subscribe
          </motion.button>
        </div>

        {/* Small Note */}
        <p className="text-gray-500 text-sm mt-4">
          We respect your privacy. No spam, ever.
        </p>
      </motion.div>
    </section>
  );
}
