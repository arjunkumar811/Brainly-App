import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';

import Footer from './Footer';
import { Features } from './Features';

const Homepage: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
            <Header toggleTheme={toggleTheme} />
            <Hero />
            <Features />
            <Footer />
        </div>
    );
};

export default Homepage;

