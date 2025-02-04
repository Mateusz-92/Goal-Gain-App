import React from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';

import { useAuth } from '../../../context/AuthContext';
import { useEditCrossOutSavingComponent } from '../../../firebase/mutations';
import { ammountBord } from '../../../types';
import ModalApp from '../../Modal/ModalApp';

type CircleItemProps = {
  amounts: ammountBord[];
  savingCrossOutId: string | undefined;
} & ammountBord;

const CircleItem: React.FC<CircleItemProps> = ({
  amounts,
  id,
  isCrossOut,
  savingCrossOutId,
  value,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { userId } = useAuth();
  const editCrossOutSaving = useEditCrossOutSavingComponent();

  const handleAddToCrossOutSavings = () => {
    const newSaving = {
      date: new Date().toString(),
      id: id,
      isCrossOut: !isCrossOut,
      value: value,
    };

    const existingIndex = amounts.findIndex((item) => item.id === newSaving.id);
    const newAmounts = [...amounts];

    if (existingIndex !== -1) {
      newAmounts[existingIndex] = newSaving;
    } else {
      newAmounts.push(newSaving);
    }

    editCrossOutSaving.mutate({
      userId: userId,
      value: { amounts: newAmounts, id: savingCrossOutId },
    });

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
        fontWeight='bold'
        height={['40px', '60px', '80px']}
        justifyContent='center'
        margin='10px'
        width={['40px', '60px', '80px']}
        _hover={{ backgroundColor: isCrossOut
? 'var(--green)'
: 'var(--orange)' }}
        backgroundColor={isCrossOut
? 'var(--green)'
: 'var(--light-gray)'}
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
