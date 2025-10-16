"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard, { BlogPost } from "@/app/components/blogcard"; // ✅ fixed casing

// ✅ 5 Hero Images
const heroImages = [
  "/b1.avif",
  "/b2.avif",
  "/b5.avif",
  "/b6.avif",
  "/b7.avif",
];

// ✅ Sample Blog Posts
const POSTS: BlogPost[] = [
  {
    slug: "natural-immunity-boosters",
    title: "Top Natural Immunity Boosters for 2025",
    excerpt:
      "Discover clinically-backed natural supplements and lifestyle tips to strengthen your immune system year-round.",
    date: "2025-07-05",
    reading: "4 min",
    image: "/imune1.jpg",
  },
  {
    slug: "olive-oil-benefits",
    title: "Cold-Pressed Olive Oil: Benefits & Uses",
    excerpt:
      "Why cold-pressed extra virgin olive oil is a staple for heart health, skin care, and culinary excellence.",
    date: "2025-06-20",
    reading: "3 min",
    image: "/b6.avif", // ✅ added slash
  },
  {
    slug: "cancer-supportive-nutrition",
    title: "Nutrition Support for Oncology Patients",
    excerpt:
      "A practical guide for caregivers: nutrition, supplements, and safe practices to support cancer care.",
    date: "2025-05-15",
    reading: "6 min",
    image: "/b2.avif", // ✅ added slash
  },
];

export default function BlogListPage() {
  const [index, setIndex] = useState(0);

  // Auto-change image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* 🔹 HERO SECTION */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-olive-50/40">
        <AnimatePresence>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Image
              src={heroImages[index]}
              alt={`Blog hero ${index + 1}`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-olive-900/40 backdrop-blur-sm" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold text-white drop-shadow-lg"
          >
            My Body Healer Blog
          </motion.h1>
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-4 text-lg text-gray-100 max-w-2xl"
          >
            Explore natural wellness insights, expert tips, and research-based
            health knowledge from our professionals.
          </motion.p>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 w-full flex justify-center gap-3">
          {heroImages.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i === index ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 🔹 BLOG CARDS SECTION */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Blog Cards */}
          <div className="lg:col-span-2 space-y-6">
            {POSTS.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>

          {/* Right Column - Sidebar */}
          <aside className="bg-white rounded-2xl p-6 shadow">
            <h4 className="font-semibold text-olive-800 mb-3">Categories</h4>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>Vitamins</li>
              <li>Capsules</li>
              <li>Oncology</li>
              <li>Olive Oil & Nutrition</li>
            </ul>

            <h4 className="font-semibold text-olive-800 mb-3">Recent Posts</h4>
            <ul className="text-gray-600 space-y-3">
              {POSTS.slice(0, 3).map((s) => (
                <li key={s.slug}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative rounded overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm">{s.title}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
