"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/context/cartContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cart) {
      setIsLoading(false);
    }
  }, [cart]);

  const handleRemoveItem = (idMeal) => {
    removeFromCart(idMeal);
    toast.info("Item removed from cart", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleEmptyCart = () => {
    clearCart();
    toast.warn("Cart cleared successfully", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-semibold text-center mb-8 mt-24">
          Your Cart
        </h1>

        {/* If Cart is Empty */}
        {cart.length === 0 ? (
          <div className="text-center text-gray-600">
            Your cart is empty. Start adding some recipes!
          </div>
        ) : (
          <div>
            <div className="space-y-6">
              {/* Cart Items List */}
              {cart.map((item) => (
                <div
                  key={item.idMeal}
                  className="flex items-center justify-between bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 ease-in-out"
                >
                  {/* Image */}
                  <div className="w-28 h-28 relative">
                    <Image
                      className="w-full h-full object-cover rounded-md"
                      src={item?.strMealThumb}
                      alt={item?.strMeal || "Recipe Image"}
                      loading="lazy"
                      width={112}
                      height={112}
                    />
                    {/* Display Quantity */}
                    {item.quantity > 1 && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                        {item.quantity}
                      </div>
                    )}
                  </div>

                  {/* Recipe Details */}
                  <div className="flex-grow ml-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item?.strMeal || "Untitled Recipe"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {item?.description ||
                        "A delicious recipe to try at home!"}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <div className="ml-4">
                    <button
                      onClick={() => handleRemoveItem(item.idMeal)}
                      className="py-2 px-4 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleEmptyCart}
                className="py-3 px-8 text-white bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
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
