import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context & Utility Components
import { ShopProvider } from './context/shopcontext';
import ErrorBoundary from './components/Errorboundary';
import Navbar from './components/navabar';
import ProtectedRoute from './components/protectedroute';

// Lazy loaded page components
const Home = lazy(() => import('./pages/home'));
const ProductDetails = lazy(() => import('./pages/productdetails'));
const Cart = lazy(() => import('./pages/cart'));
const Checkout = lazy(() => import('./pages/checkout'));
const Login = lazy(() => import('./pages/login'));

// Loading State Component
const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center text-xl font-semibold text-blue-600">
    <div className="animate-pulse flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p>Loading frosted glass assets...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ShopProvider>
        <Router>
          <Navbar />
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                
                {/* Protected Routes - Day 4 Requirement */}
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </Router>
      </ShopProvider>
    </ErrorBoundary>
  );
}

export default App;