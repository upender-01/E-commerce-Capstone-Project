import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { ShopContext } from '../context/shopcontext';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 2. Initialize navigate
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 flex flex-col md:flex-row gap-8 bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl mt-10">
      <img src={product.image} alt={product.title} className="w-full md:w-1/2 object-contain p-4" />
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
        <p className="text-xl text-blue-600 my-4 font-bold">${product.price}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <div className="flex gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700"
          >
            Add to Cart
          </motion.button>
          
          {/* 3. The new Back Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)} 
            className="px-8 py-3 bg-gray-200 text-gray-800 rounded-full font-bold shadow-md hover:bg-gray-300"
          >
            Back
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;