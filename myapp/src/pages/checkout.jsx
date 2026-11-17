
import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/shopcontext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Map, ShoppingBag, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, isAuthenticated } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', address: '', zip: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + Number(item.price), 0).toFixed(2);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-5">
            <Lock size={30} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Authentication Required</h2>
          <p className="text-gray-500 mb-7">Please sign in to continue with your purchase.</p>
          <button onClick={() => navigate('/login')}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition">
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.address.trim()) newErrors.address = 'Shipping address is required';
    if (!/^\d{5,10}$/.test(formData.zip)) newErrors.zip = 'Enter a valid postal code';
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
      setTimeout(() => navigate('/'), 3000);
    }
  };

  const fields = [
    { name: 'name', label: 'Full Name', placeholder: 'Enter your full name', icon: User, type: 'text' },
    { name: 'email', label: 'Email Address', placeholder: 'you@example.com', icon: Mail, type: 'email' },
    { name: 'address', label: 'Street Address', placeholder: 'House no., street, area', icon: MapPin, type: 'text' },
    { name: 'zip', label: 'ZIP / Postal Code', placeholder: 'Enter postal code', icon: Map, type: 'text' }
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center border border-gray-100">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={45} />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Order Confirmed!</h2>
          <p className="text-gray-500 leading-relaxed">Thank you for shopping with NexusStore, {formData.name}.</p>
          <div className="mt-6 p-4 bg-green-50 rounded-2xl text-green-700 font-semibold">
            Your order total: ${totalPrice}
          </div>
          <p className="text-sm text-gray-400 mt-5">Redirecting to catalog...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/40 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-8 sm:mb-10">
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition mb-5">
            <ArrowLeft size={17} /> Back to Cart
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Checkout <span className="text-blue-600">.</span>
          </h1>
          <p className="text-gray-500 mt-2">Complete your details and get your order ready.</p>
        </motion.div>

        {/* CHECKOUT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

          {/* SHIPPING FORM */}
          <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-white p-5 sm:p-8 md:p-10">

            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <MapPin size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Shipping Details</h2>
                <p className="text-sm text-gray-400">Where should we deliver your order?</p>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="space-y-5">
              {fields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.name}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <div className={`flex items-center gap-3 px-4 rounded-xl border bg-slate-50 transition-all duration-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 ${errors[field.name] ? 'border-red-400' : 'border-gray-200 focus-within:border-blue-500'}`}>
                      <Icon size={19} className="text-gray-400 shrink-0" />
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full py-3.5 bg-transparent outline-none text-gray-800 text-sm placeholder:text-gray-400"
                      />
                    </div>
                    {errors[field.name] && (
                      <p className="text-red-500 text-xs mt-2 ml-1">{errors[field.name]}</p>
                    )}
                  </div>
                );
              })}

              <div className="pt-3">
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all">
                  Complete Purchase <ArrowRight size={19} />
                </motion.button>
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                  <ShieldCheck size={15} className="text-green-500" />
                  Secure checkout experience
                </div>
              </div>
            </form>
          </motion.div>

          {/* ORDER SUMMARY */}
          <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 h-fit bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-white p-5 sm:p-7 lg:sticky lg:top-24">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                <p className="text-sm text-gray-400 mt-1">{cart.length} items in your cart</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <ShoppingBag size={22} />
              </div>
            </div>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-2 mb-6">
              {cart.map((item, idx) => (
                <div key={item.id ?? idx} className="flex items-center gap-3">
                  <div className="w-16 h-16 shrink-0 bg-slate-50 rounded-xl p-2 border border-gray-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2">{item.title}</p>
                    <p className="text-blue-600 font-bold mt-1">${Number(item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-gray-200 pt-5 space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span><span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping Fee</span><span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Taxes</span><span>Included</span>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between">
              <span className="font-bold text-gray-800">Total Amount</span>
              <span className="text-2xl font-extrabold text-blue-600">${totalPrice}</span>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-blue-50/70 flex gap-3 items-start">
              <ShieldCheck size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 leading-relaxed">
                Your order details are protected. Enjoy a smooth shopping experience with NexusStore.
              </p>
            </div>
          </motion.div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} NexusStore. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
