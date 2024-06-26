import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type ModalProps = {
  body: React.ReactNode;
  cancelText: string;
  confirmText: string;
  header: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ModalApp: React.FC<ModalProps> = ({
  body,
  cancelText,
  confirmText,
  header,
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button onClick={onClose}>{cancelText}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalApp;
