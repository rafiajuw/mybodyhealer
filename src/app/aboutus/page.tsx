// src/app/about/page.tsx
"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  FaLeaf,
  FaGlobe,
  FaAward,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

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
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
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
        </div>
      ))}

      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          About My Body Healer
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-emerald-100">
          Natural, evidence-informed supplements and wellness solutions — crafted
          to support healthier lives at scale.
        </p>
      </div>
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
              <div className="bg-white rounded-xl shadow-md p-6 h-40 flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-300">
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
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-emerald-50 z-10"
        aria-label="Previous"
      >
        <FaChevronLeft className="text-emerald-600" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-emerald-50 z-10"
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

  const handleCareerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/form", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("Application submitted successfully!");
        setApplied(true);
        e.currentTarget.reset();
      } else {
        setStatus(result.message || "Failed to submit.");
      }
    } catch (error) {
      setStatus("Network error. Try again.");
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
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              My Body Healer began with a simple mission: to make high-quality, natural health products accessible to everyone...
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold text-emerald-600">Group Overview</h3>
                <p className="text-sm text-gray-600 mt-2">HB Group is a multinational enterprise</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold text-emerald-600">Corporate Values</h3>
                <p className="text-sm text-gray-600 mt-2">HB Groups Core values</p>
              </div>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <h4 className="font-semibold text-emerald-700">Vision</h4>
              <p className="text-sm text-gray-700 mt-2">To be a global leader in natural healing</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <h4 className="font-semibold text-emerald-700">Mission</h4>
              <p className="text-sm text-gray-700 mt-2">Empower people to live healthier lives</p>
            </div>
          </aside>
        </div>
      </section>

      {/* GROUP COMPANIES */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-4">Our Group Companies</h3>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            We operate through a network of specialized companies
          </p>
          <CompanySlider images={companyImages} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {companies.map((c, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h4 className="font-semibold text-emerald-700">{c.name}</h4>
                <p className="text-sm text-emerald-600">{c.specialty}</p>
                <p className="text-sm text-gray-600 mt-2">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-12 border-t border-b bg-white/80">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-8">What We Offer</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: FaLeaf, title: "Herbal Formulations", desc: "Scientifically developed..." },
              { icon: FaGlobe, title: "Global Distribution", desc: "Supply chain & logistics..." },
              { icon: FaAward, title: "Certifications", desc: "GMP, ISO and organic..." },
              { icon: FaUsers, title: "Expert Team", desc: "Formulators, QA, and supply..." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-start gap-3 p-6 bg-emerald-50 rounded-xl border">
                <item.icon className="w-8 h-8 text-emerald-600" />
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-6">Careers</h3>
          <div className="max-w-3xl mx-auto bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            {!applied ? (
              <form onSubmit={handleCareerSubmit} className="grid md:grid-cols-2 gap-4">
                <input type="hidden" name="type" value="career" />
                <input name="name" required placeholder="Full Name *" className="p-3 border rounded-lg focus:ring-2 focus:ring-emerald-600" />
                <input name="email" type="email" required placeholder="Email *" className="p-3 border rounded-lg focus:ring-2 focus:ring-emerald-600" />
                <input name="phone" placeholder="Phone" className="p-3 border rounded-lg" />
                <input name="subject" required placeholder="Position *" className="p-3 border rounded-lg" />
                <textarea name="message" rows={4} placeholder="Cover Letter" className="md:col-span-2 p-3 border rounded-lg resize-none" />
                <div className="md:col-span-2">
                  <input type="file" name="resume" accept=".pdf,.doc,.docx" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-emerald-50 file:text-emerald-700" />
                </div>
                <button type="submit" disabled={sending} className="md:col-span-2 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-60">
                  {sending ? "Sending..." : "Apply Now"}
                </button>
                {status && <p className={`md:col-span-2 text-center p-3 rounded-lg ${status.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{status}</p>}
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-emerald-700 font-semibold">Thank you</p>
                <button onClick={() => { setApplied(false); setStatus(""); }} className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg">Apply Again</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-center mb-8">Wellness Categories</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((c) => (
            <article key={c.title} className="rounded-xl overflow-hidden shadow-sm">
              <div className="h-44 relative">
                <Image src={c.img} alt={c.title} fill style={{ objectFit: "cover" }} sizes="33vw" />
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-semibold">{c.title}</h4>
                <p className="text-sm text-gray-600">High-quality products & wholesale.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-10">Leadership</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((l) => (
              <div key={l.name} className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="font-semibold">{l.name}</h4>
                <p className="text-sm text-emerald-600">{l.title}</p>
                <p className="text-sm text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: l.quote }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS SLIDER */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-center mb-8">Events & Engagements</h3>
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
                  <div className="relative h-80 mx-2 rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`Event ${i + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onError={(e) => (e.target as HTMLImageElement).src = "/placeholder-event.jpg"}
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition flex items-center justify-center">
                      <div className="text-white text-center opacity-0 hover:opacity-100 transition p-4">
                        <h4 className="font-bold">Event {i + 1}</h4>
                        <p className="text-sm">Conference 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentSlide(prev => prev === 0 ? totalSlides - 1 : prev - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-emerald-50 z-10"
          >
            <FaChevronLeft className="text-emerald-600" />
          </button>

          <button
            onClick={() => setCurrentSlide(prev => prev >= totalSlides - 1 ? 0 : prev + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-emerald-50 z-10"
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