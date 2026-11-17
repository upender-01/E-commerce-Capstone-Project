
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../context/shopcontext';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, Package, CheckCircle2 } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);
        setProduct(null);

        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error('Product not found');

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        <p className="mt-5 text-gray-500 font-medium">Loading product details...</p>
      </div>
    );
  }

  // ERROR
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-md w-full">
          <Package size={45} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
          <p className="text-gray-500 mt-2 mb-6">Sorry, we couldn't find this product.</p>
          <button onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/40 py-8 sm:py-12 px-4 sm:px-6">

      <div className="max-w-6xl mx-auto">

        {/* BACK NAVIGATION */}
        <motion.button
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={19} /> Back to Products
        </motion.button>

        {/* PRODUCT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-white p-5 sm:p-8 lg:p-10"
        >

          {/* PRODUCT IMAGE */}
          <div className="relative bg-gradient-to-br from-slate-50 to-blue-50/60 rounded-2xl min-h-[300px] sm:min-h-[400px] flex items-center justify-center p-8 overflow-hidden group">
            <span className="absolute top-5 left-5 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md">
              Featured Product
            </span>

            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.5 }}
              src={product.image}
              alt={product.title}
              className="w-full h-64 sm:h-80 object-contain drop-shadow-lg"
            />
          </div>

          {/* PRODUCT INFORMATION */}
          <div className="flex flex-col justify-center py-2">

            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
              {product.category}
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1 text-amber-400">
                <Star size={18} fill="currentColor" />
                <span className="text-gray-800 font-bold">{product.rating?.rate ?? 'N/A'}</span>
              </div>
              <span className="text-gray-400 text-sm">
                ({product.rating?.count ?? 0} reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-600">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                Best Price
              </span>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Product Description</h3>
              <p className="text-gray-500 leading-7 text-sm sm:text-base">
                {product.description}
              </p>
            </div>

            {/* BENEFITS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7 py-5 border-y border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Free Shipping</p>
                  <p className="text-xs text-gray-400">On your order</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Secure Shopping</p>
                  <p className="text-xs text-gray-400">Safe checkout</p>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold shadow-lg transition-all ${
                  added
                    ? 'bg-green-600 shadow-green-100'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-blue-200 hover:shadow-xl'
                }`}
              >
                {added ? <CheckCircle2 size={20} /> : <ShoppingCart size={20} />}
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(-1)}
                className="flex-1 sm:flex-none px-7 py-4 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </motion.button>
            </div>

            {/* CART LINK */}
            <Link to="/cart" className="flex items-center justify-center gap-2 text-sm text-blue-600 font-semibold mt-5 hover:text-purple-600 transition">
              View Your Cart <ShoppingCart size={16} />
            </Link>

          </div>
        </motion.div>

        {/* FOOTER NOTE */}
        <div className="text-center mt-8 text-sm text-gray-400">
          Experience premium shopping with NexusStore.
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
