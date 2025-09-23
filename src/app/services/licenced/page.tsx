"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaShippingFast, 
  FaLeaf, 
  FaAward, 
  FaHeadset, 
  FaGlobe, 
  FaCheckCircle 
} from "react-icons/fa";

// Hero Images
const heroImages = ["/b1.avif", "/b3.avif", "/b4.avif", "/b5.avif", "/b6.avif"];

// Available Products Data
const availableProducts = [
  { product: "Bosutinib", category: "Oncology", reference: "Bosulif®", dosage: "Tablets", strength: "100 mg", ctd: "Available" },
  { product: "Dasatinib", category: "Oncology", reference: "Sprycel®", dosage: "Tablets", strength: "20 / 70 mg", ctd: "Available" },
  { product: "Letrozole", category: "Oncology", reference: "Femara®", dosage: "Tablets", strength: "2.5 mg", ctd: "Available" },
  { product: "Sorafenib", category: "Oncology", reference: "Nexavar®", dosage: "Tablets", strength: "200 mg", ctd: "Available" },
  { product: "Sunitinib", category: "Oncology", reference: "Sutent®", dosage: "Capsules", strength: "12.5/25/50/75 mg", ctd: "Available" },
];

// Pipeline Products Data
const pipelineProducts = [
  { product: "Lenvatinib", category: "Oncology", reference: "Lenvima®", dosage: "Capsules", strength: "4/10 mg", ctd: "Under development" },
  { product: "Rucaparib", category: "Oncology", reference: "Rubraca®", dosage: "Tablets", strength: "50/100/250 mg", ctd: "Under development" },
  { product: "Cabozantinib", category: "Oncology", reference: "Cabometyx®", dosage: "Tablets", strength: "20/40/60 mg", ctd: "Under development" },
];

// Testimonials
const testimonials = [
  { name: "Gareth Smith", text: "Excellent service and professional team!", role: "System Analyst" },
  { name: "Fatima Ali", text: "Great support and timely delivery.", role: "Marketing Manager" },
  { name: "Hassan Raza", text: "Very satisfied with the product quality.", role: "Interface Designer" },
];

