import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/cartContext";

const RecipeCard = ({ recipe, handleDetailsOpen }) => {
  const { addToCart } = useCart();

  if (!recipe) return null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(recipe);

    // Trigger Toastify message
    toast.success("Recipe added to cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div
      onClick={() => handleDetailsOpen(recipe?.idMeal)}
      className="group flex flex-col space-y-4 border border-gray-200 rounded-3xl bg-white px-6 py-6 text-center shadow-md hover:cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out"
    >
      {/* Recipe Image */}
      <Image
        className="mx-auto rounded-2xl object-cover"
        src={recipe?.strMealThumb}
        alt={recipe?.strMeal || "Recipe Image"}
        loading="lazy"
        width={300}
        height={300}
      />

      {/* Recipe Name */}
      <h3 className="text-xl font-semibold text-gray-800">
        {recipe?.strMeal || "Untitled Recipe"}
      </h3>

      {/* Recipe Description */}
      <p className="text-sm text-gray-600 flex-grow">
        {recipe?.description || "A delicious recipe to try at home!"}
      </p>

      {/* Details Button */}
      <div className="relative mx-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="text-blue-500 underline hover:text-blue-600">
          Click to see details
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full mt-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg pb-4"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default RecipeCard;
