import React, { useContext } from 'react';
import { ShopContext } from '../context/shopcontext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart } = useContext(ShopContext);
  const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      <AnimatePresence>
        {cart.map((item, index) => (
          <motion.div 
            key={index}
            exit={{ opacity: 0, x: -50 }}
            className="flex items-center justify-between p-4 mb-4 bg-white rounded-xl shadow-md"
          >
            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
            <p className="font-semibold">{item.title}</p>
            <p className="text-blue-600 font-bold">${item.price}</p>
            <button 
              onClick={() => removeFromCart(index)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="mt-6 text-2xl font-bold">Total: ${total}</div>
    </div>
  );
};

export default Cart;