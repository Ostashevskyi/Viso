import { useContext } from "react";

import RecipeCard from "../components/Cards/RecipeCard";

import { SelectedRecipes } from "../App";

import {
  getIngredientsAndMassure,
  getCombinedInstructions,
} from "../utils/getFromAPI";

const SelectedRecipesPage = () => {
  const { selectedRecipes } = useContext(SelectedRecipes);

  const combineIngredients = () => {
    const ingredientCount: Record<string, number> = {};

    selectedRecipes.forEach((recipe) => {
      const ingredients = getIngredientsAndMassure(recipe);
      ingredients.forEach((ingredient) => {
        ingredientCount[ingredient!] = (ingredientCount[ingredient!] || 0) + 1;
      });
    });

    return ingredientCount;
  };

  const combinedIngredients = combineIngredients();
  const combinedInstructions = getCombinedInstructions(selectedRecipes);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Selected Recipes</h1>
      {selectedRecipes.length === 0 ? (
        <div>No recipes are selected</div>
      ) : (
        <div>
          <div className="grid grid-cols-5 gap-10 mb-6">
            {selectedRecipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-2">Combined Ingredients</h2>
          <ul className="list-disc list-inside">
            {Object.entries(combinedIngredients).map(([ingredient, count]) => (
              <li key={ingredient}>
                {ingredient}: {count} {count > 1 ? "units" : "unit"}
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2">Combined Instructions</h2>
          <pre className="whitespace-pre-line">{combinedInstructions}</pre>{" "}
        </div>
      )}
    </div>
  );
};

export default SelectedRecipesPage;
