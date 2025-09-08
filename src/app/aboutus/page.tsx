"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaLeaf,
  FaGlobe,
  FaAward,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const heroImages: string[] = [
  "/b1.avif",
  "/b3.avif",
  "/b5.avif",
  "/b4.avif",
  "/b6.avif",
];

function AboutHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative h-[70vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 scale-105" : "opacity-0 scale-110"
          }`}
        >
          <Image
            src={img}
            alt={`Hero bg ${index}`}
            fill
            style={{ objectFit: "cover" }}
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          About My Body Healer
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-emerald-100/95">
          Natural, evidence-informed supplements and wellness solutions &mdash; 
          crafted to support healthier lives at scale.
        </p>
      </div>
    </header>
  );
}

// TypeScript interface for props
interface CompanySliderProps {
  images: string[];
}

function CompanySlider({ images }: CompanySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleSlides(1);
      else if (window.innerWidth < 768) setVisibleSlides(2);
      else if (window.innerWidth < 1024) setVisibleSlides(3);
      else setVisibleSlides(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= Math.ceil(images.length / visibleSlides)
        ? 0
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.ceil(images.length / visibleSlides) - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-8">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleSlides}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4"
              style={{ width: `${100 / visibleSlides}%` }}
            >
              <div className="bg-white rounded-xl shadow-md p-6 h-40 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105">
                <Image
                  src={image}
                  alt={`Company ${index + 1}`}
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-emerald-50 transition-colors duration-200 z-10"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-emerald-600" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-emerald-50 transition-colors duration-200 z-10"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-emerald-600" />
      </button>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(images.length / visibleSlides) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-emerald-600 w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          )
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [applied, setApplied] = useState(false);

  // Company logos (example)
  const companyImages: string[] = [
    "/logo-1.webp",
    "/logo.webp",
    "/Sharp-logo-2.webp",
    "/WiTribe-Logo-Red.webp",
    "/yellowcreek-st.webp",
  ];

  return (
    <main className="font-poppins antialiased text-gray-800">
      <AboutHero />

      {/* INTRO & VALUES */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              My Body Healer began with a simple mission: to make high-quality,
              natural health products accessible to everyone. We source trusted raw
              materials, partner with certified manufacturers and deliver
              wellness-focused products to retailers, practitioners and clients
              worldwide.
            </p>
          </div>

          <aside className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-emerald-700">Vision</h4>
              <p className="mt-2 text-sm text-gray-700">
                To be a global leader in natural healing products and holistic
                wellness.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-emerald-700">Mission</h4>
              <p className="mt-2 text-sm text-gray-700">
                Empower people to live healthier lives by delivering safe,
                effective, and responsibly sourced products.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Company Slider */}
      <CompanySlider images={companyImages} />

      {/* CAREERS */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Careers
          </h3>

          <div className="max-w-3xl mx-auto bg-emerald-50 border border-emerald-100 rounded-xl p-6">
            <p className="text-gray-700 mb-4">
              We&apos;re growing. If you&apos;re passionate about natural health and quality,
              join our team.
            </p>

            {!applied ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setApplied(true);
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  name="name"
                  required
                  placeholder="Full name"
                  className="p-3 border rounded"
                />
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="Email"
                  className="p-3 border rounded"
                />
                <input
                  name="position"
                  placeholder="Position applying for"
                  className="p-3 border rounded"
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  className="p-3 border rounded"
                />
                <textarea
                  name="message"
                  placeholder="Short message"
                  className="p-3 border rounded md:col-span-2"
                  rows={4}
                />
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-3 rounded-md md:col-span-2"
                >
                  Apply Now
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-emerald-700 font-semibold">
                  Thanks &mdash; your application has been received.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
