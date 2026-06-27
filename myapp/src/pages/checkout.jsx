import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/shopcontext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cart, isAuthenticated } = useContext(ShopContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', email: '', address: '', zip: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  // Protect route
  if (!isAuthenticated) {
    return (
      <div className="text-center mt-20 p-8 max-w-md mx-auto bg-white/40 backdrop-blur-lg rounded-3xl border border-white/50 shadow-xl">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Authentication Required</h2>
        <p className="text-gray-700 mb-6">Please log in to complete your checkout process.</p>
        <button onClick={() => navigate('/login')} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700">Go to Login</button>
      </div>
    );
  }

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.includes('@')) newErrors.email = "Valid email is required";
    if (!formData.address.trim()) newErrors.address = "Shipping address is required";
    if (formData.zip.length < 5) newErrors.zip = "Valid ZIP code required";
    return newErrors;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSuccess(true);
      setTimeout(() => {
        navigate('/'); // Redirect to home after 3 seconds
      }, 3000);
    }
  };

  if (success) {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md mx-auto mt-20 p-10 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl text-center">
        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">✓</div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600">Thank you for your purchase, {formData.name}.</p>
        <p className="text-sm text-gray-500 mt-4">Redirecting to catalog...</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6 flex flex-col-reverse lg:flex-row gap-10">
      {/* Checkout Form */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-[2] bg-white/30 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Details</h2>
        <form onSubmit={handleCheckout} className="flex flex-col gap-5">
          <div>
            <input type="text" placeholder="Full Name" className={`w-full p-4 rounded-xl border ${errors.name ? 'border-red-500' : 'border-white/40'} bg-white/50 outline-none focus:ring-2 focus:ring-blue-500`} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            {errors.name && <p className="text-red-500 text-sm mt-1 ml-2">{errors.name}</p>}
          </div>
          <div>
            <input type="email" placeholder="Email Address" className={`w-full p-4 rounded-xl border ${errors.email ? 'border-red-500' : 'border-white/40'} bg-white/50 outline-none focus:ring-2 focus:ring-blue-500`} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>}
          </div>
          <div>
            <input type="text" placeholder="Street Address" className={`w-full p-4 rounded-xl border ${errors.address ? 'border-red-500' : 'border-white/40'} bg-white/50 outline-none focus:ring-2 focus:ring-blue-500`} onChange={(e) => setFormData({...formData, address: e.target.value})} />
            {errors.address && <p className="text-red-500 text-sm mt-1 ml-2">{errors.address}</p>}
          </div>
          <div>
            <input type="text" placeholder="ZIP / Postal Code" className={`w-full p-4 rounded-xl border ${errors.zip ? 'border-red-500' : 'border-white/40'} bg-white/50 outline-none focus:ring-2 focus:ring-blue-500`} onChange={(e) => setFormData({...formData, zip: e.target.value})} />
            {errors.zip && <p className="text-red-500 text-sm mt-1 ml-2">{errors.zip}</p>}
          </div>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" className="mt-4 w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg">
            Complete Purchase
          </motion.button>
        </form>
      </motion.div>

      {/* Order Summary */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 bg-white/50 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-lg h-fit sticky top-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300/50 pb-4">Order Summary</h2>
        <div className="flex flex-col gap-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
          {cart.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-white rounded-lg p-1 flex-shrink-0"><img src={item.image} alt={item.title} className="w-full h-full object-contain" /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.title}</p>
                <p className="text-blue-600 font-bold">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-300/50 pt-4 mt-auto">
          <div className="flex justify-between text-gray-600 mb-2"><span>Subtotal</span><span>${totalPrice}</span></div>
          <div className="flex justify-between text-gray-600 mb-4"><span>Shipping</span><span className="text-green-600 font-semibold">Free</span></div>
          <div className="flex justify-between font-black text-2xl text-gray-900"><span>Total</span><span>${totalPrice}</span></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;