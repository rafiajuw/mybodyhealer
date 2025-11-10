// src/app/about/page.tsx
"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  FaLeaf,
  FaGlobe,
  FaAward,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const heroImages = [
  "/b1.avif",
  "/b3.avif",
  "/b5.avif",
  "/b4.avif",
  "/b6.avif",
];

interface Company {
  name: string;
  description: string;
  specialty: string;
}

interface Leader {
  name: string;
  title: string;
  quote: string;
}

interface Category {
  title: string;
  img: string;
}

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
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={img}
            alt={`Hero background ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            priority={index === 0}
            sizes="100vw"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-hero.jpg";
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      ))}

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 max-w-3xl px-6"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg">
          About My Body Healer
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-emerald-100 drop-shadow">
          Natural, evidence-informed supplements and wellness solutions — crafted
          to support healthier lives at scale.
        </p>
      </motion.div>
    </header>
  );
}

interface SliderProps {
  images: string[];
}

function CompanySlider({ images }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);

  const updateVisibleSlides = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) setVisibleSlides(1);
    else if (width < 768) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, []);

  useEffect(() => {
    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, [updateVisibleSlides]);

  const totalSlides = Math.ceil(images.length / visibleSlides);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-8">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
            width: `${(images.length / visibleSlides) * 100}%`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4"
              style={{ width: `${100 / visibleSlides}%` }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-md p-6 h-40 flex items-center justify-center"
              >
                <Image
                  src={image}
                  alt={`Company logo ${index + 1}`}
                  width={160}
                  height={80}
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-logo.png";
                  }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-emerald-50 z-10 transition"
        aria-label="Previous"
      >
        <FaChevronLeft className="text-emerald-600" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-emerald-50 z-10 transition"
        aria-label="Next"
      >
        <FaChevronRight className="text-emerald-600" />
      </button>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === i ? "bg-emerald-600 w-8" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [applied, setApplied] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null); // Safe form reference

  // Events Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);

  const eventImages = [
    "/events1.webp",
    "/events2.webp",
    "/events3.webp",
    "/events4.webp",
    "/events5.webp",
    "/events6.webp",
  ];

  const companyImages = [
    "/logo-1.webp",
    "/logo.webp",
    "/Sharp-logo-2.webp",
    "/WiTribe-Logo-Red.webp",
    "/yellowcreek-st.webp",
  ];

  const companies: Company[] = [
    { name: "Herbal Innovations", description: "Research and development...", specialty: "R&D & Formulation" },
    { name: "Natural Harvest", description: "Organic farming...", specialty: "Sourcing & Agriculture" },
    { name: "Global Wellness Distributors", description: "International distribution...", specialty: "Distribution" },
    { name: "Pure Therapeutics", description: "Clinical-grade supplements...", specialty: "Clinical Products" },
  ];

  const categories: Category[] = [
    { title: "Herbal Supplements", img: "/b1.avif" },
    { title: "Olive Oils & Edibles", img: "/olive.avif" },
    { title: "Skin & Topical", img: "/b1.avif" },
    { title: "Weight & Metabolic", img: "/b3.avif" },
    { title: "Clinical Supplements", img: "/b4.avif" },
    { title: "Bulk / B2B Supplies", img: "/b6.avif" },
  ];

  const leaders: Leader[] = [
    { name: "Ayesha Khan", title: "Founder & CEO", quote: "Our purpose is to enable healthier lives..." },
    { name: "Dr. Omar Riaz", title: "Head of R&D", quote: "Evidence-first approach..." },
    { name: "Sara Malik", title: "Head of Operations", quote: "Reliable supply..." },
    { name: "Bilal Ahmed", title: "Head of Global Sales", quote: "We partner responsibly..." },
  ];

  // Responsive Slides
  const updateSlides = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) setVisibleSlides(1);
    else if (width < 768) setVisibleSlides(2);
    else setVisibleSlides(3);
  }, []);

  useEffect(() => {
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, [updateSlides]);

  const totalSlides = Math.ceil(eventImages.length / visibleSlides);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // FIXED: Safe form submit
  const handleCareerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setStatus("");

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    formData.append("type", "career");

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Server error" }));
        throw new Error(error.message || "Failed to submit");
      }

      const result = await res.json();

      if (result.success) {
        setStatus("Application submitted successfully!");
        setApplied(true);
        form.reset();
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus(result.message || "Failed to submit application.");
      }
    } catch (error: any) {
      console.error("Career form error:", error);
      setStatus(error.message || "Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="font-poppins antialiased text-gray-800">
      <AboutHero />

      {/* OUR STORY */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900"
            >
              Our Story
            </motion.h2>
            <p className="text-gray-700 leading-relaxed">
              My Body Healer began with a simple mission: to make high-quality, natural health products accessible to everyone...
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <h3 className="font-semibold text-emerald-600">Group Overview</h3>
                <p className="text-sm text-gray-600 mt-2">HB Group is a multinational enterprise</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <h3 className="font-semibold text-emerald-600">Corporate Values</h3>
                <p className="text-sm text-gray-600 mt-2">HB Groups Core values</p>
              </motion.div>
            </div>
          </div>
          <aside className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-emerald-50 piddleware-6 rounded-xl border border-emerald-100"
            >
              <h4 className="font-semibold text-emerald-700">Vision</h4>
              <p className="text-sm text-gray-700 mt-2">To be a global leader in natural healing</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-emerald-50 p-6 rounded-xl border border-emerald-100"
            >
              <h4 className="font-semibold text-emerald-700">Mission</h4>
              <p className="text-sm text-gray-700 mt-2">Empower people to live healthier lives</p>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* GROUP COMPANIES */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-4"
          >
            Our Group Companies
          </motion.h3>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            We operate through a network of specialized companies
          </p>
          <CompanySlider images={companyImages} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {companies.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h4 className="font-semibold text-emerald-700">{c.name}</h4>
                <p className="text-sm text-emerald-600">{c.specialty}</p>
                <p className="text-sm text-gray-600 mt-2">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-12 border-t border-b bg-white/80">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-8"
          >
            What We Offer
          </motion.h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: FaLeaf, title: "Herbal Formulations", desc: "Scientifically developed..." },
              { icon: FaGlobe, title: "Global Distribution", desc: "Supply chain & logistics..." },
              { icon: FaAward, title: "Certifications", desc: "GMP, ISO and organic..." },
              { icon: FaUsers, title: "Expert Team", desc: "Formulators, QA, and supply..." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-start gap-3 p-6 bg-emerald-50 rounded-xl border hover:bg-emerald-100 transition"
              >
                <item.icon className="w-8 h-8 text-emerald-600" />
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-6"
          >
            Careers
          </motion.h3>
          <div className="max-w-3xl mx-auto bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            {!applied ? (
              <form ref={formRef} onSubmit={handleCareerSubmit} className="grid md:grid-cols-2 gap-4">
                <input type="hidden" name="type" value="career" />
                <input
                  name="name"
                  required
                  placeholder="Full Name *"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-emerald-600 transition"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email *"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-emerald-600 transition"
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  className="p-3 border rounded-lg"
                />
                <input
                  name="subject"
                  required
                  placeholder="Position *"
                  className="p-3 border rounded-lg"
                />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Cover Letter"
                  className="md:col-span-2 p-3 border rounded-lg resize-none"
                />
                <div className="md:col-span-2">
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-emerald-50 file:text-emerald-700 file:border-0 hover:file:bg-emerald-100 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="md:col-span-2 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-60 transition flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </button>
                {status && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`md:col-span-2 text-center p-3 rounded-lg ${
                      status.includes("successfully")
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status}
                  </motion.p>
                )}
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-emerald-700 font-semibold text-lg">Thank you for applying!</p>
                <button
                  onClick={() => {
                    setApplied(false);
                    setStatus("");
                    formRef.current?.reset();
                  }}
                  className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
                >
                  Apply Again
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-6 py-12">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-center mb-8"
        >
          Wellness Categories
        </motion.h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              <div className="h-44 relative group">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="33vw"
                  className="group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-semibold text-emerald-700">{c.title}</h4>
                <p className="text-sm text-gray-600">High-quality products & wholesale.</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-10"
          >
            Leadership
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h4 className="font-semibold">{l.name}</h4>
                <p className="text-sm text-emerald-600">{l.title}</p>
                <p className="text-sm text-gray-600 mt-2 italic">{l.quote}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS SLIDER */}
      <section className="container mx-auto px-6 py-12">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-center mb-8"
        >
          Events & Engagements
        </motion.h3>
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`,
                width: `${(eventImages.length / visibleSlides) * 100}%`,
              }}
            >
              {eventImages.map((img, i) => (
                <div key={i} className="flex-shrink-0" style={{ width: `${100 / visibleSlides}%` }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative h-80 mx-2 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`Event ${i + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onError={(e) => (e.target as HTMLImageElement).src = "/placeholder-event.jpg"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition flex items-end p-6">
                      <div className="text-white">
                        <h4 className="font-bold text-lg">Event {i + 1}</h4>
                        <p className="text-sm">Conference 2025</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentSlide(prev => prev === 0 ? totalSlides - 1 : prev - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-emerald-50 z-10 transition"
          >
            <FaChevronLeft className="text-emerald-600" />
          </button>

          <button
            onClick={() => setCurrentSlide(prev => prev >= totalSlides - 1 ? 0 : prev + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-emerald-50 z-10 transition"
          >
            <FaChevronRight className="text-emerald-600" />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition-all ${currentSlide === i ? "bg-emerald-600 w-8" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}