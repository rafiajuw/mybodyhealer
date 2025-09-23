"use client";

import Image from "next/image";
import Link from "next/link";   // ✅ Link import
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaShippingFast, FaLeaf, FaAward, FaHeadset } from "react-icons/fa";

// Testimonials Data
const testimonials = [
  {
    name: "Ali Khan",
    text: "Their services are outstanding! The team is professional and very supportive.",
  },
  {
    name: "Fatima Ahmed",
    text: "Amazing experience, I really loved the quality and timely delivery.",
  },
  {
    name: "Hassan Raza",
    text: "Excellent customer service and top-notch products!",
  },
];

// Hero Images (must exist in /public)
const heroImages = ["/b1.avif", "/b3.avif", "/b4.avif", "/b5.avif", "/b6.avif"];

export default function ServicePage() {
  const [current, setCurrent] = useState(0);

  // Hero Slider auto-play (smooth & slower)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 10000); // 10s per slide
    return () => clearInterval(interval);
  }, []);

  // Testimonials Slider state
  const [testimonial, setTestimonial] = useState(0);

  const nextSlide = () => {
    setTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="w-full">
      {/* Hero Section (Slider) */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img}
              alt={`Service Hero ${index}`}
              fill
              priority={index === 0}
              className="object-cover"
            />
            {/* Overlay with text */}
            {index === current && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
                <motion.h1
                  key={current}
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-4xl md:text-6xl font-bold drop-shadow-lg"
                >
                  Our Services
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="mt-4 text-lg md:text-xl"
                >
                  Home &gt; Services
                </motion.p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Welcome Section */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="/services.webp"
            alt="Welcome"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Welcome to Our Services</h2>
          <p className="text-gray-600 leading-relaxed">
            We provide high-quality out-licensing products and contract
            services. Our goal is to ensure customer satisfaction with superior
            standards, fresh products, and dedicated support.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Our Expertise</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col">
            <h3 className="text-2xl font-semibold mb-4">
              Out-Licensing Products
            </h3>
            <p className="text-gray-600 flex-grow">
              Providing world-class licensed products to meet international
              standards with guaranteed quality and compliance.
            </p>
            <Link href="/services/licenced">
              <button className="mt-6 bg-green-900 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition self-start">
                Read More
              </button>
            </Link>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col">
            <h3 className="text-2xl font-semibold mb-4">Contract Services</h3>
            <p className="text-gray-600 flex-grow">
              Offering customized contract-based services for research,
              manufacturing, and development solutions.
            </p>
            <Link href="/services/contract">
              <button className="mt-6 bg-green-900 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition self-start">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Stay updated with the latest news and services we offer.
        </p>
        <div className="flex justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg border w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Link href="/subscribe">
            <button className="bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
              Subscribe
            </button>
          </Link>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-16 px-6 md:px-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Clients Say</h2>
        <div className="max-w-2xl mx-auto">
          <motion.div
            key={testimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-md"
          >
            <p className="text-gray-700 italic mb-4">
              &quot;{testimonials[testimonial].text}&quot;
            </p>
            <h4 className="font-bold">{testimonials[testimonial].name}</h4>
          </motion.div>

          {/* Slider Controls */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
            >
              ◀
            </button>
            <button
              onClick={nextSlide}
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
            >
              ▶
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-4 gap-8 text-center">
        <div className="flex flex-col items-center">
          <FaShippingFast className="text-4xl text-blue-600 mb-4" />
          <h3 className="font-semibold">Free Shipping</h3>
        </div>
        <div className="flex flex-col items-center">
          <FaLeaf className="text-4xl text-green-600 mb-4" />
          <h3 className="font-semibold">Always Fresh</h3>
        </div>
        <div className="flex flex-col items-center">
          <FaAward className="text-4xl text-yellow-600 mb-4" />
          <h3 className="font-semibold">Superior Quality</h3>
        </div>
        <div className="flex flex-col items-center">
          <FaHeadset className="text-4xl text-purple-600 mb-4" />
          <h3 className="font-semibold">Support</h3>
        </div>
      </section>
    </div>
  );
}
