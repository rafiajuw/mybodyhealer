'use client';

import Image from "next/image";
import Link from 'next/link';
import { motion, useCycle } from 'framer-motion';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuVariants = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.4, staggerChildren: 0.1 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  const navItemVariants = { hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About Us', href: '/aboutus' },
    { name: 'Service', href: '/services' },
    { name: 'Blog', href: '/services/blogs' },
    { name: 'Contact Us', href: '/contactus' },
  ];

  return (
    <motion.nav
      className="fixed top-0 w-full bg-[#556B2F] shadow-md z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
          <Image
            src="/logo.png" // اپنی logo image یہاں لگائیں
            alt="Logo"
            width={64} // 16*4=64px
            height={64}
            className="object-contain"
          />
          <div className="flex flex-col">
            <Link href="/" className="text-white text-2xl font-bold tracking-wide">
              My Body Healer
            </Link>
            <span className="text-white text-sm font-light font-sans">
              just heal it, don&apos;t treat it
            </span>
          </div>
        </motion.div>

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
                  className="relative group"
                >
                  <Link
                    href={item.href}
                    className={`transition-colors ${
                      pathname === item.href
                        ? 'text-yellow-300 font-semibold'
                        : 'text-white hover:text-yellow-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all" />
                </motion.li>
              ))}
            </ul>
          )}
          <motion.div whileHover={{ scale: 1.1 }} className="ml-6 cursor-pointer text-white">
            <FiSearch size={22} />
          </motion.div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.button
              onClick={() => toggleOpen()}
              className="ml-4 text-white"
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
          className="overflow-hidden bg-[#556B2F] shadow-lg rounded-b-xl"
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={menuVariants}
        >
          <ul className="flex flex-col items-center space-y-6 p-6">
            {navItems.map((item) => (
              <motion.li key={item.name} variants={navItemVariants} whileHover={{ scale: 1.05 }}>
                <Link
                  href={item.href}
                  className={`text-lg transition-colors ${
                    pathname === item.href
                      ? 'text-yellow-300 font-semibold'
                      : 'text-white hover:text-yellow-300'
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
