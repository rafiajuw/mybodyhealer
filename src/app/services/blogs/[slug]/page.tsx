"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BlogPost } from "@/app/components/blogcard";

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

const POSTS: BlogPost[] = [
  {
    slug: "natural-immunity-boosters",
    title: "Top Natural Immunity Boosters for 2025",
    excerpt:
      "Discover clinically-backed natural supplements and lifestyle tips to strengthen your immune system year-round.",
    date: "2025-07-05",
    reading: "4 min",
    image: "/b5.avif",
  },
  {
    slug: "olive-oil-benefits",
    title: "Cold-Pressed Olive Oil: Benefits & Uses",
    excerpt:
      "Why cold-pressed extra virgin olive oil is a staple for heart health, skin care, and culinary excellence.",
    date: "2025-06-20",
    reading: "3 min",
    image: "/b3.avif",
  },
  {
    slug: "cancer-supportive-nutrition",
    title: "Nutrition Support for Oncology Patients",
    excerpt:
      "A practical guide for caregivers: nutrition, supplements, and safe practices to support cancer care.",
    date: "2025-05-15",
    reading: "6 min",
    image: "/b2.avif",
  },
];

// ✅ make the function async and await params
export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug) || POSTS[0];

  return (
    <main className="bg-white text-gray-900">
      {/* 🔹 HERO SECTION */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-900/70 via-olive-800/40 to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-extrabold drop-shadow-lg"
          >
            {post.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-4 max-w-2xl text-gray-100"
          >
            {post.excerpt}
          </motion.p>
        </div>
      </section>

      {/* 🔹 BLOG CONTENT */}
      <section className="max-w-4xl mx-auto py-16 px-6">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-olive-100"
        >
          <div className="text-sm text-gray-500 mb-4">
            {post.date} • {post.reading}
          </div>

          <p className="leading-relaxed">
            At <strong>My Body Healer</strong>, we believe in the synergy between
            science and nature. Our supplements are carefully formulated using
            high-quality natural ingredients, helping promote better health,
            immunity, and balance in everyday life.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-olive-700">
            Key Highlights
          </h2>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
            <li>
              Research-driven products with clinically-tested ingredients.
            </li>
            <li>Trusted formulations for long-term wellness and recovery.</li>
            <li>Pure olive-based nutrition for enhanced vitality.</li>
          </ul>

          <blockquote className="border-l-4 border-[#4b7a2f] pl-4 italic text-gray-600 mt-8">
            “Your body’s natural ability to heal itself is the greatest
            medicine. Nourish it, protect it, and let it thrive.”
          </blockquote>
        </motion.article>

        {/* 🔹 BUTTONS */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/services/blogs">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#4b7a2f] hover:bg-[#6fa84b] text-white font-semibold rounded-full shadow transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </motion.span>
          </Link>

          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border border-[#4b7a2f] text-[#4b7a2f] hover:bg-[#4b7a2f] hover:text-white rounded-full font-medium transition shadow-sm"
          >
            Contact Medical Team
          </a>
        </div>
      </section>
    </main>
  );
}
