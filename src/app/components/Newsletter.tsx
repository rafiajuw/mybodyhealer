"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("loading");

    try {
      const data = new FormData();
      data.append("type", "contact");
      data.append("name", "Newsletter Subscriber");
      data.append("email", email);
      data.append("message", "Newsletter subscription request");

      const res = await fetch("/api/form", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-emerald-50 to-white border-t border-emerald-100">
      <motion.div
        className="container mx-auto px-6 text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 drop-shadow-sm leading-tight">
          Stay Connected with <span className="text-emerald-600">Wellness</span>
        </h2>

        <p className="text-gray-600 mt-4 text-lg">
          Subscribe to receive health tips, product releases & exclusive offers.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            className="w-full sm:w-auto flex-1 px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none transition shadow-sm"
          />

          <motion.button
            onClick={handleSubscribe}
            disabled={status === "loading"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </motion.button>
        </div>

        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-emerald-700 font-medium bg-emerald-50 py-2 px-4 rounded-lg inline-block"
          >
            Thank you for subscribing!
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-red-600 font-medium bg-red-50 py-2 px-4 rounded-lg inline-block"
          >
            Please enter a valid email address.
          </motion.p>
        )}

        {status === "idle" && (
          <p className="text-gray-500 text-sm mt-4">
            We respect your privacy. No spam, ever.
          </p>
        )}
      </motion.div>
    </section>
  );
}
