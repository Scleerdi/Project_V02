import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { EditEventForm } from "./EditEventForm";

export const EditEventModal = ({
  isOpen,
  onClose,
  event,
  categories,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({});
  const toast = useToast();

  console.log(formData);
  useEffect(() => {
    setFormData({
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
    });
  }, [event]);

  const handleEditSubmit = async (updatedFormData) => {
    try {
      await onSubmit(updatedFormData);
      toast({
        title: "Event updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Failed to update event",
        description: "An error occurred while updating the event.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditEventForm
            event={event}
            categories={categories}
            onSubmit={handleEditSubmit}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
