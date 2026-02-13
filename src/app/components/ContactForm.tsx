"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const data = new FormData();
    data.append("type", "contact");
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => { setStatus(""); setIsOpen(false); }, 3000);
      } else {
        setStatus("Failed to send message. Try again!");
      }
    } catch {
      setStatus("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-2.5 bg-[#A3C585] text-[#2D3E1E] rounded-lg font-medium hover:bg-[#8FB870] transition-all duration-300 text-sm"
      >
        Send a Message
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md relative"
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>

              <h2 className="text-xl font-bold text-[#2D3E1E] mb-4">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full p-3 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none"
                />
                <div className="flex justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2.5 text-gray-500 hover:text-gray-700 font-medium rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-[#2D3E1E] text-white rounded-xl font-medium hover:bg-[#A3C585] hover:text-[#2D3E1E] transition-all disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
              {status && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-3 text-sm text-center p-2 rounded-lg ${
                    status.includes("successfully")
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {status}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactForm;
