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
      display='flex'
      flexDirection='column'
      justifyContent='center'
      mt={25}
      minH='80vh'
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <MotionText
        fontSize={['3xl', '4xl', '6xl']}
        fontWeight='extrabold'
        letterSpacing='tight'
        lineHeight={1.1}
        textAlign='center'
        color={mainColor}
        textShadow='0 2px 20px rgba(0,0,0,0.15)'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, type: 'spring', stiffness: 120 }}
      >
        Witaj w Goal Gain App!
      </MotionText>

      <MotionImage
        alt='Opis obrazka'
        boxSize={['220px', '420px', '420px']}
        mb={14}
        src={homeImg}
        borderRadius='2xl'
        boxShadow={`0 8px 32px 0 rgba(31, 38, 135, 0.37), ${shadow}`}
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={{ scale: 1.04, rotate: 2 }}
        transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 120 }}
      />

      <MotionText
        fontSize={['lg', '2xl', '3xl']}
        fontWeight='bold'
        textAlign='center'
        color={mainColor}
        mt={4}
        px={[2, 4, 8]}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, type: 'spring', stiffness: 100 }}
        textShadow='0 2px 10px rgba(0,0,0,0.10)'
      >
        Miejsce, gdzie możesz zdefiniować swoje cele, nawyki, zadania i oceniać swoje postępy
        <br />
      </MotionText>
    </MotionBox>
  );
};
