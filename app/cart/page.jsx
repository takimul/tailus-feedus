"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/context/cartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  // Use effect to set loading state to false when cart data is ready
  useEffect(() => {
    if (cart) {
      setIsLoading(false);
    }
  }, [cart]);

  // Handle cart display and empty state
  const handleEmptyCart = () => {
    clearCart();
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-600 py-10">
        Loading your cart...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-semibold text-center mb-8">Your Cart</h1>

        {/* If Cart is Empty */}
        {cart.length === 0 ? (
          <div className="text-center text-gray-600">
            Your cart is empty. Start adding some recipes!
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Cart Items List */}
              {cart.map((item) => (
                <div
                  key={item.idMeal}
                  className="group space-y-4 border border-gray-200 rounded-3xl bg-white px-6 py-6 text-center shadow-md hover:cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out"
                >
                  {/* Recipe Image */}
                  <Image
                    className="mx-auto rounded-2xl object-cover"
                    src={item?.strMealThumb}
                    alt={item?.strMeal || "Recipe Image"}
                    loading="lazy"
                    width={300}
                    height={300}
                  />

                  {/* Recipe Name */}
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item?.strMeal || "Untitled Recipe"}
                  </h3>

                  {/* Recipe Description */}
                  <p className="text-sm text-gray-600">
                    {item?.description || "A delicious recipe to try at home!"}
                  </p>

                  {/* Remove from Cart Button */}
                  <button
                    onClick={() => removeFromCart(item.idMeal)}
                    className="w-full mt-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                  >
                    Remove from Cart
                  </button>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleEmptyCart}
                className="py-2 px-6 text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
