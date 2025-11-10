import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import ContactForm from "./ContactForm";

const Footer = () => {
  return (
    <footer className="bg-[#708238] text-white py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold">My Body Healer</h3>
          <p className="mt-4 text-gray-100 leading-relaxed">
            Embark on a journey to holistic wellness with our natural and effective products.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a
              href="#"
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/mybodyheal3r?igsh=OGc2amVyazducmt1"
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/my-body-healer-30457332b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Menu */}
        <div>
          <h4 className="font-semibold text-lg">Menu</h4>
          <ul className="mt-4 space-y-3">
            <li>
              <a href="/shop" className="flex items-center gap-2 text-gray-100 hover:text-white">
                 Shop
              </a>
            </li>
            <li>
              <a href="/aboutus" className="flex items-center gap-2 text-gray-100 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/contactus" className="flex items-center gap-2 text-gray-100 hover:text-white">
                 Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-semibold text-lg">Help</h4>
          <ul className="mt-4 space-y-3">
            <li>
              <a href="/shipping-terms" className="flex items-center gap-2 text-gray-100 hover:text-white">
                 Shipping
              </a>
            </li>
            <li>
              <a href="/returns" className="flex items-center gap-2 text-gray-100 hover:text-white">
                 Returns
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
          <ContactForm />
          <div className="mt-6 space-y-2 text-gray-100 text-sm">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@mybodyhealer.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> 0311-1000605
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Karachi, Pakistan
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center border-t border-white/30 mt-10 pt-6 text-gray-100 text-sm">
        <p>© 2025 My Body Healer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
