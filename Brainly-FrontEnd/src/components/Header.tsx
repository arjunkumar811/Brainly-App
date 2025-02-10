import React from 'react';
import { Link } from 'react-router-dom';
import { GoBackButton } from './../icons/GoBackButton';
import { Logo } from '../icons/Logo';

interface HeaderProps {
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
    return (
      
        <div className="flex justify-between p-5 justify-center items-center">
            <div className="logo text-3xl font-bold flex ">
                     {<Logo/>}
          <span className='flex justify-center items-center'>Second Brain</span>  
            </div>
            <nav>
            <ul className="flex space-x-16 text-lg mt-2">
  <li className="text-gray-500"><Link to="/" className="hover:underline">Home</Link></li>
  <li className="text-gray-500"><Link to="/features" className="hover:underline">Features</Link></li>
  <li className="text-gray-500"><Link to="/pricing" className="hover:underline">Pricing</Link></li>
  <li className="text-gray-500"><Link to="/about" className="hover:underline">About</Link></li>
  <li>
    <Link
      to="/signup"
      className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
    >
      Get Started
    </Link>
  </li>
</ul>

            </nav>
            <button onClick={toggleTheme} className="p-2">
                🌙
            </button>
        </div>
       
    );
};

export default Header;
