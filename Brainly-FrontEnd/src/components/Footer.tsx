import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="text-center p-5 bg-gray-500">
            <ul className="flex justify-center space-x-4">
                <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:underline">Terms of Service</a></li>
                <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            </ul>
            <div className="social-media mt-4">
                <a href="#" className="mx-2">Facebook</a>
                <a href="#" className="mx-2">Twitter</a>
                <a href="#" className="mx-2">Instagram</a>
            </div>
        </footer>
    );
};

export default Footer;
