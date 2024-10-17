import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";

import { loader as recipesLoader } from "../components/Home/Recipes";

import HeaderLayout from "../layouts/HeaderLayout";

import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import RecipeDetailPage from "../pages/RecipeDetailPage";
import SelectedRecipesPage from "../pages/SelectedRecipesPage";

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: recipesLoader(queryClient),
      },
      { path: "/recipe/:recipeId", element: <RecipeDetailPage /> },
      { path: "/selected", element: <SelectedRecipesPage /> },
    ],
  },
]);
