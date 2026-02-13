import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import ContactForm from "./ContactForm";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#2D3E1E] to-[#1a2912] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold tracking-tight">My Body Healer</h3>
          <p className="mt-1 text-xs italic text-emerald-300/70">just heal it, don&apos;t treat it</p>
          <p className="mt-4 text-gray-300 leading-relaxed text-sm">
            Embark on a journey to holistic wellness with our natural, science-backed products crafted to support healthier lives.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a
              href="https://www.facebook.com/mybodyhealer"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 hover:bg-[#A3C585]/30 hover:scale-110 transition-all duration-300"
              aria-label="Facebook"
            >
              <FaFacebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/mybodyheal3r?igsh=OGc2amVyazducmt1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 hover:bg-[#A3C585]/30 hover:scale-110 transition-all duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/my-body-healer-30457332b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 hover:bg-[#A3C585]/30 hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#A3C585]">Quick Links</h4>
          <ul className="space-y-2.5">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/shop">Shop</FooterLink>
            <FooterLink href="/shop/food-supplements">Food Supplements</FooterLink>
            <FooterLink href="/aboutus">About Us</FooterLink>
            <FooterLink href="/contactus">Contact</FooterLink>
          </ul>
        </div>

        {/* Services & Help */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#A3C585]">Services & Help</h4>
          <ul className="space-y-2.5">
            <FooterLink href="/services">Our Services</FooterLink>
            <FooterLink href="/services/licenced">Out-Licensing Products</FooterLink>
            <FooterLink href="/services/contract">Contract Services</FooterLink>
            <FooterLink href="/services/blogs">Blog & Insights</FooterLink>
            <FooterLink href="/shipping-terms">Shipping Policy</FooterLink>
            <FooterLink href="/returns">Returns Policy</FooterLink>
          </ul>
        </div>

        {/* Contact Info & Form */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#A3C585]">Get in Touch</h4>
          <ContactForm />
          <div className="mt-6 space-y-3 text-gray-300 text-sm">
            <a href="mailto:support@mybodyhealer.com" className="flex items-center gap-2.5 hover:text-[#A3C585] transition group">
              <Mail className="w-4 h-4 text-[#A3C585]/60 group-hover:text-[#A3C585]" />
              support@mybodyhealer.com
            </a>
            <a href="tel:+923111000605" className="flex items-center gap-2.5 hover:text-[#A3C585] transition group">
              <Phone className="w-4 h-4 text-[#A3C585]/60 group-hover:text-[#A3C585]" />
              0311-1000605
            </a>
            <p className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#A3C585]/60" />
              Karachi, Pakistan
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} My Body Healer. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/shipping-terms" className="hover:text-[#A3C585] transition">
              Shipping
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/returns" className="hover:text-[#A3C585] transition">
              Returns
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/contactus" className="hover:text-[#A3C585] transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-300 hover:text-[#A3C585] transition-colors duration-200 text-sm flex items-center gap-1.5"
      >
        <span className="text-[#A3C585]/40 text-xs">&rsaquo;</span>
        {children}
      </Link>
    </li>
  );
}

export default Footer;
