"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from localStorage on initial load
  const fetchCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    setLoading(false);
  };

  // Save cart to localStorage
  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  // Add to Cart function (with quantity tracking)
  const addToCart = (recipe) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.idMeal === recipe.idMeal
      );
      let updatedCart;

      if (existingItem) {
        // If item already exists in cart, increment quantity
        updatedCart = prevCart.map((item) =>
          item.idMeal === recipe.idMeal
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item does not exist, add it to cart with quantity 1
        updatedCart = [...prevCart, { ...recipe, quantity: 1 }];
      }

      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  // Remove from Cart function
  const removeFromCart = (recipeId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.idMeal !== recipeId);
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  // Clear Cart function
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {!loading && children}
    </CartContext.Provider>
  );
};
