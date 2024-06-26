import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Button, useDisclosure } from "@chakra-ui/react";

import { useUser } from "../../context/UserContext";
import ModalApp from "../Modal/ModalApp";

type Option = {
  option: string;
};

const data: Option[] = [
  { option: "1" },
  { option: "5" },
  { option: "7" },
  { option: "9" },
  { option: "15" },
  { option: "20" },
  { option: "22" },
  { option: "25" },
  { option: "30" },
];

export const Roulette: React.FC = () => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  // eslint-disable-next-line no-magic-numbers
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [savingValue, setSavingValue] = useState<number>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { addRouletteSaving } = useUser();

  const handleSpinClick: () => void = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning: () => void = () => {
    setSavingValue(parseInt(data[prizeNumber].option));
    onOpen();
    setMustSpin(false);
  };

  const handleAddToSavings = () => {
    if (savingValue !== undefined) {
      addRouletteSaving(savingValue);
      setSavingValue(undefined);
      onClose();
    }
  };

  return (
    <>
      <Wheel
        data={data}
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        onStopSpinning={handleStopSpinning}
      />
      <Button onClick={handleSpinClick}>ZAKRĘĆ!</Button>

      <ModalApp
        body={`Potwierdź, aby dodać wylosowaną kwotę ${savingValue} PLN do skarbonki.`}
        cancelText="Anuluj"
        confirmText="Tak"
        header="Czy chcesz dodać wylosowaną kwotę do skarbonki?"
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleAddToSavings}
      />
    </>
  );
};

export default Roulette;
