import React, { useState } from "react";

interface SearchInputProps {
  onSearchChange: (query: string) => void;
}

const SearchInput = ({ onSearchChange }: SearchInputProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearchChange(newQuery);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search meals..."
      className="border border-gray-300 rounded-md p-2"
    />
  );
};

export default SearchInput;
