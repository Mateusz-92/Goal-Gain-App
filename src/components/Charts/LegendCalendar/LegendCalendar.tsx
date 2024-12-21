import { Box, Flex, Heading, Text } from '@chakra-ui/react';

type LegendProps = {
  colors: string[];
  icons: string[];
  names: string[];
};

export const LegendCalendar = ({ colors, icons, names }: LegendProps) => {
  return (
    <Box display='flex' flexDirection='column' gap='10px'>
      <Heading fontSize={'small'} textDecorationLine={'underline'}>
        Legenda
      </Heading>

      {names.map((name, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Flex key={index} align='center'>
          <Box
            as='svg'
            fill={colors[index]}
            height='20px'
            marginRight='10px'
            viewBox='0 0 1024 1024'
            width='20px'
          >
            <path d={icons[index]} />
          </Box>
          <Text color={colors[index]} fontSize='14px'>
            {name}
          </Text>
        </Flex>
      ))}
    </Box>
  );
};
