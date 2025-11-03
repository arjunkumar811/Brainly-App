import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../icons/Logo';

interface HeaderProps {
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                            <Logo />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Second Brain
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center">
                        <ul className="flex items-center space-x-8">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200 relative group">
                                    Home
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/features" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200 relative group">
                                    Features
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200 relative group">
                                    Pricing
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200 relative group">
                                    About
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/signup"
                                    className="ml-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transform transition-all duration-300"
                                >
                                    Get Started
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
