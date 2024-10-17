import { useContext } from "react";

import { Link, useParams } from "react-router-dom";
import { QueryClient, useQuery } from "@tanstack/react-query";

import { API_ROUTE } from "../constants";
import { SelectedRecipes } from "../App";

import { TRecipe } from "../types/Recipe";

import { getIngredientsAndMassure } from "../utils/getFromAPI";

const recipeDetailQuery = (recipeId: string) => ({
  queryKey: ["recipe", recipeId],
  queryFn: async () => {
    const res = await fetch(`${API_ROUTE}/lookup.php?i=${recipeId}`);
    const data = await res.json();
    return data.meals[0] as TRecipe;
  },
});

const RecipeDetailPage = () => {
  const { selectedRecipes, setSelectedRecipes } = useContext(SelectedRecipes);
  const { recipeId } = useParams<{ recipeId: string }>();
  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery(recipeDetailQuery(recipeId ?? ""));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching recipe: {(error as Error).message}</div>;
  }

  if (!recipe) {
    return <div>No recipe found</div>;
  }

  const ingredientsArray = getIngredientsAndMassure(recipe);

  const isSelected = selectedRecipes.some(
    (selected) => selected.idMeal === recipe.idMeal
  );

  const handleSelect = () => {
    if (isSelected) {
      setSelectedRecipes((prevSelected) =>
        prevSelected.filter((selected) => selected.idMeal !== recipe.idMeal)
      );
    } else {
      setSelectedRecipes((prevSelected) => [...prevSelected, recipe]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex gap-24">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="rounded-lg shadow-lg mb-6"
        />
        <div className="space-y-4 flex-1">
          <h1 className="text-3xl font-bold">{recipe.strMeal}</h1>
          <p>
            <strong>Category:</strong> {recipe.strCategory}
          </p>
          <p>
            <strong>Area:</strong> {recipe.strArea}
          </p>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside">
              {ingredientsArray.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          {recipe.strTags && (
            <p>
              <strong>Tags:</strong> {recipe.strTags}
            </p>
          )}
          <button
            onClick={handleSelect}
            className="border border-black rounded-md p-2 hover:bg-gray-400/10"
          >
            {isSelected ? "Unselect" : "Select"}
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <p className="whitespace-pre-line">{recipe.strInstructions}</p>
      </div>
      {recipe.strYoutube && (
        <div className="mb-2">
          <h2 className="text-2xl font-semibold my-2">Video Tutorial</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${new URL(
              recipe.strYoutube
            ).searchParams.get("v")}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {recipe.strSource && (
        <p>
          <strong>Source:</strong>{" "}
          <Link to={recipe.strSource} className="text-blue-400 ">
            {recipe.strSource}
          </Link>
        </p>
      )}
    </div>
  );
};

export default RecipeDetailPage;

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: { recipeId: string } }) => {
    const { recipeId } = params;
    const query = recipeDetailQuery(recipeId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
