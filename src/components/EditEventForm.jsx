// EditEventForm.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useCategory } from "../context/CategoryContext";

export const EditEventForm = ({ event, onSubmit }) => {
  const { categories } = useCategory();
  const [formData, setFormData] = useState({
    id: event.id,
    createdBy: event.createdBy,
    title: event.title || "",
    description: event.description || "",
    image: event.image || "",
    categoryIds: event.categoryIds || [],
    location: event.location || "",
    startTime: event.startTime || "",
    endTime: event.endTime || "",
  });

  const handleCategoryChange = (selectedCategories) => {
    const numericCategories = selectedCategories.map(Number);

    setFormData((prevFormData) => ({
      ...prevFormData,
      categoryIds: numericCategories,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Box>
      <Text mb="2">Title</Text>
      <Input
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <Text mb="2">Description</Text>
      <Input
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <Text mb="2">Image URL</Text>
      <Input
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
      />
      <Text mb="2">Location</Text>
      <Input
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />
      <Text mb="2">Start Time</Text>
      <Input
        type="datetime-local"
        value={formData.startTime}
        onChange={(e) =>
          setFormData({ ...formData, startTime: e.target.value })
        }
      />
      <Text mb="2">End Time</Text>
      <Input
        type="datetime-local"
        value={formData.endTime}
        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
      />
      <Text mt="4">Categories:</Text>
      <CheckboxGroup
        colorScheme="teal"
        value={formData.categoryIds}
        onChange={handleCategoryChange}
      >
        {categories.map((category) => (
          <Checkbox key={category.id} value={category.id}>
            {category.name}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Button mt="4" colorScheme="teal" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Box>
  );
};
