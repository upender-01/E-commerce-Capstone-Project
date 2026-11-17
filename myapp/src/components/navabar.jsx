
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingCart, Home, CreditCard, LogOut, LogIn } from 'lucide-react';
import { ShopContext } from '../context/shopcontext';

const Navbar = () => {
  const { cart, isAuthenticated, logoutUser, searchTerm, setSearchTerm } = useContext(ShopContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logoutUser();
    setMenuOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.querySelector('input')?.focus();
  }, [searchOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { name: 'Catalog', path: '/', icon: Home },
    { name: 'Cart', path: '/cart', icon: ShoppingCart },
    { name: 'Checkout', path: '/checkout', icon: CreditCard }
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-3">

          {/* LOGO */}
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2 sm:gap-3 shrink-0">
            <motion.img
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              src="https://api.dicebear.com/7.x/shapes/svg?seed=DeveloperArena"
              alt="NexusStore Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 p-1 shadow-md"
            />
            <span className="text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">
              NexusStore
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-7 font-semibold text-gray-700">
            <Link to="/" className="hover:text-blue-600 transition-colors">Catalog</Link>
            <Link to="/cart" className="relative hover:text-blue-600 transition-colors">
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-3 -right-5 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link to="/checkout" className="hover:text-blue-600 transition-colors">Checkout</Link>
            {isAuthenticated ? (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLogout}
                className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-red-500 transition-colors">
                Sign Out
              </motion.button>
            ) : (
              <Link to="/login">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold shadow-md">
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          {/* SEARCH + HAMBURGER */}
          <div className="flex items-center gap-2">

            {/* EXPANDABLE SEARCH */}
            <div ref={searchRef} className="relative flex items-center">
              <AnimatePresence initial={false}>
                {searchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    onSubmit={(e) => e.preventDefault()}
                    className="absolute right-10 sm:right-11 overflow-hidden"
                  >
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search products..."
                      aria-label="Search products"
                      className="w-full px-4 py-2.5 rounded-full bg-gray-100 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label={searchOpen ? 'Close search' : 'Open search'}
                aria-expanded={searchOpen}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 transition-colors relative z-10"
              >
                {searchOpen ? <X size={21} /> : <Search size={21} />}
              </motion.button>
            </div>

            {/* MOBILE HAMBURGER */}
            <div className="relative md:hidden" ref={menuRef}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>

              {/* MOBILE DROPDOWN */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 overflow-hidden"
                  >
                    <div className="flex flex-col gap-1">
                      {navLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link key={item.name} to={item.path} onClick={closeMenu}
                            className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                            <div className="flex items-center gap-3">
                              <Icon size={19} />
                              <span className="font-medium">{item.name}</span>
                            </div>
                            {item.name === 'Cart' && cart.length > 0 && (
                              <span className="bg-red-500 text-white text-xs font-bold min-w-5 h-5 px-1 flex items-center justify-center rounded-full">
                                {cart.length}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                    <div className="my-2 border-t border-gray-100" />
                    {isAuthenticated ? (
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-semibold">
                        <LogOut size={19} /> Sign Out
                      </button>
                    ) : (
                      <Link to="/login" onClick={closeMenu}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors font-semibold">
                        <LogIn size={19} /> Sign In
                      </Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
