"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaLeaf,
  FaGlobe,
  FaAward,
  FaUsers,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
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
            index === current ? "opacity-100 scale-105" : "opacity-0 scale-110"
          }`}
        >
          <Image
            src={img}
            alt={`Hero background ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          About My Body Healer
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-emerald-100/95">
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

  const totalSlides = Math.ceil(images.length / visibleSlides);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-8">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleSlides}%)`,
            width: `${images.length * (100 / visibleSlides)}%`,
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
                  alt={`Company logo ${index + 1}`}
                  width={160}
                  height={80}
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-emerald-50 transition-colors duration-200 z-10"
        aria-label="Previous company slide"
      >
        <FaChevronLeft className="text-emerald-600" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-emerald-50 transition-colors duration-200 z-10"
        aria-label="Next company slide"
      >
        <FaChevronRight className="text-emerald-600" />
      </button>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-emerald-600 w-6" : "bg-gray-300"
            }`}
            aria-label={`Go to company slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [applied, setApplied] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const [eventImages] = useState([
    "/events1.webp",
    "/events2.webp",
    "/events3.webp",
    "/events4.webp",
    "/events5.webp",
    "/events6.webp",
  ]);
  const totalSlides = Math.ceil(eventImages.length / visibleSlides);

  const companyImages = [
    "/logo-1.webp",
    "/logo.webp",
    "/Sharp-logo-2.webp",
    "/WiTribe-Logo-Red.webp",
    "/yellowcreek-st.webp",
  ];

  const companies: Company[] = [
    {
      name: "Herbal Innovations",
      description: "Research and development of advanced herbal formulations",
      specialty: "R&D & Formulation",
    },
    {
      name: "Natural Harvest",
      description: "Organic farming and sustainable sourcing of raw materials",
      specialty: "Sourcing & Agriculture",
    },
    {
      name: "Global Wellness Distributors",
      description: "International distribution and supply chain management",
      specialty: "Distribution",
    },
    {
      name: "Pure Therapeutics",
      description: "Clinical-grade supplements for healthcare practitioners",
      specialty: "Clinical Products",
    },
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
    {
      name: "Ayesha Khan",
      title: "Founder & CEO",
      quote: "Our purpose is to enable healthier lives using time-tested natural ingredients and modern science.",
    },
    {
      name: "Dr. Omar Riaz",
      title: "Head of R&D",
      quote: "Evidence-first approach — formulations that are safe, effective and consistent.",
    },
    {
      name: "Sara Malik",
      title: "Head of Operations",
      quote: "Reliable supply, on-time delivery and strict quality controls.",
    },
    {
      name: "Bilal Ahmed",
      title: "Head of Global Sales",
      quote: "We partner responsibly to meet bulk and retail needs across markets.",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleSlides(1);
      else if (window.innerWidth < 768) setVisibleSlides(2);
      else setVisibleSlides(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev >= totalSlides - visibleSlides ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [visibleSlides, totalSlides]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission (replace with actual API call)
    try {
      // Example: await fetch('/api/submit', { method: 'POST', body: new FormData(e.currentTarget) });
      setApplied(true);
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-emerald-600">Group Overview</h3>
                <p className="mt-2 text-sm text-gray-600">
                  HB Group is a multinational enterprise, with core expertise in the
                  field of telecommunication and information technology primarily.
                  HB Group holds 9 flagship international companies which have grown
                  steadfastly and conscientiously with guiding principles of
                  commitment, care and vision with a genuine concern for giving back
                  to the community.
                </p>
              </div>

              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-emerald-600">Corporate Values</h3>
                <p className="mt-2 text-sm text-gray-600">
                  HB Group&apos;s Core values are the building blocks upon which we have
                  built our business “Create & Innovate, Protect & Connect in life
                  so people can choose a world of unlimited possibilities.” They are
                  embodied in the way we manage our business, treat our employees,
                  and serve our valued customers.
                </p>
              </div>
            </div>
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
                Empower people to live healthier lives by delivering safe, effective,
                and responsibly sourced products.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* GROUP COMPANIES SECTION */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Our Group Companies
          </h3>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            We operate through a network of specialized companies, each focused on
            different aspects of wellness and natural health solutions.
          </p>

          <CompanySlider images={companyImages} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {companies.map((company, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h4 className="font-semibold text-lg text-emerald-700">
                  {company.name}
                </h4>
                <p className="text-sm text-emerald-600 mt-1">
                  {company.specialty}
                </p>
                <p className="mt-3 text-sm text-gray-600">
                  {company.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES / STATS */}
      <section className="bg-white/80 border-t border-b py-12">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            What We Offer
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-start gap-3 p-6 bg-emerald-50 rounded-xl border">
              <FaLeaf className="text-emerald-600 w-8 h-8" />
              <h4 className="font-semibold">Herbal Formulations</h4>
              <p className="text-sm text-gray-600">
                Scientifically developed herbal blends & supplements.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 p-6 bg-emerald-50 rounded-xl border">
              <FaGlobe className="text-emerald-600 w-8 h-8" />
              <h4 className="font-semibold">Global Distribution</h4>
              <p className="text-sm text-gray-600">
                Supply chain & logistics for bulk orders worldwide.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 p-6 bg-emerald-50 rounded-xl border">
              <FaAward className="text-emerald-600 w-8 h-8" />
              <h4 className="font-semibold">Certifications</h4>
              <p className="text-sm text-gray-600">
                GMP, ISO and organic certifications where available.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 p-6 bg-emerald-50 rounded-xl border">
              <FaUsers className="text-emerald-600 w-8 h-8" />
              <h4 className="font-semibold">Expert Team</h4>
              <p className="text-sm text-gray-600">
                Formulators, QA, and supply specialists with decades of experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRY VERTICALS / CATEGORIES */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Wellness Categories Served
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((c) => (
            <article key={c.title} className="relative rounded-xl overflow-hidden shadow-sm">
              <div className="w-full h-44 relative">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-semibold">{c.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  High-quality products & wholesale options.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Leadership Message
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader) => (
              <div key={leader.name} className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold">{leader.name}</h4>
                <p className="text-sm text-emerald-600">{leader.title}</p>
                <p className="mt-3 text-sm text-gray-600">{leader.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS / GALLERY */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Events & Engagements
        </h3>

        <div className="relative w-full max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentSlide * 100) / visibleSlides}%)`,
                width: `${eventImages.length * (100 / visibleSlides)}%`,
              }}
            >
              {eventImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `${100 / visibleSlides}%` }}
                >
                  <div className="relative h-80 mx-2 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Event ${index + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      onError={() => console.error(`Failed to load image: ${image}`)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                        <h4 className="font-semibold">Event {index + 1}</h4>
                        <p className="text-sm mt-1">Industry Conference 2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? totalSlides - 1 : prev - 1
              )
            }
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-emerald-50 transition-colors duration-200 z-10"
            aria-label="Previous event slide"
          >
            <FaChevronLeft className="text-emerald-600" />
          </button>

          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev >= totalSlides - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-emerald-50 transition-colors duration-200 z-10"
            aria-label="Next event slide"
          >
            <FaChevronRight className="text-emerald-600" />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-emerald-600 w-8" : "bg-gray-300"
                }`}
                aria-label={`Go to event slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

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
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  required
                  placeholder="Full name"
                  className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  aria-label="Full name"
                />
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="Email"
                  className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  aria-label="Email address"
                />
                <input
                  name="position"
                  placeholder="Position applying for"
                  className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  aria-label="Position applying for"
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  aria-label="Phone number"
                />
                <textarea
                  name="message"
                  placeholder="Short message"
                  className="p-3 border rounded md:col-span-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  rows={4}
                  aria-label="Short message"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-3 rounded-md md:col-span-2 hover:bg-emerald-700 transition-colors duration-200"
                  aria-label="Submit application"
                >
                  Apply Now
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-emerald-700 font-semibold">
                  Thanks — your application has been received.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PARTNERS / LOGOS */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Strategic Alliances & Certifications
          </h3>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              "/a1.webp",
              "/a2.webp",
              "/a3.webp",
              "/a4.webp",
              "/a5.webp",
              "/a6.webp",
              "/a7.webp",
            ].map((logo, idx) => (
              <div
                key={idx}
                className="w-32 h-16 flex items-center justify-center p-2"
              >
                <Image
                  src={logo}
                  alt={`Alliance logo ${idx + 1}`}
                  width={140}
                  height={60}
                  style={{ objectFit: "contain" }}
                  sizes="140px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}