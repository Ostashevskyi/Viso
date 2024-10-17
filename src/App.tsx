import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { TRecipe } from "./types/Recipe";

const queryClient = new QueryClient();

export const SelectedRecipes = createContext<{
  selectedRecipes: TRecipe[];
  setSelectedRecipes: React.Dispatch<React.SetStateAction<TRecipe[]>>;
}>({ selectedRecipes: [], setSelectedRecipes: () => {} });

function App() {
  const [selectedRecipes, setSelectedRecipes] = useState<TRecipe[]>([]);
  return (
    <QueryClientProvider client={queryClient}>
      <SelectedRecipes.Provider value={{ selectedRecipes, setSelectedRecipes }}>
        <RouterProvider router={router} />
      </SelectedRecipes.Provider>
    </QueryClientProvider>
  );
}

export default App;
