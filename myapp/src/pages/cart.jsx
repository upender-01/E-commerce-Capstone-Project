
import React, { useContext } from 'react';
import { ShopContext } from '../context/shopcontext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Your Cart</h2>
            <p className="text-sm text-gray-500 mt-1">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <ShoppingCart size={28} className="text-blue-600" />
        </div>

        {cart.length === 0 ? (
          /* EMPTY CART */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 text-center"
          >
            <ShoppingBag size={60} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Continue Shopping <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id ?? `${item.title}-${index}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
                  >
                    {/* PRODUCT IMAGE */}
                    <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 bg-gray-50 rounded-xl flex items-center justify-center p-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-blue-600 font-bold text-lg mt-2">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    {/* REMOVE BUTTON */}
                    <button
                      onClick={() => removeFromCart(index)}
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition font-semibold text-sm"
                    >
                      <Trash2 size={17} />
                      Remove
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 lg:sticky lg:top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-5">Order Summary</h3>

                <div className="flex justify-between text-gray-600 mb-3">
                  <span>Items ({cart.length})</span>
                  <span>${total}</span>
                </div>

                <div className="flex justify-between text-gray-600 mb-4">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${total}</span>
                </div>

                {/* PLACE ORDER BUTTON */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-bold hover:opacity-90 active:scale-95 transition"
                >
                  Place Order <ArrowRight size={19} />
                </button>

                <Link
                  to="/"
                  className="block text-center text-sm text-gray-500 hover:text-blue-600 mt-4 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
