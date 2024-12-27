import { Box, Image,Text } from '@chakra-ui/react';

import homeImg from '../assets/homeImg.jpeg';
export const HomePage = () => {
  return (
    <Box alignItems='center' display='flex' flexDirection='column' justifyContent='center' mt={25}>
      <Text fontSize={['xl', '2xl', '3xl']} fontWeight='bold'>
        Witaj w Goal Gain App !
      </Text>

      <Image
        alt='Description of image'
        boxSize={['200px', '400px', '400px']}
        mb={14}
        src={homeImg}
      />

      <Text fontSize='lg' fontWeight='bold' textAlign='center'>
        Miejsce gdzie możesz zdefiniować swoje cele, nawyki, zadania i oceniać swoje postępy
      </Text>
    </Box>
  );
};
