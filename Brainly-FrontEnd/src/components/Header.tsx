import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../icons/Logo';

interface HeaderProps {
    toggleTheme?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 via-blue-50/50 to-pink-50/50 -z-10"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="relative transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <Logo />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                                Second Brain
                            </span>
                            <span className="text-xs text-gray-500 font-medium tracking-wider">YOUR DIGITAL MEMORY</span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-2">
                        <Link to="/" className="px-4 py-2 text-gray-700 hover:text-purple-600 font-semibold transition-all duration-200 relative group">
                            Home
                            <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </Link>
                        
                        <Link to="/features" className="px-4 py-2 text-gray-700 hover:text-purple-600 font-semibold transition-all duration-200 relative group">
                            Features
                            <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </Link>
                        
                        <Link to="/dashboard" className="px-4 py-2 text-gray-700 hover:text-purple-600 font-semibold transition-all duration-200 relative group">
                            Dashboard
                            <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </Link>

                        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                            <Link
                                to="/signin"
                                className="px-5 py-2.5 text-gray-700 font-semibold hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
                            >
                                Sign In
                            </Link>
                            
                            <Link
                                to="/signup"
                                className="relative px-6 py-2.5 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white font-bold rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                        </div>
                    </nav>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100 animate-slideDown">
                        <nav className="flex flex-col gap-2">
                            <Link
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-semibold rounded-lg transition-all duration-200"
                            >
                                Home
                            </Link>
                            <Link
                                to="/features"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-semibold rounded-lg transition-all duration-200"
                            >
                                Features
                            </Link>
                            <Link
                                to="/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-semibold rounded-lg transition-all duration-200"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/signin"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-semibold rounded-lg transition-all duration-200"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg text-center hover:shadow-lg transition-all duration-200"
                            >
                                Get Started
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
