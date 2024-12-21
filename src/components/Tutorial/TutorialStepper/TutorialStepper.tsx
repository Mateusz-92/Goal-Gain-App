import React, { useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import Btn from '../../../UI/Btn/Btn';

export type TutorialProps = {
  dataTutorial: {
    description: string;
    src: string;
  }[];
};

const TutorialStepper: React.FC<TutorialProps> = ({ dataTutorial }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % dataTutorial.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + dataTutorial.length) % dataTutorial.length);
  };

  return (
    <Box>
      {dataTutorial[currentIndex].src !== '' && (
        <Flex alignItems='center' height='400px' justifyContent='center'>
          <Image
            alt={dataTutorial[currentIndex].description}
            height='100%'
            objectFit='contain'
            src={dataTutorial[currentIndex].src}
            width='100%'
          />
        </Flex>
      )}
      <Flex alignItems='center' flexDirection='column' mt='20px'>
        <Text fontSize='lg' fontWeight='bold' mb='10px'>
          {dataTutorial[currentIndex].description}
        </Text>

        <Flex justifyContent='center' mt={'5px'} width='100%'>
          {currentIndex > 1 && <Btn text='Wstecz' type='button' onClick={handlePrev} />}

          {currentIndex < dataTutorial.length - 1 && (
            <Btn text='Dalej' type='button' onClick={handleNext} />
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default TutorialStepper;
