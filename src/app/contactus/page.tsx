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
import { motion } from "framer-motion";

export default function ContactPage() {
  const images: string[] = ["/b1.avif", "/b3.avif", "/b6.avif", "/b4.avif", "/b5.avif"];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Slideshow Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Form Submit — 100% Safe & Fixed
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.currentTarget; // Safe reference
    const formData = new FormData(form);
    formData.append("type", "contact");

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        body: formData,
      });

      // Handle server errors
      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Server error" }));
        throw new Error(error.message || "Failed to connect to server");
      }

      const data = await res.json();

      if (data.success) {
        setStatus("Your message has been sent successfully!");
        form.reset(); // Safe reset
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus(data.message || "Failed to send. Please try again.");
      }
    } catch (err: any) {
      console.error("Contact form error:", err);
      setStatus(err.message || "Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* HERO SECTION WITH SLIDESHOW */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-center overflow-hidden">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${img})`,
              filter: "brightness(0.7)",
            }}
          />
        ))}
        <div className="relative z-10 px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-xl"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-100"
          >
            Get in touch with My Body Healer for supplements, olive oil, and
            pharmaceutical supplies.
          </motion.p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="flex-1 py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* CONTACT FORM */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                required
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4b7a2f] focus:border-[#4b7a2f] transition text-black placeholder-gray-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                required
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4b7a2f] focus:border-[#4b7a2f] transition text-black placeholder-gray-500"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject *"
                required
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4b7a2f] focus:border-[#4b7a2f] transition text-black placeholder-gray-500"
              />
              <textarea
                name="message"
                placeholder="Your Message *"
                rows={5}
                required
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4b7a2f] focus:border-[#4b7a2f] transition text-black placeholder-gray-500 resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4b7a2f] hover:bg-[#3d6325] text-white py-4 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>

            {/* Status Message */}
            {status && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-5 text-center font-medium text-lg p-3 rounded-lg ${
                  status.includes("successfully")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {status}
              </motion.p>
            )}
          </motion.div>

          {/* CONTACT INFO + MAP */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Our Contact Information
            </h2>

            <ul className="space-y-5 text-gray-700 mb-8">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#4b7a2f] mt-1" size={20} />
                <div>
                  <strong>Address:</strong>
                  <p className="mt-1">
                    Plot No. C-10/2, Shahrah-e-Faisal,<br />
                    Karachi, Sindh, Pakistan
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-[#4b7a2f]" size={20} />
                <a href="tel:+923001234567" className="hover:text-[#4b7a2f] transition">
                  +92 311-1000605
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#4b7a2f]" size={20} />
                <a href="mailto:info@mybodyhealer.com" className="hover:text-[#4b7a2f] transition break-all">
                  info@mybodyhealer.com
                </a>
              </li>
            </ul>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.234!2d67.034!3d24.860!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e70b7b8b8b7%3A0x7g7g7g7g7g7g7g7g!2sPlot%20No.%20C-10%2F2%2C%20Shahrah-e-Faisal%2C%20Karachi!5e0!3m2!1sen!2s!4v1698765432101!5m2!1sen!2s"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="My Body Healer Location"
              />
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 text-gray-600">
              <a href="#" className="hover:text-[#4b7a2f] transition transform hover:scale-110">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-[#4b7a2f] transition transform hover:scale-110">
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/my-body-healer-30457332b"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4b7a2f] transition transform hover:scale-110"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com/mybodyheal3r"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4b7a2f] transition transform hover:scale-110"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}