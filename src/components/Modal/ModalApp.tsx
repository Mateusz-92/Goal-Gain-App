import React from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import Btn from '../../UI/Btn/Btn';

type ModalProps = {
  body: React.ReactNode;
  cancelText: string;
  confirmText: string;
  header: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
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
      <ModalContent background='var(--light-gray)'>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter gap={2}>
          <Btn text={confirmText} type='button' onClick={onConfirm} />
          <Btn text={cancelText} type='button' onClick={onClose} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalApp;
