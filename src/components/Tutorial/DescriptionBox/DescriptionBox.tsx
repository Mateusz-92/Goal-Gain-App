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
      <Text mb={4} whiteSpace={'pre-line'}>
        {description}
      </Text>
      {details && (
        <Box fontWeight={'bold'} textAlign={'center'}>
          {details}
        </Box>
      )}
    </Box>
  );
};
