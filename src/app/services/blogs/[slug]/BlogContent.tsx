// src/app/services/blogs/[slug]/BlogContent.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  reading: string;
  image: string;
}

interface BlogContentProps {
  post: BlogPost;
}

const MedicalContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleOpen = () => {
    setIsOpen(true);
    setStatus("");
  };

  const handleClose = () => {
    setIsOpen(false);
    setStatus("");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("type", "medical");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);

      console.log("Sending medical form data:", {
        type: "medical",
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
      });

      const response = await fetch("/api/form", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok && result.success) {
        setStatus("✅ Message sent successfully to medical team!");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => handleClose(), 3000);
      } else {
        setStatus(`❌ ${result.message || "Failed to send message. Please try again."}`);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("❌ Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="inline-flex items-center px-6 py-3 border border-[#4b7a2f] text-[#4b7a2f] hover:bg-[#4b7a2f] hover:text-white rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label="Contact Medical Team"
      >
        🩺 Contact Medical Team
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#4b7a2f]/10 rounded-full">
                  <svg className="w-6 h-6 text-[#4b7a2f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Medical Team Contact</h3>
                  <p className="text-sm text-gray-500">Get expert health advice</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="type" value="medical" />
              <div>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b7a2f] focus:border-transparent transition-all"
                  disabled={sending}
                />
              </div>
              <div>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b7a2f] focus:border-transparent transition-all"
                  disabled={sending}
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b7a2f] focus:border-transparent transition-all"
                  disabled={sending}
                />
              </div>
              <div>
                <input
                  required
                  type="text"
                  name="subject"
                  placeholder="Subject * (e.g., Nutrition Advice, Supplement Guidance)"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b7a2f] focus:border-transparent transition-all"
                  disabled={sending}
                />
              </div>
              <div>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Your Message / Medical Inquiry *&#10;Please describe your health concern or question..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b7a2f] focus:border-transparent resize-none transition-all"
                  disabled={sending}
                />
              </div>
              <button
                type="submit"
                disabled={sending || !formData.name || !formData.email || !formData.subject || !formData.message}
                className="w-full bg-[#4b7a2f] text-white py-3 rounded-lg font-semibold hover:bg-[#6fa84b] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200"
              >
                {sending ? (
                  <>
                    <svg className="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message to Medical Team"
                )}
              </button>
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-center font-medium border ${
                    status.includes("✅") ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300"
                  }`}
                >
                  {status}
                </motion.div>
              )}
            </form>
            <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>Our medical team will respond within 24-48 hours</p>
              <p className="text-xs mt-1">All inquiries are confidential & secure</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default function BlogContent({ post }: BlogContentProps) {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4b7a2f]/80 via-[#4b7a2f]/50 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg"
          >
            {post.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 max-w-2xl text-gray-100 text-lg sm:text-xl"
          >
            {post.excerpt}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-sm text-gray-200"
          >
            {post.date} • {post.reading} read
          </motion.div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-16 px-4 sm:px-6">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200"
        >
          <div className="text-sm text-gray-500 mb-4">
            {post.date} • {post.reading} read
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="leading-relaxed mb-8">
              At <strong className="text-[#4b7a2f]">My Body Healer</strong>, we believe in the synergy between
              science and nature. Our supplements are carefully formulated using
              high-quality natural ingredients.
            </p>
            <h2 className="mt-12 text-2xl font-semibold text-[#4b7a2f] mb-6">Key Highlights</h2>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li>Research-driven products with clinically-tested ingredients.</li>
              <li>Trusted formulations for long-term wellness and recovery.</li>
              <li>Pure olive-based nutrition for enhanced vitality.</li>
            </ul>
            <blockquote className="border-l-4 border-[#4b7a2f] pl-6 italic text-gray-600 mt-8 bg-gray-50 p-6 rounded-r-lg">
              &quot;Your body&apos;s natural ability to heal itself is the greatest medicine. 
              Nourish it, protect it, and let it thrive.&quot;
            </blockquote>
          </div>
        </motion.article>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/services/blogs" className="w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4b7a2f] hover:bg-[#6fa84b] text-white font-semibold rounded-full shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </motion.div>
          </Link>
          <MedicalContactForm />
        </motion.div>
      </section>
    </main>
  );
}