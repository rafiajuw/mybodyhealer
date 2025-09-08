"use client";

import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

export default function ContactPage() {
  const images: string[] = [
    "/b1.avif",
    "/b3.avif",
    "/b6.avif",
    "/b4.avif",
    "/b5.avif",
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Auto slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with slideshow */}
      <div className="relative h-[50vh] flex items-center justify-center text-center overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 scale-105" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              transition: "opacity 2s ease-in-out, transform 8s ease-in-out",
            }}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Get in touch with My Body Healer for supplements, olive oil, and
            pharmaceutical supplies.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Send Us a Message
            </h2>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 text-black"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 text-black"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 text-black"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 text-black"
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Info + Map */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Our Contact Information
            </h2>
            <ul className="space-y-4 text-gray-700 mb-6">
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-emerald-600" />
                <span>
                  Plot No. C-10/2, Shahrah-e-Faisal, Karachi, Sindh, Pakistan
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-emerald-600" />
                <span>+92 21 12345678</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-emerald-600" />
                <span>info@mybodyhealer.com</span>
              </li>
            </ul>

            <div className="rounded-xl overflow-hidden shadow-md mb-6">
              <iframe
                src="https://www.google.com/maps?q=Plot%20No.%20C-10%2F2%2C%20Shahrah-e-Faisal%2C%20Karachi%2C%20Sindh%2C%20Pakistan&output=embed"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="flex space-x-4 text-gray-600">
              <a href="#" className="hover:text-emerald-600">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-emerald-600">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-emerald-600">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="hover:text-emerald-600">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
