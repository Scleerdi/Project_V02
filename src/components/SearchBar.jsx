import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Select,
} from "@chakra-ui/react";

export const SearchBar = ({ onSearch, categories, onCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm, selectedCategory);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onCategoryChange(event.target.value);
  };

  return (
    <div>
      <InputGroup>
        <InputLeftElement pointerEvents="none" />
        <Input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </InputGroup>
      <Select value={selectedCategory} onChange={handleCategoryChange} mt={2}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
      <Button colorScheme="teal" mt={2} onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};
