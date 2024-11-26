import { useParams } from 'react-router-dom';
import { Box, Heading, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { lastDayOfMonth, parse } from 'date-fns';

import { useAuth } from '../../../context/AuthContext';
import { useGetCurrentMonthAnswerQuestion } from '../../../firebase/queries';
import Loader from '../../Loader/Loader';

const getDaysInMonth = (monthYear: string): number => {
  const parsedDate = parse(monthYear, 'MM.yyyy', new Date());

  const lastDay = lastDayOfMonth(parsedDate);

  return lastDay.getDate();
};

export const MonthEndedAnswerListDetails = () => {
  const { monthAnswerId } = useParams();
  const { user } = useAuth();
  const userId = user?.uid || '';

  const { data, isError, isLoading } = useGetCurrentMonthAnswerQuestion(userId, monthAnswerId);
  const amountOfDaysInMonth = getDaysInMonth(data?.month || '');

  if (isLoading) {
    return <Loader />;
  }
  if (isError || !data) {
    return <div>Somethig went wrong</div>;
  }

  return (
    <>
      <Heading mb={5} textAlign={'center'}>
        {data.questionTitle}
      </Heading>
      <Table colorScheme='var(--dark-gray)'>
        <Thead>
          <Tr>
            <Th borderBottom='2px solid' borderColor='black' color='black' fontWeight='bold'>
              Data
            </Th>
            <Th borderBottom='2px solid' borderColor='black' color='black' fontWeight='bold'>
              Odpowiedź
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data?.answers.map((el) => (
              <Tr key={el.date} color='var(--dark-gray)'>
                <Td>{el.date}</Td>
                <Td>{el.text}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Box fontWeight={'bold'} mt={10}>
        <Text fontSize={'1.1rem'}>Podsumowanie:</Text>
        <Text>
          Udzieliłeś w tym miesiącu {data.answers.length} odpowiedzi na {amountOfDaysInMonth}
          możliwych dni odpowiedzi
        </Text>
      </Box>
    </>
  );
};
