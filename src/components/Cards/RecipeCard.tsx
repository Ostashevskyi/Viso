import { Link } from "react-router-dom";

import { TRecipe } from "../../types/Recipe";

const RecipeCard = ({ recipe }: { recipe: TRecipe }) => {
  return (
    <div>
      <Link to={`/recipe/${recipe.idMeal}`}>
        <img
          src={recipe.strMealThumb}
          alt="recipe picture"
          className="max-w-full"
        />
      </Link>
      <h2 className="text-xl my-4">{recipe.strMeal}</h2>
      <div className="flex justify-between">
        <p>
          <strong>Category: </strong>
          {recipe.strCategory}
        </p>
        <p>
          <strong>Area: </strong>
          {recipe.strArea}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
