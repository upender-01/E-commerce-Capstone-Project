import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/shopcontext'; // Ensure path matches your file structure

const Navbar = () => {
  const { cart, isAuthenticated, logoutUser, searchTerm, setSearchTerm } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="sticky top-0 z-50 w-full px-8 py-4 bg-white/40 backdrop-blur-xl border-b border-white/30 shadow-sm"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3" aria-label="Go to NexusStore Home">
          <motion.img 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            src="https://api.dicebear.com/7.x/shapes/svg?seed=DeveloperArena" 
            alt="NexusStore Logo" 
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 p-1 shadow-md"
          />
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">
            NexusStore
          </span>
        </Link>

        {/* SEO-Friendly Search Bar */}
        <form role="search" className="hidden md:flex items-center bg-white/50 rounded-full px-4 py-2 border border-white/50 shadow-inner" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="search" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-sm w-48 placeholder-gray-500"
            aria-label="Search through store products"
          />
        </form>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6 font-semibold text-gray-700 list-none">
          <li>
            <Link to="/" className="hover:text-blue-600 transition-colors">Catalog</Link>
          </li>
          
          <li className="relative">
            <Link to="/cart" className="hover:text-blue-600 transition-colors">Cart</Link>
            {cart.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-3 -right-4 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md"
                aria-label={`${cart.length} items in cart`}
              >
                {cart.length}
              </motion.span>
            )}
          </li>

          {/* Auth Controls */}
          <li>
            {isAuthenticated ? (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-5 py-2 bg-gray-800 text-white rounded-full text-sm font-bold shadow-lg hover:bg-red-500 transition-colors duration-300"
                aria-label="Sign out of your account"
              >
                Sign Out
              </motion.button>
            ) : (
              <Link to="/login">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold shadow-lg"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;