import React, { useEffect, useState } from "react";
import { EventCard } from "../components/EventCard";
import { Flex, Spacer } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { EventPage } from "./EventPage";
import { useCategory } from "../context/CategoryContext";
import { useUser } from "../context/UserContext";
import { SearchBar } from "../components/SearchBar";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const { categories } = useCategory();
  const { users } = useUser();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const eventData = await response.json();
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  console.log(searchTerm);
  console.log(selectedCategory);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const handleSearch = (searchTerm, selectedCategory) => {
    setSearchTerm(searchTerm);
    setSelectedCategory(selectedCategory);

    const updatedFilteredEvents = filterEvents(searchTerm, selectedCategory);
    setFilteredEvents(updatedFilteredEvents);
  };

  const filterEvents = (searchTerm, selectedCategory) => {
    if (!searchTerm && !selectedCategory) {
      return events;
    }

    let filteredBySearch = events;
    if (searchTerm) {
      filteredBySearch = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    let filteredByCategory = filteredBySearch;
    if (selectedCategory) {
      filteredByCategory = filteredBySearch.filter((event) =>
        event.categoryIds.includes(parseInt(selectedCategory))
      );
    }

    return filteredByCategory;
  };

  return (
    <>
      <Routes>
        <Route path="/events/:eventId" element={<EventPage />} />
      </Routes>
      <Flex mb={4}>
        <SearchBar
          onSearch={handleSearch}
          categories={categories}
          onCategoryChange={(selectedCategory) =>
            setSelectedCategory(selectedCategory)
          }
        />
        <Spacer />
      </Flex>
      <Flex gap={4} flexWrap="wrap" justify="center" alignItems="center">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            categories={categories}
            users={users}
          />
        ))}
      </Flex>
    </>
  );
};
