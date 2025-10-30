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
  const images: string[] = ["/b1.avif", "/b3.avif", "/b6.avif", "/b4.avif", "/b5.avif"];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // 🔹 Slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  // 🔹 Form Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    formData.append("type", "contact");

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      console.log("Server response:", data);

      if (data.success) {
        setStatus("✅ Message sent successfully!");
        e.currentTarget.reset();
        setTimeout(() => setStatus(null), 4000);
      } else {
        setStatus(data.message || "⚠️ Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 🔹 HERO SECTION */}
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
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Get in touch with My Body Healer for supplements, olive oil, and
            pharmaceutical supplies.
          </p>
        </div>
      </div>

      {/* 🔹 MAIN CONTENT */}
      <div className="flex-1 bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* 🔹 CONTACT FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-4"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Send Us a Message
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4b7a2f] focus:border-[#4b7a2f] text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4b7a2f] focus:border-[#4b7a2f] text-black"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4b7a2f] focus:border-[#4b7a2f] text-black"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4b7a2f] focus:border-[#4b7a2f] text-black"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4b7a2f] text-white py-3 rounded-lg font-semibold hover:bg-[#6fa84b] transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <p
                className={`text-center mt-2 font-medium transition-all duration-500 ${
                  status.includes("✅")
                    ? "text-green-600 animate-pulse"
                    : "text-red-600"
                }`}
              >
                {status}
              </p>
            )}
          </form>

          {/* 🔹 CONTACT INFO + MAP */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Our Contact Information
            </h2>
            <ul className="space-y-4 text-gray-700 mb-6">
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-[#4b7a2f]" />
                <span>
                  Plot No. C-10/2, Shahrah-e-Faisal, Karachi, Sindh, Pakistan
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-[#4b7a2f]" />
                <span>+92 </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-[#4b7a2f]" />
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
              <a href="#" className="hover:text-[#4b7a2f]">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-[#4b7a2f]">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/my-body-healer-30457332b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-[#4b7a2f]">
                <FaLinkedin size={20} />
              </a>
              <a href="https://www.instagram.com/mybodyheal3r?igsh=OGc2amVyazducmt1" className="hover:text-[#4b7a2f]">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
