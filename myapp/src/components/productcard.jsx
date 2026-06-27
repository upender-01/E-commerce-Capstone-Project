import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  // Fallback dummy image if the product doesn't have one
  const imageUrl = product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";

  return (
    <motion.div
      layout
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex flex-col justify-between p-5 rounded-3xl shadow-xl bg-white/40 backdrop-blur-lg border border-white/50 overflow-hidden group"
    >
      {/* Decorative background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Product Image */}
      <div className="h-48 w-full bg-white/60 rounded-2xl p-4 mb-5 flex items-center justify-center shadow-inner">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          src={imageUrl} 
          alt={product.title} 
          className="max-h-full object-contain drop-shadow-md" 
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1">
        <span className="text-xs font-bold tracking-wider text-blue-500 uppercase mb-2">
          {product.category || "General"}
        </span>
        <h2 className="font-extrabold text-gray-800 text-lg leading-tight line-clamp-2 mb-2">
          {product.title}
        </h2>
        <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 mt-auto">
          ${parseFloat(product.price).toFixed(2)}
        </p>
      </div>

      {/* Action Button */}
      <Link 
        to={`/product/${product.id}`}
        className="mt-5 w-full block"
      >
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold tracking-wide shadow-md group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"
        >
          View Details
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default ProductCard;