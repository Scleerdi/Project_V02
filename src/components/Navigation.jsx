import React from "react";
import { Link } from "react-router-dom";
import { Button, Flex } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Flex align="letf">
      <Button colorScheme="teal" variant="outline">
        <Link to="/">Events</Link>
      </Button>
      <Button colorScheme="teal" variant="outline">
        <Link to="/AddEventPage">Add Event</Link>
      </Button>
    </Flex>
  );
};
