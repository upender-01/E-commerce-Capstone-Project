import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from "../context/shopcontext";

const Login = () => {
  const { loginUser, registerUser } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState({ isError: false, message: '' });

  // Redirect users back to where they came from (like checkout) if applicable 
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Custom form validations [cite: 83]
    if (!email.includes('@') || password.length < 6) {
      setFeedback({ isError: true, message: 'Please provide a valid email and a 6+ character password.' });
      return;
    }

    if (isRegister) {
      const result = registerUser(email, password);
      if (result.success) {
        setFeedback({ isError: false, message: result.message });
        setIsRegister(false); // Switch to login screen 
        setPassword('');
      } else {
        setFeedback({ isError: true, message: result.message });
      }
    } else {
      const result = loginUser(email, password);
      if (result.success) {
        setFeedback({ isError: false, message: 'Authenticated successfully! Redirecting...' });
        setTimeout(() => navigate(from, { replace: true }), 1000);
      } else {
        setFeedback({ isError: true, message: result.message });
      }
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isRegister ? 'Sign up to start saving orders' : 'Sign in to access secure checkout'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {feedback.message && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-4 p-3 rounded-xl border text-sm text-center font-medium ${
                feedback.isError 
                  ? 'bg-red-100/80 border-red-400 text-red-700' 
                  : 'bg-green-100/80 border-green-400 text-green-700'
              }`}
            >
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@arena.com"
              className="w-full p-4 rounded-xl border border-white/40 bg-white/50 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-4 rounded-xl border border-white/40 bg-white/50 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800"
              required
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-2 w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg"
          >
            {isRegister ? 'Register Account' : 'Login'}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isRegister ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button 
            onClick={() => {
              setIsRegister(!isRegister);
              setFeedback({ isError: false, message: '' });
            }}
            className="text-blue-600 font-bold hover:underline ml-1"
          >
            {isRegister ? 'Login Here' : 'Register Here'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;