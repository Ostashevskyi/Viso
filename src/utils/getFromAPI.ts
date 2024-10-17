import { TRecipe } from "../types/Recipe";

export const getIngredientsAndMassure = (recipe: TRecipe) => {
  return Array.from({ length: 20 }, (_, i) => {
    const ingredient = recipe[`strIngredient${i + 1}` as keyof TRecipe];
    const measure = recipe[`strMeasure${i + 1}` as keyof TRecipe];
    return ingredient ? `${measure} ${ingredient}`.trim() : null;
  }).filter(Boolean);
};

export const getCategory = (recipes: TRecipe[]) => {
  return recipes.map((recipe) => recipe.strCategory);
};

export const getCombinedInstructions = (recipes: TRecipe[]) => {
  return recipes
    .map((recipe) => {
      return recipe.strInstructions
        ? `${recipe.strMeal}:\n${recipe.strInstructions}`
        : null;
    })
    .filter(Boolean)
    .join("\n\n");
};
