import { Link } from 'react-router-dom';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { getDay } from 'date-fns';

import { useAuth } from '../../../context/AuthContext';
import { useGetDayPlan } from '../../../firebase/queries';
import { ROUTES } from '../../../routes';
export const allWekkDaysName = [
  'Niedziela',
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
];
export const DaylyGoal = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetDayPlan(userId);
  if (isLoading) return <Text>Loading...</Text>;
  if (isError || !data) return <Text>Error...</Text>;
  if (data.length < 1) {
    return (
      <Box
        alignItems='center'
        borderColor='teal'
        borderRadius='md'
        borderWidth='1px'
        display='flex'
        fontSize='22px'
        height='300px'
        justifyContent='center'
        padding='4'
        width='300px'
      >
        <Flex alignItems='center' direction='column'>
          <Text>Nie masz zaplanowanego tygodnia</Text>
          <Button as={Link} colorScheme='teal' marginTop='15px' to={ROUTES.weekPlanner}>
            Zaplanuj
          </Button>
        </Flex>
      </Box>
    );
  }
  return (
    <Box
      alignItems='center'
      bg='white'
      borderColor='teal'
      borderRadius='md'
      borderWidth='1px'
      boxShadow='md'
      color='black'
      display='flex'
      fontFamily="'Roboto', sans-serif"
      fontSize='27px'
      height='400px'
      justifyContent='center'
      padding='4'
      width='400px'
    >
      <Flex alignItems='center' direction='column'>
        <Text>
          Dziś jest {allWekkDaysName[getDay(data[0].date || '')]} {data[0].date}{' '}
        </Text>
        {data[0].plan
? (
          <Text>Twoje plany na dziś: {data[0].plan} </Text>
        )
: (
          <Text>Nie masz zaplanowanych zadań na dziś</Text>
        )}
      </Flex>
    </Box>
  );
};
