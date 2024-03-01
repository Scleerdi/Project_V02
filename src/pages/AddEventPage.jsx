// AddEventPage.jsx
import React, { useEffect, useState } from "react";
import { EventForm } from "../components/EventForm";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const AddEventPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  const handleAddEvent = async (newEventData) => {
    try {
      const newEventId = lastAddedEventId(events) + 1;

      const newEvent = {
        id: newEventId + 1,
        createdBy: 1,
        title: newEventData.title,
        description: newEventData.description,
        image: newEventData.image,
        categoryIds: newEventData.categoryIds,
        location: newEventData.location,
        startTime: newEventData.startTime,
        endTime: newEventData.endTime,
      };

      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to add the new event");
      }

      setEvents((prevEvents) => [...prevEvents, newEvent]);

      toast({
        title: "Event created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      console.error("Error adding event:", error);
      toast({
        title: "Error adding event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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

  const lastAddedEventId = (events) => {
    if (events.length === 0) {
      return 0;
    }
    const eventIds = events.map((event) => event.id);
    const maxId = Math.max(...eventIds);

    return maxId;
  };

  return (
    <div>
      <Button onClick={() => navigate("/")}>Back to Events</Button>
      <h2>Add Event</h2>
      <EventForm
        onSubmit={handleAddEvent}
        lastAddedEventId={lastAddedEventId(events)}
      />
    </div>
  );
};
