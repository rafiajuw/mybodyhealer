"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaShippingFast,
  FaLeaf,
  FaAward,
  FaHeadset,
} from "react-icons/fa";

// Hero Images (slider)
const heroImages = [
  "/b1.avif",
  "/b3.avif",
  "/b4.avif",
  "/b5.avif",
];

export default function ContractServicesPage() {
  const [current, setCurrent] = useState(0);

  // Hero auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img}
              alt={`Contract Services Hero ${index}`}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
              <motion.h1
                key={current}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-6xl font-bold drop-shadow-lg"
              >
                Out-Licensing of Contract Services
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-4 text-lg md:text-xl"
              >
                Home &gt; Contract Services
              </motion.p>
            </div>
          </div>
        ))}
      </div>

      {/* Contract Manufacturing Section */}
      <section className="py-20 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="/manufacturing.webp"
            alt="Contract Manufacturing"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Contract Manufacturing
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Body Healer provides flexible solutions in contract manufacturing
            and development, keeping Customers’ needs at the centre of plans and
            decisions.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Handling of potent molecules, competitive pricing, wide range of
            batch sizes, and low MOQ’s. Body Healer’s facility in Malta is
            EU-GMP compliant and licensed for the manufacturing, packaging, and
            testing of highly potent oral solids (tablets and hard capsules)
            including Investigational Medicinal Products (IMPs).
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            In addition to its EU-GMP license, Pharmaccare Premium’s facility is
            approved by the Turkish Ministry of Health, Brazilian Authorities
            (ANVISA), and the Saudi Authorities (SFDA).
          </p>
        </div>
      </section>

      {/* Contract Manufacturing Services List */}
      <section className="py-16 px-6 md:px-20 bg-gray-50 grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            Pharmacare Premium Offers Contract Manufacturing Services
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Project management throughout the lifecycle of the project</li>
            <li>
              Manufacturing flexibility for low volume high value products
            </li>
            <li>Fully equipped pilot production line with wide batch sizes</li>
            <li>MOQ’s as low as 10 packs</li>
            <li>In-house stability testing for all climatic zones</li>
            <li>Primary packaging in Cold-formed & Thermo-formed blisters</li>
            <li>Highly flexible secondary packaging (serialization, 2D, etc.)</li>
            <li>
              Analytical method: transfer, development, validation
            </li>
            <li>
              Full chemical and microbial testing and release of raw materials &
              finished products
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            Contract Development
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            As a commercially-minded and scientifically-led partner for medicines
            development with a proven track record in formulation and analytical
            development, Pharmaccare Premium offers a one-stop shop solution.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Project management throughout the lifecycle of the project</li>
            <li>Formulation development, including optimization</li>
            <li>Scale-up of manufacturing processes</li>
            <li>In-house stability testing for all climatic zones</li>
            <li>Regulatory support, dossier compilation & handling variations</li>
          </ul>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Get e-mail updates about our latest shops and special offers
        </p>
        <div className="flex justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg border w-72"
          />
          <button className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition">
            Subscribe
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-4 text-center gap-8 bg-gray-100">
        <div>
          <h3 className="text-3xl font-bold text-green-700">10,000</h3>
          <p className="text-gray-600">Happy Customers</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-green-700">100</h3>
          <p className="text-gray-600">Branches</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-green-700">1,000</h3>
          <p className="text-gray-600">Partners</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-green-700">100</h3>
          <p className="text-gray-600">Awards</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-4 gap-8 text-center">
        <div className="flex flex-col items-center">
          <FaShippingFast className="text-4xl text-green-700 mb-4" />
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