export default function FinishedProductsPage() {
  const [current, setCurrent] = useState(0);
  const [testimonial, setTestimonial] = useState(0);

  // Hero Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image src={img} alt={`Hero ${index}`} fill className="object-cover" />
            {index === current && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white">
                <motion.h1
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-4xl md:text-6xl font-bold drop-shadow-lg"
                >
                  Out-Licensing of Finished Products
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="mt-4 text-lg md:text-xl"
                >
                  Home &gt; Finished Products
                </motion.p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Overview Section */}
      <section className="py-20 px-6 md:px-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">High-Quality Generics & Global Reach</h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          We specialize in delivering finished pharmaceutical products that meet international standards. 
          Our portfolio covers oncology, immuno-oncology, and rare diseases, ensuring innovative and 
          accessible treatments for patients worldwide.
        </p>
      </section>

      {/* Available Products */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <Image src="/licencing1.webp" alt="Available Products" width={600} height={400} className="rounded-2xl shadow-lg" />
          <div>
            <h2 className="text-3xl font-bold mb-4">Available Products</h2>
            <p className="text-gray-600 mb-6">
              We help you compete in the fastest growing therapeutic categories with high-quality generics.
            </p>
            <div className="overflow-x-auto shadow-lg rounded-lg">
              <table className="w-full border border-gray-200 text-left rounded-lg overflow-hidden">
                <thead className="bg-green-900 text-white">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Reference</th>
                    <th className="p-3">Dosage</th>
                    <th className="p-3">Strength</th>
                    <th className="p-3">CTD</th>
                  </tr>
                </thead>
                <tbody>
                  {availableProducts.map((row, i) => (
                    <tr key={i} className="odd:bg-white even:bg-gray-50 hover:bg-green-50 transition">
                      <td className="p-3">{row.product}</td>
                      <td className="p-3">{row.category}</td>
                      <td className="p-3">{row.reference}</td>
                      <td className="p-3">{row.dosage}</td>
                      <td className="p-3">{row.strength}</td>
                      <td className="p-3">{row.ctd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-xl shadow-lg bg-green-50">
            <FaAward className="text-4xl text-green-700 mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Quality Assured</h3>
            <p className="text-gray-600 text-sm">EU-GMP compliant facilities with strict quality checks.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-green-50">
            <FaGlobe className="text-4xl text-green-700 mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Global Presence</h3>
            <p className="text-gray-600 text-sm">Trusted by partners and clients across multiple continents.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-green-50">
            <FaLeaf className="text-4xl text-green-700 mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Sustainable</h3>
            <p className="text-gray-600 text-sm">Committed to eco-friendly practices in all processes.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-green-50">
            <FaHeadset className="text-4xl text-green-700 mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Dedicated Support</h3>
            <p className="text-gray-600 text-sm">Expert assistance for licensing and technical queries.</p>
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-4">Pipeline & Co-development</h2>
            <p className="text-gray-600 mb-6">
              We provide opportunities in oncology, immuno-oncology and rare diseases with world-class licensing and co-development.
            </p>
            <div className="overflow-x-auto shadow-lg rounded-lg">
              <table className="w-full border border-gray-200 text-left rounded-lg overflow-hidden">
                <thead className="bg-green-900 text-white">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Reference</th>
                    <th className="p-3">Dosage</th>
                    <th className="p-3">Strength</th>
                    <th className="p-3">CTD</th>
                  </tr>
                </thead>
                <tbody>
                  {pipelineProducts.map((row, i) => (
                    <tr key={i} className="odd:bg-white even:bg-gray-50 hover:bg-green-50 transition">
                      <td className="p-3">{row.product}</td>
                      <td className="p-3">{row.category}</td>
                      <td className="p-3">{row.reference}</td>
                      <td className="p-3">{row.dosage}</td>
                      <td className="p-3">{row.strength}</td>
                      <td className="p-3">{row.ctd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Image src="/licence2.webp" alt="Pipeline" width={600} height={400} className="rounded-2xl shadow-lg" />
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">Certifications & Approvals</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <FaCheckCircle className="text-4xl text-green-700 mb-4 mx-auto" />
            <h3 className="font-semibold">EU-GMP</h3>
            <p className="text-gray-600 text-sm">Certified for manufacturing and packaging of potent molecules.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <FaCheckCircle className="text-4xl text-green-700 mb-4 mx-auto" />
            <h3 className="font-semibold">SFDA & ANVISA</h3>
            <p className="text-gray-600 text-sm">Approved by Saudi and Brazilian regulatory authorities.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <FaCheckCircle className="text-4xl text-green-700 mb-4 mx-auto" />
            <h3 className="font-semibold">Turkish MOH</h3>
            <p className="text-gray-600 text-sm">Recognized compliance with Turkish Ministry of Health standards.</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 md:px-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-500 mb-6">Stay updated with our latest launches and offers.</p>
        <div className="flex justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg w-72 border focus:outline-none text-black"
          />
          <button className="bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Subscribe
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Clients Say</h2>
        <motion.div
          key={testimonial}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-lg max-w-2xl mx-auto"
        >
          <p className="text-gray-700 italic mb-4">&quot;{testimonials[testimonial].text}&quot;</p>
          <h4 className="font-bold">{testimonials[testimonial].name}</h4>
          <p className="text-sm text-gray-500">{testimonials[testimonial].role}</p>
        </motion.div>
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={prevSlide} className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400">◀</button>
          <button onClick={nextSlide} className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400">▶</button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h4 className="font-semibold mb-2">What therapeutic areas do you focus on?</h4>
            <p className="text-gray-600 text-sm">We primarily focus on oncology, immuno-oncology and rare diseases.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h4 className="font-semibold mb-2">Are your products internationally compliant?</h4>
            <p className="text-gray-600 text-sm">Yes, our facilities are EU-GMP compliant and approved by several international authorities.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h4 className="font-semibold mb-2">How can I partner with you?</h4>
            <p className="text-gray-600 text-sm">You can reach out via our contact form for licensing and co-development opportunities.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 md:px-20 bg-green-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Partner With Us Today</h2>
        <p className="mb-6 text-gray-200">
          Explore licensing and co-development opportunities to bring high-quality medicines to patients worldwide.
        </p>
        <button className="bg-white text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
          Contact Us
        </button>
      </section>

      {/* Features */}
      <section className="py-20 px-6 md:px-20 grid md:grid-cols-4 gap-8 text-center">
        {[
          { icon: <FaShippingFast />, title: "Free Shipping", color: "bg-blue-100 text-blue-600" },
          { icon: <FaLeaf />, title: "Always Fresh", color: "bg-green-100 text-green-600" },
          { icon: <FaAward />, title: "Superior Quality", color: "bg-yellow-100 text-yellow-600" },
          { icon: <FaHeadset />, title: "Support", color: "bg-purple-100 text-purple-600" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-16 h-16 flex items-center justify-center rounded-full ${item.color} mb-4 text-3xl`}>
              {item.icon}
            </div>
            <h3 className="font-semibold">{item.title}</h3>
          </div>
        ))}
      </section>
    </div>
  );
}
