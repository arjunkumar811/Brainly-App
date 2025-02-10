import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Navigation Links */}
        <ul className="flex space-x-6 text-sm md:text-base">
          <li>
            <a href="#privacy" className="hover:text-gray-400 transition">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:text-gray-400 transition">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-400 transition">
              Contact Us
            </a>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400 transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <Instagram size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
