import React from "react";

interface CategorySelectProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySelect = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategorySelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value);
  };

  return (
    <select
      value={selectedCategory}
      onChange={handleChange}
      className="border border-gray-300 rounded-md p-2"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
