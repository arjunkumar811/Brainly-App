import React from "react";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { Logo } from "../icons/Logo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo />
              <span className="text-2xl font-bold">Second Brain</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your digital companion to capture, organize, and recall your ideas and memories across all platforms.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#integrations" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#changelog" className="text-gray-400 hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Second Brain. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Made with ❤️ for productivity enthusiasts
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
