// EventPage.js
import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Image,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useCategory } from "../context/CategoryContext";
import { useUser } from "../context/UserContext";
import { EditEventModal } from "../components/EditEventModal";
import { useParams } from "react-router-dom";
import { EventsPage } from "./EventsPage";
import { useNavigate } from "react-router-dom";

export const EventPage = () => {
  const { users } = useUser();
  const { eventId } = useParams();
  const { categories } = useCategory();
  const [event, setEvent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        const eventData = await response.json();
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const {
    id,
    title,
    description,
    startTime,
    endTime,
    image,
    categoryIds,
    createdBy,
  } = event;

  const getCategoryNames = (categoryIds) => {
    return categoryIds.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "";
    });
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the event");
      }
      setEvent((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
    return <EventsPage />;
  };

  const user = users.find((user) => user.id === createdBy);

  const handleEditSubmit = async (formData) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedResponse = await fetch(
          `http://localhost:3000/events/${eventId}`
        );
        const updatedEventData = await updatedResponse.json();
        setEvent(updatedEventData);
      } else {
        console.error("Failed to update event details:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating event details:", error);
    } finally {
      onClose();
    }
  };

  return (
    <Box maxW="md" borderWidth="1px" borderRadius="md" p="4">
      <Text fontWeight="bold" fontSize="lg" mb="2">
        {title}
      </Text>
      <Text mb="2">Description: {description}</Text>
      <Image
        boxSize="200px"
        objectFit="cover"
        src={image}
        alt={title}
        borderRadius="md"
      />
      <Text mb="2">Starts at: {startTime}</Text>
      <Text mb="2">Ends at: {endTime}</Text>
      <strong>Categories:</strong>{" "}
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
      <div>
        <Box display="flex" alignItems="center" mt="2">
          <Image
            boxSize="30px"
            borderRadius="full"
            src={user.image}
            alt={user.name}
            marginRight="2"
          />
          <strong>Created By: </strong>
          <Text>{user.name}</Text>
        </Box>
        <Button alignContent="center" colorScheme="yellow" onClick={onOpen}>
          Edit Event
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            handleDeleteEvent(id);
            navigate("/");
          }}
        >
          Delete Event
        </Button>
      </div>
      <EditEventModal
        isOpen={isOpen}
        onClose={onClose}
        event={event}
        categories={categories}
        onSubmit={handleEditSubmit}
      />
    </Box>
  );
};
