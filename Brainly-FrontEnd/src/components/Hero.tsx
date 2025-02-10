import React from 'react';
import { Link } from 'react-router-dom';
import FeatureInputs from './HomeInput';

const Hero: React.FC = () => {
    return (
        <section className="text-center p-10 mt-5">
            <h1 className="text-3xl font-bold"><span className='text-blue-700'>Store, Organize,</span> and Retrieve Your Thoughts Efficiently.</h1>
            <p className="mt-4 text-gray-500">Your digital companion to capture, organize, and recall your ideas and memories.</p>
            

        <FeatureInputs />   
        </section>
        

        
    );
};

export default Hero;
