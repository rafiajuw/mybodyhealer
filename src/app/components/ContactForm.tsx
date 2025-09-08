"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Try again!");
      }
    } catch (error) {
      setStatus("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary fixed bottom-4 right-4 px-4 py-2 bg-[#556B2F] text-white rounded-lg shadow-lg"
      >
        Contact Us
      </button>

      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-[#556B2F] mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 mb-2 border rounded text-black placeholder-gray-600"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 mb-2 border rounded text-black placeholder-gray-600"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-2 mb-2 border rounded h-24 text-black placeholder-gray-600"
              />
              <div className="flex justify-end space-x-4 mt-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#556B2F] text-white rounded-lg"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
            {status && <p className="mt-3 text-sm text-center text-black">{status}</p>}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ContactForm;
