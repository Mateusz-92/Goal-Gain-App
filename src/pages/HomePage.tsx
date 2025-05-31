import { Box, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import homeImg from '../assets/homeImg.jpeg';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionImage = motion(Image);

export const HomePage = () => {
  const mainColor = 'black';
  const shadow = useColorModeValue('0 4px 30px rgba(0,0,0,0.15)', '0 4px 30px rgba(0,0,0,0.45)');

  return (
    <MotionBox
      alignItems='center'
      animate={{ opacity: 1, y: 0 }}
      display='flex'
      flexDirection='column'
      initial={{ opacity: 0, y: 40 }}
      justifyContent='center'
      minH='80vh'
      mt={25}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <MotionText
        animate={{ opacity: 1, scale: 1 }}
        color={mainColor}
        fontSize={['3xl', '4xl', '6xl']}
        fontWeight='extrabold'
        initial={{ opacity: 0, scale: 0.8 }}
        letterSpacing='tight'
        lineHeight={1.1}
        textAlign='center'
        textShadow='0 2px 20px rgba(0,0,0,0.15)'
        transition={{ delay: 0.2, duration: 0.9, stiffness: 120, type: 'spring' }}
      >
        Witaj w Goal Gain App!
      </MotionText>

      <MotionImage
        alt='Opis obrazka'
        animate={{ opacity: 1, scale: 1, y: 0 }}
        borderRadius='2xl'
        boxShadow={`0 8px 32px 0 rgba(31, 38, 135, 0.37), ${shadow}`}
        boxSize={['220px', '420px', '420px']}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        mb={14}
        src={homeImg}
        transition={{ delay: 0.5, duration: 0.8, stiffness: 120, type: 'spring' }}
        whileHover={{ rotate: 2, scale: 1.04 }}
      />

      <MotionText
        animate={{ opacity: 1, y: 0 }}
        color={mainColor}
        fontSize={['lg', '2xl', '3xl']}
        fontWeight='bold'
        initial={{ opacity: 0, y: 30 }}
        mt={4}
        px={[2, 4, 8]}
        textAlign='center'
        textShadow='0 2px 10px rgba(0,0,0,0.10)'
        transition={{ delay: 0.7, duration: 1, stiffness: 100, type: 'spring' }}
      >
        Miejsce, gdzie możesz zdefiniować swoje cele, nawyki, zadania i oceniać swoje postępy
        <br />
      </MotionText>
    </MotionBox>
  );
};
