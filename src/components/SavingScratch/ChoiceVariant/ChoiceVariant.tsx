import React, { useState } from 'react';
import { Box, Button, Radio, RadioGroup, useDisclosure } from '@chakra-ui/react';

import { useAuth } from '../../../context/AuthContext';
import { useEditCrossOutSavingComponent } from '../../../firebase/mutations';
import ModalApp from '../../Modal/ModalApp';
import { ammountBord, testBord, testBord2 } from '../CircleList/CircleList';

type BordOption = {
  label: string;
  value: ammountBord[];
};

const ChoiceVariant: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = useAuth();
  const userId = user?.uid || '';
  const editCrossOutSaving = useEditCrossOutSavingComponent(userId);

  const [selectedBord, setSelectedBord] = useState<ammountBord[]>(testBord);

  const bordOptions: BordOption[] = [
    { label: 'testBord', value: testBord },
    { label: 'testBord2', value: testBord2 },
  ];

  const handleBordChange = (value: string) => {
    const selectedOption = bordOptions.find((option) => JSON.stringify(option.value) === value);

    if (selectedOption) {
      setSelectedBord(selectedOption.value);
    }
  };

  const handleSave = () => {
    const selectedLabel = bordOptions.find(
      (option) => JSON.stringify(option.value) === JSON.stringify(selectedBord),
    )?.label;

    editCrossOutSaving.mutate({
      amounts: selectedBord,
      variantName: selectedLabel || '',
    });
    onClose();
  };

  return (
    <Box alignItems='center' display='flex' flexDirection='column'>
      <RadioGroup value={JSON.stringify(selectedBord)} onChange={handleBordChange}>
        {bordOptions.map((option) => (
          <Radio key={option.label} value={JSON.stringify(option.value)}>
            {option.label}
          </Radio>
        ))}
      </RadioGroup>

      <Button mt={4} onClick={onOpen}>
        Save
      </Button>
      <ModalApp
        body={''}
        cancelText='Nie'
        confirmText='Tak'
        header={'Czy chcesz utworzyć wykreślankę oszczędności ?'}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSave}
      />
    </Box>
  );
};

export default ChoiceVariant;
