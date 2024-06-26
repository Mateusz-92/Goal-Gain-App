import React, { useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";

import { useUser } from "../../../context/UserContext";
import ModalApp from "../../Modal/ModalApp";

type CircleItemProps = {
  value: number;
};

const CircleItem: React.FC<CircleItemProps> = ({ value }) => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { addCrossOutSaving, subtractCrossOutSaving } = useUser();
  const handleAddToCrossOutSavings = () => {
    setIsActive(!isActive);

    if (!isActive) {
      addCrossOutSaving(value);
    } else {
      subtractCrossOutSaving(value);
    }

    onClose();
  };

  const handleClick = () => {
    onOpen();
  };

  return (
    <>
      <Box
        alignItems="center"
        as="button"
        borderRadius="50%"
        display="flex"
        height="50px"
        justifyContent="center"
        margin="10px"
        width="50px"
        backgroundColor={isActive
? "green.500"
: "gray.300"}
        onClick={handleClick}
      >
        {value}
      </Box>

      <ModalApp
        cancelText="Nie"
        confirmText="Tak"
        isOpen={isOpen}
        body={
          isActive
            ? `Czy na pewno chcesz usunąć kwotę ${value}?`
            : `Czy na pewno chcesz dodać kwotę ${value}?`
        }
        header={isActive
? "Czy usunąć kwotę?"
: "Czy dodać kwotę?"}
        onClose={onClose}
        onConfirm={handleAddToCrossOutSavings}
      />
    </>
  );
};

export default CircleItem;
