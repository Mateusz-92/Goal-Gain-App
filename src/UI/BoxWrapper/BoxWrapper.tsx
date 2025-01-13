import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface BoxWrapperProps extends BoxProps {
  children: React.ReactNode;
}

export const BoxWrapper: React.FC<BoxWrapperProps> = ({ children, ...props }) => {
  return (
    <Box
      bgColor='var(--yellow)'
      borderRadius='md'
      boxShadow='md'
      mb={5}
      p={4}
      pointerEvents={'none'}
      userSelect={'none'}
      width='80%'
      {...props}
    >
      {children}
    </Box>
  );
};
