'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Hero = () => {
  // ✅ Images list
  const images = [
    '/b6.avif',
    '/b5.avif',
    '/b4.avif',
    '/b3.avif',
    '/b2.avif',
    '/b1.avif',
    '/olive2.avif',
    '/olive.avif',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Auto change every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="min-h-[70vh] relative flex items-center justify-center text-center overflow-hidden">
      {/* ✅ Background Slideshow */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
            initial={{ opacity: 0, scale: 1, filter: 'blur(0px)' }}
            animate={
              index === currentIndex
                ? { opacity: 1, scale: 1.05, filter: 'blur(0px)' } // current image
                : { opacity: 0, scale: 1.2, filter: 'blur(6px)' } // outgoing image
            }
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        ))}

        {/* ✅ Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* ✅ Content */}
      <div className="relative z-10 max-w-2xl px-6">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        >
          Technology & Professionals
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md max-w-xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        >
          My Body Healer modern facility is ISO 9001 certified, delivering natural science-backed wellness solutions.
        </motion.p>

        <Link href="/shop">
          <motion.button
            className="bg-[#A3C585] text-[#2D3E1E] px-8 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#8FB870] shadow-lg transition duration-300 font-semibold mx-auto"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Now
            <FiArrowRight size={18} />
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
