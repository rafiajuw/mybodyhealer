// components/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

// === ONLY ONCOLOGY PRODUCTS FOR SEARCH ===
const allProducts = [
  // { name: "Ibooster", category: "Food Supplement", href: "/shop/food-supplement" },
  // { name: "Bestman", category: "Food Supplement", href: "/shop/food-supplement" },
  // { name: "Olive Oil", category: "Oil + Supplement", href: "/shop/olive-products" },
  // { name: "NK Defense", category: "Food Supplement", href: "/shop/food-supplement" },
  // { name: "Preserv Derma", category: "Derma Products", href: "/shop/derma-products" },

  // ONCOLOGY PRODUCTS (ACTIVE)
  { name: "Anastrozole", category: "Oncology", href: "/shop/products/anastrozole" },
  { name: "Letrozole", category: "Oncology", href: "/shop/products/letrozole" },
  { name: "Bicalutamide", category: "Oncology", href: "/shop/products/bicalutamide" },
  { name: "Capecitabine", category: "Oncology", href: "/shop/products/capecitabine" },
  { name: "Sunitinib", category: "Oncology", href: "/shop/products/sunitinib" },
  { name: "Sorafenib", category: "Oncology", href: "/shop/products/sorafenib" },
  { name: "Pazopanib", category: "Oncology", href: "/shop/products/pazopanib" },
];

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop Now", href: "/shop" },
    { name: "About Us", href: "/aboutus" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/services/blogs" },
    { name: "Contact", href: "/contactus" },
  ];

  // ONLY ONCOLOGY IN DROPDOWN
  const shopCategories = [
    // { name: "Food Supplements", href: "/shop" },
    // { name: "Oil & Supplements", href: "/shop" },
    // { name: "Derma Products", href: "/shop" },
    { name: "Oncology Products", href: "/shop/oncology-products" }, // Active
  ];

  const filteredProducts = allProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        className="fixed top-0 w-full bg-[#556B2F] shadow-lg z-50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="My Body Healer Logo"
              width={55}
              height={55}
              className="rounded-full"
            />
            <div>
              <h1 className="text-white font-bold text-xl">My Body Healer</h1>
              <p className="text-white text-xs italic">just heal it, don’t treat it</p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          {!isMobile && (
            <ul className="flex space-x-8 items-center text-white font-medium">
              {navItems.map((item) => {
                if (item.name === "Shop Now") {
                  return (
                    <li
                      key={item.name}
                      onMouseEnter={() => setShopOpen(true)}
                      onMouseLeave={() => setShopOpen(false)}
                      className="relative cursor-pointer"
                    >
                      <motion.div
                        className="bg-[#A3C585] text-[#2D3E1E] px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-[#8FBF6F] font-semibold transition-all"
                      >
                        Shop Now
                      </motion.div>

                      <AnimatePresence>
                        {shopOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-11 left-0 bg-white text-[#2D3E1E] rounded-xl shadow-2xl py-3 w-56 border border-gray-100"
                          >
                            {shopCategories.map((cat) => (
                              <li key={cat.name}>
                                <Link
                                  href={cat.href}
                                  className="block px-5 py-2 hover:bg-[#A3C585]/20 hover:text-[#4B602A] transition text-sm"
                                >
                                  {cat.name}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                return (
                  <li key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className="hover:text-[#A3C585] transition duration-200"
                    >
                      {item.name}
                    </Link>
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#A3C585] group-hover:w-full transition-all duration-300" />
                  </li>
                );
              })}

              {/* SEARCH ICON */}
              <button
                onClick={() => setSearchOpen(true)}
                className="text-white hover:text-[#A3C585] transition"
              >
                <FiSearch size={22} />
              </button>
            </ul>
          )}

          {/* MOBILE TOGGLE */}
          {isMobile && (
            <button
              className="text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          )}
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#556B2F] text-white flex flex-col items-center py-4 space-y-4"
            >
              {navItems.map((item) =>
                item.name === "Shop Now" ? (
                  <details key={item.name} className="w-full px-6">
                    <summary className="cursor-pointer text-center text-lg font-semibold">
                      Shop Now
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
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* SEARCH MODAL - ONLY ONCOLOGY */}
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
                Search Oncology Products
              </h2>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Anastrozole, Letrozole..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#A3C585] outline-none text-black"
                autoFocus
              />

              <div className="mt-4 max-h-60 overflow-y-auto">
                {query === "" ? (
                  <p className="text-gray-400 text-center">Start typing...</p>
                ) : filteredProducts.length === 0 ? (
                  <p className="text-gray-500 text-center">No oncology product found.</p>
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