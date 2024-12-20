"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/lib/firebase/config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();

  // Save cart to Firestore
  const saveCartToFirestore = async (email, cartData) => {
    if (email) {
      const cartRef = doc(db, "carts", email);
      await setDoc(cartRef, { cart: cartData });
    }
  };

  // Fetch cart from Firestore
  const fetchCartFromFirestore = async (email) => {
    if (email) {
      const cartRef = doc(db, "carts", email);
      const docSnap = await getDoc(cartRef);
      if (docSnap.exists()) {
        return docSnap.data().cart || [];
      }
    }
    return [];
  };

  // Fetch cart data on login or initial load
  const fetchCart = async () => {
    const user = auth.currentUser;

    if (user) {
      // If user is logged in, fetch cart from Firestore
      const userCart = await fetchCartFromFirestore(user.email);
      setCart(userCart);
      // Optionally, clear localStorage if the user is logged in
      localStorage.removeItem("cart");
    } else {
      // If not logged in, use localStorage cart data
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add to Cart function
  const addToCart = (recipe) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, recipe];
      const user = auth.currentUser;

      if (user) {
        saveCartToFirestore(user.email, updatedCart);
      } else {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return updatedCart;
    });
  };

  // Remove from Cart function
  const removeFromCart = (recipeId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.idMeal !== recipeId);
      const user = auth.currentUser;

      if (user) {
        saveCartToFirestore(user.email, updatedCart);
      } else {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return updatedCart;
    });
  };

  // Clear Cart function
  const clearCart = () => {
    setCart([]);
    const user = auth.currentUser;

    if (user) {
      saveCartToFirestore(user.email, []);
    } else {
      localStorage.removeItem("cart");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {!loading && children}
    </CartContext.Provider>
  );
};
