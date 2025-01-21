import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

type DescriptionBoxProps = {
  description: string;
  details?: string;
  header: string;
};
export const DescriptionBox: React.FC<DescriptionBoxProps> = ({ description, details, header }) => {
  return (
    <Box p={4} textAlign='center'>
      <Heading mb={4}>{header}</Heading>
      <Text mb={4}>{description}</Text>
      {details && (
        <Box display='grid' gap={4} gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}>
          {details}
        </Box>
      )}
    </Box>
  );
};
