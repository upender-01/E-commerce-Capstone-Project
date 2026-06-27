import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShopContext } from "../context/shopcontext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(ShopContext);
  const location = useLocation();

  if (!isAuthenticated) {
    // Save the location the user tried to go to so we can send them back after login 
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;