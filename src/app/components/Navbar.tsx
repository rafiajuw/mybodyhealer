"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

// temporary demo product data (you can replace with Sanity products later)
const allProducts = [
  { name: "Zerodaks", category: "Herbal Supplements", href: "/shop/herbal" },
  { name: "Sakara Mork", category: "Olive Oils & Edibles", href: "/shop/olive" },
  { name: "NK Defense", category: "Skincare & Topicals", href: "/shop/skincare" },
  { name: "Olive Gold", category: "Olive Oils & Edibles", href: "/shop/olive" },
  { name: "Herbal Plus", category: "Herbal Supplements", href: "/shop/herbal" },
];

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // responsive handler
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  // ESC close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/aboutus" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/services/blogs" },
    { name: "Contact", href: "/contactus" },
  ];

  const shopCategories = [
    { name: "Herbal Supplements", href: "/shop/herbal" },
    { name: "Olive Oils & Edibles", href: "/shop/olive" },
    { name: "Skincare & Topicals", href: "/shop/skincare" },
  ];

  const filteredProducts = allProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 w-full bg-[#556B2F] shadow-lg z-50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="My Body Healer Logo"
              width={55}
              height={55}
              className="rounded-full"
            />
            <div>
              <h1 className="text-white font-bold text-xl tracking-wide">
                My Body Healer
              </h1>
              <p className="text-white text-xs italic">just heal it, don’t treat it</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <ul className="flex space-x-8 items-center text-white">
              <li
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
                className="relative cursor-pointer"
              >
                <span className="hover:text-[#A3C585] font-medium transition-colors">
                  Shop ▾
                </span>

                {/* Dropdown */}
                <AnimatePresence>
                {shopOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-8 left-0 bg-white text-[#556B2F] rounded-xl shadow-xl py-3 w-56"
                  >
                    {shopCategories.map((cat) => (
                      <li key={cat.name}>
                        <Link
                          href={cat.href}
                          className="block px-5 py-2 text-sm hover:bg-[#A3C585]/20 hover:text-[#3E5A2F] transition"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
                </AnimatePresence>
              </li>

              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="relative group font-medium transition-all hover:text-[#A3C585]"
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#A3C585] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
              <button
                onClick={() => setSearchOpen(true)}
                className="text-white hover:text-[#A3C585] transition"
              >
                <FiSearch size={22} />
              </button>
            </ul>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <button
              className="text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          )}
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#556B2F] text-white flex flex-col items-center py-4 space-y-4"
            >
              <details className="w-full px-6">
                <summary className="cursor-pointer text-center text-lg font-medium">
                  Shop
                </summary>
                <ul className="mt-2 space-y-2">
                  {shopCategories.map((cat) => (
                    <li key={cat.name} className="text-center">
                      <Link href={cat.href} onClick={() => setMenuOpen(false)}>
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* 🔍 Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]"
          >
            <motion.div
              ref={searchRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-[#556B2F]"
                onClick={() => setSearchOpen(false)}
              >
                <FiX size={22} />
              </button>

              <h2 className="text-xl font-semibold text-[#556B2F] mb-4 text-center">
                Search Products
              </h2>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type product name..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#A3C585] outline-none text-black"
              />

              <div className="mt-4 max-h-60 overflow-y-auto">
                {query === "" ? (
                  <p className="text-gray-400 text-center">Start typing to search...</p>
                ) : filteredProducts.length === 0 ? (
                  <p className="text-gray-500 text-center">No products found.</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {filteredProducts.map((p) => (
                      <li key={p.name} className="py-2">
                        <Link
                          href={p.href}
                          className="block text-[#556B2F] hover:text-[#A3C585] font-medium"
                          onClick={() => setSearchOpen(false)}
                        >
                          {p.name}
                          <span className="block text-sm text-gray-500">{p.category}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
