"use client";
import React, { useEffect, useState } from "react";
import HttpKit from "@/common/helpers/HttpKit";
import RecipeCard from "@/components/Recipes/RecipeCard";
import Modal from "@/components/Modal";
import SingleRecipe from "@/components/Recipes/SingleRecipe";

const AllRecipes = () => {
  const [categories, setCategories] = useState([]);
  const [recipesByCategory, setRecipesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");

  useEffect(() => {
    const fetchCategoriesAndRecipes = async () => {
      try {
        const categoriesData = await HttpKit.getCategories();
        setCategories(categoriesData);

        const recipes = {};
        for (const category of categoriesData) {
          const categoryRecipes = await HttpKit.getTopRecipes(
            category.strCategory
          );
          recipes[category.strCategory] = categoryRecipes || [];
        }

        setRecipesByCategory(recipes);
        setLoading(false);
      } catch (err) {
        console.error("Error loading categories or recipes:", err);
        setError("Failed to load recipes. Please try again later.");
        setLoading(false);
      }
    };

    fetchCategoriesAndRecipes();
  }, []);

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  if (loading) return <div>Loading all recipes...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 mt-8">
          All Recipes
        </h1>

        {categories.map((category) => (
          <div key={category.strCategory} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              {category.strCategory}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recipesByCategory[category.strCategory]?.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  handleDetailsOpen={handleDetailsOpen}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Recipe Details */}
      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        <SingleRecipe id={recipeId} setIsOpen={setOpenDetails} />
      </Modal>
    </div>
  );
};

export default AllRecipes;
