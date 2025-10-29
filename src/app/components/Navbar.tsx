// components/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

// ONCOLOGY SEARCH LIST
const oncologyProducts = [
  { name: "Anastrozole", href: "/shop/products/anastrozole" },
  { name: "Letrozole", href: "/shop/products/letrozole" },
  { name: "Bicalutamide", href: "/shop/products/bicalutamide" },
  { name: "Capecitabine", href: "/shop/products/capecitabine" },
  { name: "Sunitinib", href: "/shop/products/sunitinib" },
  { name: "Sorafenib", href: "/shop/products/sorafenib" },
  { name: "Pazopanib", href: "/shop/products/pazopanib" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const filtered = oncologyProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  // close search when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full bg-[#556B2F] shadow-lg z-50 backdrop-blur-sm"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" width={55} height={55} alt="Logo" className="rounded-full" />
            <div>
              <h1 className="text-white text-xl font-bold">My Body Healer</h1>
              <p className="text-white text-xs italic opacity-90">just heal it, don’t treat it</p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center space-x-8 text-white font-medium">
            <NavItem href="/">Home</NavItem>

            {/* SHOP NOW */}
            <li
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <div className="px-4 py-2 rounded-full bg-[#A3C585] text-[#2D3E1E] cursor-pointer font-semibold shadow-sm hover:bg-[#8BB46F] transition">
                Shop Now ▾
              </div>

              <AnimatePresence>
                {shopOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-12 bg-white text-[#2D3E1E] rounded-xl shadow-xl border border-gray-100 w-56"
                  >
                    <LinkItem href="/shop/oncology-products" text="Oncology Products" />
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <NavItem href="/aboutus">About Us</NavItem>
            <NavItem href="/services">Services</NavItem>
            <NavItem href="/services/blogs">Blog</NavItem>
            <NavItem href="/contactus">Contact</NavItem>

            {/* SEARCH ICON */}
            <button onClick={() => setSearchOpen(true)} className="hover:text-[#A3C585]">
              <FiSearch size={22} />
            </button>
          </ul>

          {/* MOBILE MENU TOGGLE */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#556B2F] text-white flex flex-col space-y-4 px-6 py-4"
            >
              <MobileLink href="/" setMenuOpen={setMenuOpen}>Home</MobileLink>
              <MobileLink href="/shop/oncology-products" setMenuOpen={setMenuOpen}>
                Oncology Products
              </MobileLink>
              <MobileLink href="/aboutus" setMenuOpen={setMenuOpen}>About Us</MobileLink>
              <MobileLink href="/services" setMenuOpen={setMenuOpen}>Services</MobileLink>
              <MobileLink href="/services/blogs" setMenuOpen={setMenuOpen}>Blog</MobileLink>
              <MobileLink href="/contactus" setMenuOpen={setMenuOpen}>Contact</MobileLink>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={searchRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white max-w-md w-full px-8 py-6 rounded-2xl shadow-2xl relative"
            >
              <button onClick={() => setSearchOpen(false)} className="absolute top-4 right-4">
                <FiX size={22} className="text-gray-600 hover:text-[#556B2F]" />
              </button>

              <h2 className="text-lg font-semibold text-[#556B2F] text-center mb-4">Search Oncology Products</h2>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#A3C585] outline-none"
              />

              <div className="mt-4 max-h-60 overflow-y-auto">
                {filtered.length ? (
                  filtered.map((p) => (
                    <Link
                      key={p.name}
                      href={p.href}
                      onClick={() => setSearchOpen(false)}
                      className="block py-2 border-b text-[#556B2F] hover:text-[#A3C585]"
                    >
                      {p.name}
                    </Link>
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-4">No matches found</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Reusable Components
function NavItem({ href, children }: any) {
  return (
    <li className="group relative">
      <Link href={href} className="hover:text-[#A3C585] transition">
        {children}
      </Link>
      <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-[#A3C585] transition-all duration-300" />
    </li>
  );
}

function LinkItem({ href, text }: any) {
  return (
    <li>
      <Link href={href} className="block px-5 py-2 hover:bg-[#A3C585]/20">
        {text}
      </Link>
    </li>
  );
}

function MobileLink({ href, children, setMenuOpen }: any) {
  return (
    <Link href={href} onClick={() => setMenuOpen(false)} className="text-lg">
      {children}
    </Link>
  );
}
