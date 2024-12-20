"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const SingleRecipe = ({ id, setIsOpen }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details", id],
    queryFn: () => HttpKit.getRecipeDetails(id),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading recipe details...</div>;

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">
          Failed to load recipe details. Please try again later.
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
      <div>
        <Image
          src={data?.strMealThumb}
          width={500}
          height={500}
          alt={data?.strMeal || "Recipe Image"}
        />
      </div>
      <h2 className="text-2xl font-semibold">{data?.strMeal}</h2>
      <p>
        {data?.strInstructions || "No instructions available for this recipe."}
      </p>
    </div>
  );
};

export default SingleRecipe;
