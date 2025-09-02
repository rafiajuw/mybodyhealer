'use client';

import Link from 'next/link';
import { motion, useCycle } from 'framer-motion';
import { FiSearch, FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useState, useEffect, useRef, useMemo } from 'react';

const Navbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showSearch, setShowSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0); // Example cart state
  const navItems = useMemo(() => ['Home', 'Shop', 'About', 'Service', 'Blog', 'Contact'], []);
  const navbarRef = useRef<HTMLDivElement>(null);

  // ✅ Resize check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Scroll check
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) =>
        document.getElementById(item.toLowerCase())
      );
      const current = sections.find(
        (section) =>
          section &&
          section.offsetTop - 100 <= window.scrollY &&
          section.offsetTop + section.offsetHeight > window.scrollY
      );
      if (current) setActiveSection(current.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]); // Dependency is now stable due to useMemo

  // ✅ Menu animation
  const menuVariants = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.35 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.25 } },
  };

  // Handle click outside to close search or menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setShowSearch(false);
        if (isMobile) toggleOpen(0); // Use 0 to explicitly close the menu
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, toggleOpen]);

  return (
    <motion.nav
      ref={navbarRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#556B2F]/90 shadow-lg' : 'bg-[#556B2F]/80'} backdrop-blur-md`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.h1
          className="text-2xl font-bold text-white tracking-wide"
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/">My Body Healer</Link>
        </motion.h1>

        {/* Desktop Menu */}
        {!isMobile && (
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <motion.li
                key={item}
                className="relative group"
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className={`text-base transition-colors ${
                    activeSection === item.toLowerCase()
                      ? 'text-white font-semibold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item}
                </Link>
                <motion.span
                  className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.li>
            ))}
          </ul>
        )}

        {/* Icons Section */}
        <div className="flex items-center space-x-5">
          {/* Search */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative group"
            onClick={() => setShowSearch((prev) => !prev)}
          >
            <FiSearch className="text-white cursor-pointer" size={20} />
            <motion.span
              className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Cart with Badge */}
          <motion.div whileHover={{ scale: 1.1 }} className="relative group">
            <FiShoppingCart className="text-white cursor-pointer" size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <motion.span
              className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* User Dropdown */}
          <motion.div whileHover={{ scale: 1.1 }} className="relative group">
            <FiUser className="text-white cursor-pointer" size={20} />
            <motion.span
              className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.button
              onClick={() => toggleOpen()}
              className="text-white"
              whileHover={{ scale: 1.1 }}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobile && (
        <motion.div
          className="overflow-hidden bg-[#556B2F]/90 backdrop-blur-md shadow-md"
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={menuVariants}
        >
          <ul className="flex flex-col items-center space-y-4 p-4">
            {navItems.map((item) => (
              <motion.li
                key={item}
                className="relative group"
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className={`text-base transition-colors ${
                    activeSection === item.toLowerCase()
                      ? 'text-white font-semibold'
                      : 'text-white/80 hover:text-white'
                  }`}
                  onClick={() => toggleOpen(0)}
                >
                  {item}
                </Link>
                <motion.span
                  className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Search Input Overlay */}
      {showSearch && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 right-4 w-72 bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-3"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
          />
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;