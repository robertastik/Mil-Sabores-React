/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../config/axiosConfig";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem("cartItems");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart items from localStorage", error);
      return [];
    }
  });

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch user profile when token exists
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUserProfile(null);
        return;
      }

      try {
        const response = await api.get('/auth/profile');
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile for cart:", error);
        setUserProfile(null);
      }
    };

    fetchUserProfile();

    // Listen for auth changes (login/logout)
    const handleAuthChange = () => {
      fetchUserProfile();
    };
    window.addEventListener('auth-change', handleAuthChange);
    
    // Also listen for storage changes (for cross-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        fetchUserProfile();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const productId = product.id_prod || product.id;
      const itemInCart = prevItems.find((item) => (item.id_prod || item.id) === productId);
      if (itemInCart) {
        return prevItems.map((item) =>
          (item.id_prod || item.id) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => (item.id_prod || item.id) !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => (item.id_prod || item.id) !== productId);
      }
      return prevItems.map((item) =>
        (item.id_prod || item.id) === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Refresh user profile (call after login)
  const refreshUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUserProfile(null);
      return;
    }
    try {
      const response = await api.get('/auth/profile');
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error refreshing user profile:", error);
      setUserProfile(null);
    }
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Calculate discounts based on user profile from backend
  let finalDiscountPercent = 0;
  if (userProfile) {
    if (typeof userProfile.edad === "number" && userProfile.edad >= 50) {
      finalDiscountPercent += 50;
    }
    if (userProfile.felicesCincuenta) {
      finalDiscountPercent += 10;
    }
  }

  const hasFreeBirthdayCake = (() => {
    if (!userProfile || !userProfile.isDuoc || !userProfile.fechaNacimiento)
      return false;
    try {
      const dob = new Date(userProfile.fechaNacimiento);
      const today = new Date();
      return dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth();
    } catch (e) {
      return false;
    }
  })();

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.precio || 0) * item.quantity,
    0
  );

  const discountAmount = Number((subtotal * Math.min(finalDiscountPercent, 100) / 100).toFixed(2));
  const totalPrice = Number((subtotal - discountAmount).toFixed(2));

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    subtotal,
    discountAmount,
    totalPrice,
    finalDiscountPercent,
    hasFreeBirthdayCake,
    refreshUserProfile,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
