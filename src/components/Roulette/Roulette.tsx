import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Heading, useDisclosure, VStack } from '@chakra-ui/react';

import { rouletteAmount } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { useAddRouletteSaving } from '../../firebase/mutations';
import Btn from '../../UI/Btn/Btn';
import ModalApp from '../Modal/ModalApp';

export const Roulette: React.FC = () => {
  const { userId } = useAuth();
  const [mustSpin, setMustSpin] = useState<boolean>(false);

  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [savingValue, setSavingValue] = useState<number>();
  const onAddRouletteSaving = useAddRouletteSaving(userId);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleSpinClick: () => void = () => {
    const newPrizeNumber = Math.floor(Math.random() * rouletteAmount.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning: () => void = () => {
    setSavingValue(parseInt(rouletteAmount[prizeNumber].option));
    onOpen();
    setMustSpin(false);
  };

  const handleAddToSavings = () => {
    if (savingValue !== undefined) {
      const newSaving = { amount: savingValue, date: new Date().toISOString() };
      onAddRouletteSaving.mutate(newSaving);
      setSavingValue(undefined);
      onClose();
    }
  };

  return (
    <>
      <VStack align={'center'}>
        <Heading size={'md'} textAlign={'center'}>
          Zagraj w oszczędzanie !
        </Heading>
        <Wheel
          backgroundColors={['#afac95', '#ef9335']}
          data={rouletteAmount}
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          onStopSpinning={handleStopSpinning}
        />
        <Btn text='Zakręć !' type='button' onClick={handleSpinClick} />
      </VStack>

      <ModalApp
        body={`Potwierdź, aby dodać wylosowaną kwotę ${savingValue} PLN do skarbonki.`}
        cancelText='Anuluj'
        confirmText='Tak'
        header='Czy chcesz dodać wylosowaną kwotę do skarbonki?'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleAddToSavings}
      />
    </>
  );
};

export default Roulette;
