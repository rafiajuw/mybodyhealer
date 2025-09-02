'use client';

import Link from 'next/link';
import { motion, useCycle } from 'framer-motion';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // ✅ Resize check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.4, staggerChildren: 0.1 },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '#shop' },
    { name: 'About', href: '#about' },
    { name: 'Service', href: '#service' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      className="fixed top-0 w-full backdrop-blur-md bg-white/70 shadow-md z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.h1
          className="text-2xl font-bold text-primary tracking-wide"
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/">My Body Healer</Link>
        </motion.h1>

        {/* Desktop Menu + Search */}
        <div className="flex items-center">
          {!isMobile && (
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`transition-colors ${
                      pathname === item.href
                        ? 'text-accent font-semibold'
                        : 'text-primary hover:text-accent'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {/* underline hover effect */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-accent transition-all group-hover:w-full" />
                </motion.li>
              ))}
            </ul>
          )}
          <motion.div whileHover={{ scale: 1.1 }} className="ml-6 cursor-pointer">
            <FiSearch className="text-primary" size={22} />
          </motion.div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.button
              onClick={() => toggleOpen()}
              className="ml-4 text-primary"
              whileHover={{ scale: 1.1 }}
            >
              {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </motion.button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobile && (
        <motion.div
          className="overflow-hidden bg-white shadow-lg rounded-b-xl"
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={menuVariants}
        >
          <ul className="flex flex-col items-center space-y-6 p-6">
            {navItems.map((item) => (
              <motion.li
                key={item.name}
                variants={navItemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={item.href}
                  className={`text-lg transition-colors ${
                    pathname === item.href
                      ? 'text-accent font-semibold'
                      : 'text-primary hover:text-accent'
                  }`}
                  onClick={() => toggleOpen()}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
