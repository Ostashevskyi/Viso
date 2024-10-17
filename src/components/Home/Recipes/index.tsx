import { useState, useMemo } from "react";

import { QueryClient, useQueries, useQuery } from "@tanstack/react-query";

import RecipeCard from "../../Cards/RecipeCard";

import CategorySelect from "../../Home/Filter/CategorySelect";

import SearchInput from "../../Inputs/SearchInput";

import PaginationControl from "../../Pagination/Pagination";

import { API_ROUTE } from "../../../constants";

import { TRecipe } from "../../../types/Recipe";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const fetchMealsByLetter = async (letter: string): Promise<TRecipe[]> => {
  const res = await fetch(`${API_ROUTE}/search.php?f=${letter}`);
  const data = await res.json();
  return data.meals || [];
};

const fetchCategories = async () => {
  const res = await fetch(`${API_ROUTE}/categories.php`);
  const data = await res.json();
  return data.categories.map(
    (category: { strCategory: string }) => category.strCategory
  );
};

export const loader = (queryClient: QueryClient) => async () => {
  const queries = alphabet.map((letter) => ({
    queryKey: ["recipes", letter],
    queryFn: () => fetchMealsByLetter(letter),
  }));
  return Promise.all(
    queries.map(async (query) => {
      return (
        queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery(query))
      );
    })
  );
};

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const queryResults = useQueries({
    queries: alphabet.map((letter) => ({
      queryKey: ["recipes", letter],
      queryFn: () => fetchMealsByLetter(letter),
    })),
  });

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  const isLoading = queryResults.some((query) => query.isLoading);
  const isError =
    queryResults.some((query) => query.isError) || isErrorCategories;

  const recipes = useMemo(
    () => queryResults.flatMap((query) => query.data || []),
    [queryResults]
  ) as TRecipe[];

  const filteredRecipes = useMemo(
    () =>
      recipes.filter((recipe) => {
        const matchesSearch = recipe.strMeal
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory
          ? recipe.strCategory === selectedCategory
          : true;
        return matchesSearch && matchesCategory;
      }),
    [recipes, searchQuery, selectedCategory]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 10;
  const totalRecipes = filteredRecipes.length;
  const totalPages = useMemo(
    () => Math.ceil(totalRecipes / mealsPerPage),
    [totalRecipes]
  );
  const currentMeals = useMemo(
    () =>
      filteredRecipes.slice(
        (currentPage - 1) * mealsPerPage,
        currentPage * mealsPerPage
      ),
    [filteredRecipes, currentPage, mealsPerPage]
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(event);

    setCurrentPage(page);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  if (isLoading || isLoadingCategories) return <div>Loading...</div>;
  if (isError) return <div>Error fetching recipes</div>;

  return (
    <div className="flex gap-6 px-6 flex-col">
      <SearchInput onSearchChange={handleSearchChange} />
      <CategorySelect
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {filteredRecipes.length === 0 ? (
        <div>No recipes found</div>
      ) : (
        <div className="grid grid-cols-5 gap-10">
          {currentMeals.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Recipes;
