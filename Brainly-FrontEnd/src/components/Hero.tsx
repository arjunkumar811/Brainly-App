import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    return (
        <section className="text-center p-10 mt-5">
            <h1 className="text-3xl font-bold"><span className='text-blue-700'>Store, Organize,</span> and Retrieve Your Thoughts Efficiently.</h1>
            <p className="mt-4 text-gray-500">Your digital companion to capture, organize, and recall your ideas and memories.</p>
            
            <Link
      to="/signup"
      className="mt-6 inline-block border-2 border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
    >
      Get Started
    </Link>
        </section>

        
    );
};

export default Hero;
