import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('active_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [usersDB, setUsersDB] = useState(() => {
    const db = localStorage.getItem('users_db');
    return db ? JSON.parse(db) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('active_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('users_db', JSON.stringify(usersDB));
  }, [usersDB]);

  // Auth Functions
  const registerUser = (email, password) => {
    const userExists = usersDB.some(user => user.email === email);
    if (userExists) return { success: false, message: "User already exists!" };
    
    const newUser = { email, password };
    setUsersDB(prev => [...prev, newUser]);
    return { success: true, message: "Registration successful! Please sign in." };
  };

  const loginUser = (email, password) => {
    const foundUser = usersDB.find(user => user.email === email && user.password === password);
    if (foundUser) {
      setCurrentUser({ email: foundUser.email });
      return { success: true };
    }
    return { success: false, message: "Invalid credentials or user does not exist." };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  // Cart Functions
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // NEW: Remove from cart function
  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <ShopContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, // Export the new function
      currentUser, 
      isAuthenticated: !!currentUser, 
      registerUser, 
      loginUser, 
      logoutUser 
    }}>
      {children}
    </ShopContext.Provider>
  );
};