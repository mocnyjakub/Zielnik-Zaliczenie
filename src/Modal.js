import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import Form from './Form';

const EditModal = ({ isOpen, onClose, plantIdToEdit, editPlant, plants }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edycja Rośliny</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form
            editPlant={editPlant}
            plantIdToEdit={plantIdToEdit}
            isEdit
            plants={plants}
          ></Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
