"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  reading: string;
  image: string;
}

function useTilt(active = true) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      el.style.setProperty("--px", String(px));
      el.style.setProperty("--py", String(py));
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [active]);

  return ref;
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const ref = useTilt(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={ref}
        className="bg-white rounded-2xl shadow-lg overflow-hidden transform-gpu hover:shadow-xl transition"
        style={{
          transform:
            "perspective(1000px) rotateX(calc((var(--py,0.5)-0.5)*6deg)) rotateY(calc((var(--px,0.5)-0.5)*-6deg))",
        }}
      >
        <div className="md:flex">
          <div className="md:w-1/3 relative h-48 md:h-auto">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{post.date}</span>
              <span>{post.reading}</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-neutral-800">
              {post.title}
            </h3>
            <p className="mt-2 text-gray-600">{post.excerpt}</p>

            <div className="mt-4 flex items-center justify-between">
              <Link href={`/services/blogs/${post.slug}`}>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#4b7a2f] hover:bg-[#6fa84b] text-white text-sm font-medium shadow transition cursor-pointer">
                  Read More
                </span>
              </Link>
              <div className="text-sm text-gray-500">By My Body Healer</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
