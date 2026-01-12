"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

/* ================= SEARCH DATA ================= */

// Oncology
const oncologyProducts = [
  "Anastrozole",
  "Letrozole",
  "Bicalutamide",
  "Capecitabine",
  "Sunitinib",
  "Sorafenib",
  "Pazopanib",
].map((p) => ({
  name: p,
  href: `/shop/oncology/${p.toLowerCase()}`,
}));

// Food Supplements
const foodSupplements = [
  "Ibooster",
  "Bestman",
  "Femopause",
  "Fibromya",
  "Goutrol",
  "Prostatol",
  "Urinol",
  "Mormiks",
  "Zeredemiks",
  "Lifmo",
  "NK Defense",
  "GSH Complex",
  "Triozyme",
  "Origin Collagen",
].map((p) => ({
  name: p,
  href: `/shop/food-supplements/${p.toLowerCase().replace(/\s+/g, "-")}`,
}));

// Others
const structuredWater = [
  { name: "Uni-Vie Structured Water", href: "/shop/structured-water/uni-vie" },
];

const oils = [{ name: "Olive Oil", href: "/shop/oils/olive-oil" }];

const dermaProducts = [
  { name: "Preserv Derma", href: "/shop/derma/preserv-derma" },
];

const allProducts = [
  ...oncologyProducts,
  ...foodSupplements,
  ...structuredWater,
  ...oils,
  ...dermaProducts,
];

/* ================= COMPONENT ================= */

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);

  const filtered = allProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

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
      {/* NAVBAR */}
      <motion.nav
        className="fixed top-0 w-full bg-[#556B2F] z-50 shadow-xl"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" width={54} height={54} alt="My Body Healer" />
            <div className="leading-tight">
              <h1 className="text-white font-bold text-lg">
                My Body Healer
              </h1>
              <p className="text-xs italic text-emerald-100">
                just heal it, don’t treat it
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-8 text-white font-medium">

            <NavItem href="/">Home</NavItem>

            {/* SHOP */}
            <li
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <div className="bg-[#A3C585] text-[#2D3E1E] px-5 py-2 rounded-full cursor-pointer font-semibold">
                Shop Now ▾
              </div>

              <AnimatePresence>
                {shopOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-12 left-0 w-64 bg-[#2D3E1E] rounded-xl shadow-2xl overflow-hidden"
                  >
                    <LinkItem href="/shop/oncology-products" text="Oncology Medicines" />
                    <LinkItem href="/shop/food-supplements" text="Food Supplements" />
                    <LinkItem href="/shop/structured-water" text="Structured Water" />
                    <LinkItem href="/shop/oils" text="Oils" />
                    <LinkItem href="/shop/derma" text="Derma Products" />
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <NavItem href="/aboutus">About Us</NavItem>
            <NavItem href="/services">Services</NavItem>
            <NavItem href="/services/blogs">Blog</NavItem>
            <NavItem href="/contactus">Contact</NavItem>

            <button onClick={() => setSearchOpen(true)}>
              <FiSearch size={22} />
            </button>
          </ul>

          {/* MOBILE */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </motion.nav>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-[999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={searchRef}
              className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-600"
              />

              <div className="mt-4 max-h-60 overflow-y-auto">
                {filtered.length ? (
                  filtered.map((p) => (
                    <Link
                      key={p.name}
                      href={p.href}
                      onClick={() => setSearchOpen(false)}
                      className="block py-2 border-b hover:text-emerald-600"
                    >
                      {p.name}
                    </Link>
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-4">
                    No products found
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= REUSABLE ================= */

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-[#A3C585] transition">
      {children}
    </Link>
  );
}

function LinkItem({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link
        href={href}
        className="block px-5 py-3 text-white hover:bg-[#A3C585] hover:text-[#2D3E1E] transition font-medium"
      >
        {text}
      </Link>
    </li>
  );
}
