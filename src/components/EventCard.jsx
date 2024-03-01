import { Box, Image, Tag, TagLabel, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";

export const EventCard = ({ event }) => {
  const { title, description, startTime, endTime, image, categoryIds } = event;
  const { categories } = useCategory();

  const getCategoryNames = (categoryIds) => {
    return categoryIds.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "";
    });
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDateTime = new Date(dateTimeString).toLocaleString(
      undefined,
      options
    );
    return formattedDateTime;
  };

  return (
    <Link to={`/events/${event.id}`} style={{ textDecoration: "none" }}>
      <Box
        maxW="sm"
        borderWidth="1px"
        overflow="hidden"
        borderRadius="md"
        alignContent="Center"
        as="button"
      >
        <Text fontWeight="bold" fontSize="lg" mb="2">
          {title}
        </Text>
        <Text mb="2">{description}</Text>
        <Image
          boxSize="250px"
          objectFit="cover"
          src={image}
          alt={title}
          borderRadius="md"
        />
        <Box p="4">
          <Text mb="2">Starts: {formatDateTime(startTime)}</Text>
          <Text mb="2">ends: {formatDateTime(endTime)}</Text>
          <li key={event.id}>
            <strong>Categories:</strong> <br />
            {getCategoryNames(categoryIds).map((category, index) => (
              <Tag
                key={index}
                size="md"
                variant="subtle"
                colorScheme="teal"
                marginRight="2"
              >
                <TagLabel>{category}</TagLabel>
              </Tag>
            ))}{" "}
          </li>
        </Box>
      </Box>
    </Link>
  );
};
