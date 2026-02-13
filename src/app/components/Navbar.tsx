"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";

/* ================= SEARCH DATA ================= */

const foodSupplements = [
  { name: "Mormiks", slug: "mormiks" },
  { name: "Zerdemiks", slug: "zeredemiks" },
  { name: "Lifmo", slug: "lifmo" },
  { name: "Olive Oil", slug: "olive-oil" },
  { name: "NK Defence", slug: "nk-defense" },
].map((p) => ({
  name: p.name,
  href: `/shop/products/${p.slug}`,
}));

const allProducts = [...foodSupplements];

/* ================= COMPONENT ================= */

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [foodSuppsOpen, setFoodSuppsOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const filtered = allProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileShopOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Search modal outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery("");
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#2D3E1E]/95 backdrop-blur-md shadow-2xl"
            : "bg-[#2D3E1E] shadow-xl"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="My Body Healer"
              className="group-hover:scale-105 transition-transform duration-300"
            />
            <div className="leading-tight">
              <h1 className="text-white font-bold text-lg tracking-tight">
                My Body Healer
              </h1>
              <p className="text-[10px] italic text-emerald-200/80 tracking-wider">
                just heal it, don&apos;t treat it
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex items-center gap-1 text-white font-medium">
            <DesktopNavItem href="/" active={isActive("/")}>Home</DesktopNavItem>

            {/* SHOP DROPDOWN */}
            <li
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => { setShopOpen(false); setFoodSuppsOpen(false); }}
            >
              <Link
                href="/shop"
                className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                  pathname.startsWith("/shop")
                    ? "bg-[#A3C585] text-[#2D3E1E]"
                    : "bg-[#A3C585]/90 text-[#2D3E1E] hover:bg-[#A3C585]"
                }`}
              >
                Shop Now
                <FiChevronDown size={14} className={`transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`} />
              </Link>

              <AnimatePresence>
                {shopOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-[#2D3E1E] rounded-xl shadow-2xl overflow-visible border border-[#A3C585]/20"
                  >
                    {/* ALL PRODUCTS */}
                    <li>
                      <Link
                        href="/shop"
                        className="block px-5 py-3 text-white hover:bg-[#A3C585]/20 transition font-medium text-sm border-b border-white/10"
                      >
                        All Products
                      </Link>
                    </li>

                    {/* FOOD SUPPLEMENTS WITH SUBMENU */}
                    <li
                      className="relative"
                      onMouseEnter={() => setFoodSuppsOpen(true)}
                      onMouseLeave={() => setFoodSuppsOpen(false)}
                    >
                      <Link
                        href="/shop/food-supplements"
                        className="flex items-center justify-between px-5 py-3 text-white hover:bg-[#A3C585]/20 transition font-medium text-sm"
                      >
                        Food Supplements
                        <FiChevronRight size={14} />
                      </Link>

                      <AnimatePresence>
                        {foodSuppsOpen && (
                          <motion.div
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-full top-0 w-56 bg-[#3D4E2E] rounded-xl shadow-2xl overflow-hidden border-l-2 border-[#A3C585] ml-1"
                          >
                            <ul>
                              {foodSupplements.map((product) => (
                                <li key={product.name}>
                                  <Link
                                    href={product.href}
                                    className="block px-5 py-2.5 text-white text-sm hover:bg-[#A3C585]/20 transition border-b border-white/5 last:border-b-0"
                                  >
                                    {product.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <DesktopNavItem href="/aboutus" active={isActive("/aboutus")}>About Us</DesktopNavItem>

            {/* SERVICES DROPDOWN */}
            <li
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                  pathname.startsWith("/services")
                    ? "text-[#A3C585]"
                    : "hover:text-[#A3C585]"
                }`}
              >
                Services
                <FiChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </Link>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-[#2D3E1E] rounded-xl shadow-2xl border border-[#A3C585]/20"
                  >
                    <li>
                      <Link href="/services" className="block px-5 py-3 text-white hover:bg-[#A3C585]/20 transition text-sm font-medium border-b border-white/10">
                        All Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/licenced" className="block px-5 py-3 text-white hover:bg-[#A3C585]/20 transition text-sm">
                        Out-Licensing Products
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/contract" className="block px-5 py-3 text-white hover:bg-[#A3C585]/20 transition text-sm">
                        Contract Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/blogs" className="block px-5 py-3 text-white hover:bg-[#A3C585]/20 transition text-sm">
                        Blog & Insights
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <DesktopNavItem href="/services/blogs" active={isActive("/services/blogs")}>Blog</DesktopNavItem>
            <DesktopNavItem href="/contactus" active={isActive("/contactus")}>Contact</DesktopNavItem>

            {/* SEARCH BUTTON */}
            <button
              onClick={() => setSearchOpen(true)}
              className="ml-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Search products"
            >
              <FiSearch size={20} />
            </button>
          </ul>

          {/* MOBILE BUTTONS */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition"
              aria-label="Search products"
            >
              <FiSearch size={22} />
            </button>
            <button
              className="text-white p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-[#2D3E1E] border-t border-white/10 overflow-hidden"
            >
              <div className="max-h-[calc(100vh-72px)] overflow-y-auto px-4 py-4 space-y-1">
                <MobileNavItem href="/" active={isActive("/")} onClick={() => setMenuOpen(false)}>
                  Home
                </MobileNavItem>

                {/* MOBILE SHOP ACCORDION */}
                <div>
                  <button
                    onClick={() => setMobileShopOpen(!mobileShopOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-white font-medium transition ${
                      pathname.startsWith("/shop") ? "bg-[#A3C585]/20 text-[#A3C585]" : "hover:bg-white/5"
                    }`}
                  >
                    Shop
                    <FiChevronDown size={16} className={`transition-transform duration-200 ${mobileShopOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileShopOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-1 space-y-1">
                          <MobileSubItem href="/shop" onClick={() => setMenuOpen(false)}>All Products</MobileSubItem>
                          <MobileSubItem href="/shop/food-supplements" onClick={() => setMenuOpen(false)}>Food Supplements</MobileSubItem>
                          {foodSupplements.map((p) => (
                            <MobileSubItem key={p.name} href={p.href} onClick={() => setMenuOpen(false)} indent>
                              {p.name}
                            </MobileSubItem>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <MobileNavItem href="/aboutus" active={isActive("/aboutus")} onClick={() => setMenuOpen(false)}>
                  About Us
                </MobileNavItem>

                {/* MOBILE SERVICES ACCORDION */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-white font-medium transition ${
                      pathname.startsWith("/services") ? "bg-[#A3C585]/20 text-[#A3C585]" : "hover:bg-white/5"
                    }`}
                  >
                    Services
                    <FiChevronDown size={16} className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-1 space-y-1">
                          <MobileSubItem href="/services" onClick={() => setMenuOpen(false)}>All Services</MobileSubItem>
                          <MobileSubItem href="/services/licenced" onClick={() => setMenuOpen(false)}>Out-Licensing Products</MobileSubItem>
                          <MobileSubItem href="/services/contract" onClick={() => setMenuOpen(false)}>Contract Services</MobileSubItem>
                          <MobileSubItem href="/services/blogs" onClick={() => setMenuOpen(false)}>Blog & Insights</MobileSubItem>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <MobileNavItem href="/services/blogs" active={isActive("/services/blogs")} onClick={() => setMenuOpen(false)}>
                  Blog
                </MobileNavItem>
                <MobileNavItem href="/contactus" active={isActive("/contactus")} onClick={() => setMenuOpen(false)}>
                  Contact Us
                </MobileNavItem>

                {/* MOBILE CTA */}
                <div className="pt-3 border-t border-white/10">
                  <Link
                    href="/shop"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center px-4 py-3 bg-[#A3C585] text-[#2D3E1E] rounded-xl font-semibold hover:bg-[#8FB870] transition"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-start justify-center pt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={searchRef}
              className="bg-white w-full max-w-lg mx-4 p-6 rounded-2xl shadow-2xl"
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-gray-800 transition"
                />
              </div>

              <div className="mt-3 max-h-64 overflow-y-auto">
                {query.length > 0 ? (
                  filtered.length ? (
                    filtered.map((p) => (
                      <Link
                        key={p.name}
                        href={p.href}
                        onClick={() => { setSearchOpen(false); setQuery(""); }}
                        className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-emerald-50 transition group"
                      >
                        <FiSearch size={14} className="text-gray-400 group-hover:text-emerald-600" />
                        <span className="text-gray-700 group-hover:text-emerald-700 font-medium">{p.name}</span>
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 py-6">
                      No products found for &quot;{query}&quot;
                    </p>
                  )
                ) : (
                  <div className="py-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 px-3">Popular Products</p>
                    {foodSupplements.slice(0, 3).map((p) => (
                      <Link
                        key={p.name}
                        href={p.href}
                        onClick={() => { setSearchOpen(false); setQuery(""); }}
                        className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-emerald-50 transition group"
                      >
                        <span className="text-gray-600 group-hover:text-emerald-700 text-sm">{p.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function DesktopNavItem({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          active ? "text-[#A3C585]" : "hover:text-[#A3C585]"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}

function MobileNavItem({ href, children, active, onClick }: { href: string; children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-3 rounded-xl text-white font-medium transition ${
        active ? "bg-[#A3C585]/20 text-[#A3C585]" : "hover:bg-white/5"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileSubItem({ href, children, onClick, indent }: { href: string; children: React.ReactNode; onClick: () => void; indent?: boolean }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-2.5 rounded-lg text-white/80 text-sm hover:bg-white/5 hover:text-white transition ${
        indent ? "pl-8 text-white/60" : ""
      }`}
    >
      {children}
    </Link>
  );
}
