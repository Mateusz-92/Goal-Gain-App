import React from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';

import { useAuth } from '../../../context/AuthContext';
import { useEditCrossOutSavingComponent } from '../../../firebase/mutations';
import ModalApp from '../../Modal/ModalApp';
import { ammountBord } from '../CircleList/CircleList';

type CircleItemProps = {
  amounts: ammountBord[];
  savingCrossOutId: string;
} & ammountBord;

const CircleItem: React.FC<CircleItemProps> = ({
  amounts,
  id,
  isCrossOut,
  savingCrossOutId,
  value,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = useAuth();
  const userId = user?.uid || '';
  const editCrossOutSaving = useEditCrossOutSavingComponent(userId);

  const handleAddToCrossOutSavings = () => {
    const newSaving = {
      date: new Date().toString(),
      id: id,
      isCrossOut: !isCrossOut,
      value: value,
    };

    const existingIndex = amounts.findIndex((item) => item.id === newSaving.id);

    if (existingIndex !== -1) {
      const newAmounts = [...amounts];
      newAmounts[existingIndex] = newSaving;

      editCrossOutSaving.mutate({ amounts: newAmounts, id: savingCrossOutId });
    } else {
      const newAmounts = [...amounts, newSaving];
      editCrossOutSaving.mutate({ amounts: newAmounts, id: savingCrossOutId });
    }

    onClose();
  };

  const handleClick = () => {
    onOpen();
  };

  return (
    <>
      <Box
        alignItems='center'
        as='button'
        borderRadius='50%'
        display='flex'
        height='50px'
        justifyContent='center'
        margin='10px'
        width='50px'
        backgroundColor={isCrossOut
? 'green.500'
: 'gray.300'}
        onClick={handleClick}
      >
        {value}
      </Box>

      <ModalApp
        cancelText='Nie'
        confirmText='Tak'
        isOpen={isOpen}
        body={
          isCrossOut
            ? `Czy na pewno chcesz usunąć kwotę ${value}?`
            : `Czy na pewno chcesz dodać kwotę ${value}?`
        }
        header={isCrossOut
? 'Czy usunąć kwotę?'
: 'Czy dodać kwotę?'}
        onClose={onClose}
        onConfirm={handleAddToCrossOutSavings}
      />
    </>
  );
};

export default CircleItem;
