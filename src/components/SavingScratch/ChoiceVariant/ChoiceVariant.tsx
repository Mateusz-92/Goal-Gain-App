import React, { useState } from 'react';
import { Box, Radio, RadioGroup, Text, useDisclosure } from '@chakra-ui/react';

import { variant2000, variant3000, variant4000 } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { useEditCrossOutSavingComponent } from '../../../firebase/mutations';
import { ammountBord } from '../../../types';
import Btn from '../../../UI/Btn/Btn';
import ModalApp from '../../Modal/ModalApp';

type BordOption = {
  label: string;
  value: ammountBord[];
};

const ChoiceVariant: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { mutate: editCrossOutSaving } = useEditCrossOutSavingComponent();

  const [selectedBord, setSelectedBord] = useState<ammountBord[]>(variant2000);

  const bordOptions: BordOption[] = [
    { label: '2000 PLN oszczędności', value: variant2000 },
    { label: '3000 PLN oszczędności', value: variant3000 },
    { label: '4000 PLN oszczędności', value: variant4000 },
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

    editCrossOutSaving({
      userId: userId,
      value: {
        amounts: selectedBord,
        variantName: selectedLabel || '',
      },
    });
    onClose();
  };
  // TODO: text content should be in translations
  return (
    <Box alignItems='center' display='flex' flexDirection='column'>
      <Text fontWeight={'bold'} m={2} textAlign={'center'}>
        Wybierz łączną kwotę, ktorą chcesz zaoszczędzić, każdy wariant posiada 33 pola kwot do
        zaoszczędzenia
      </Text>
      <RadioGroup mb={2} value={JSON.stringify(selectedBord)} onChange={handleBordChange}>
        {bordOptions.map((option) => (
          <Radio key={option.label} colorScheme='white' value={JSON.stringify(option.value)}>
            {option.label}
          </Radio>
        ))}
      </RadioGroup>

      <Btn text='Zapisz' type='button' onClick={onOpen} />
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
 