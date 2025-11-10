// src/components/WhatsAppButton.tsx
"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "923111000605"; // No + or spaces
  const message = "Hello! I'm interested in your products. Can you help me?";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-xl hover:bg-green-600 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
      <span className ="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
    </motion.a>
  );
}