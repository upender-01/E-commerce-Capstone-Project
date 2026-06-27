import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/shopcontext';
import { motion } from 'framer-motion';
import ProductCard from '../components/productcard';
 // Ensure this exists

const Home = () => {
  const [products, setProducts] = useState([]);
  const { searchTerm } = useContext(ShopContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

// Use optional chaining (?.) and provide default empty strings
const filteredProducts = products.filter(product => {
  // 1. Ensure the search term is a string before converting
  const safeSearch = (searchTerm || "").toLowerCase();
  
  // 2. Ensure product title exists and convert it safely
  const productTitle = (product?.title || "").toLowerCase();
  
  return productTitle.includes(safeSearch);
});

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-7xl mx-auto p-6"
    >
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Product Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.div>
  );
};

export default Home;