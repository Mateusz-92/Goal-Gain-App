import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Link } from '@chakra-ui/react';
import { isSameMonth } from 'date-fns';

import { months } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { useGetHabits } from '../../../firebase/queries';
import TitleName from '../../../UI/TitleName/TitleName';
import Loader from '../../Loader/Loader';
import HabitsForm from '../HabitsForm/HabitsForm';

const HabitsTracker = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';

  const { habitListId } = useParams();
  const { data, isError, isLoading } = useGetHabits(userId, habitListId);
  useEffect(() => {}, [userId, data]);

  if (isError) {
    return <p>Somethig went wrong</p>;
  }
  if (isLoading) {
    return <Loader />;
  }

  if (!data || Object.keys(data).length === 0) {
    return <p>No data available</p>;
  }

  const dateKey = Object.keys(data)[2];
  const isCurrentMonth = isSameMonth(new Date(dateKey), new Date());

  const monthName = months[new Date(dateKey).getMonth()];
  if (!data) {
    return <p>No habits data available</p>;
  }
  if (!habitListId && !isCurrentMonth) {
    return (
      <Box fontSize={18} textAlign={'center'}>
        <Link href='/createHabits' mt={25} variant={'underline'}>
          Nie masz utworzonych nawyków, przejdz do kreatora
        </Link>
      </Box>
    );
  }
  return (
    <>
      <Box display='flex' flexDirection='column' justifyContent='center' p={10}>
        <TitleName textAlign='center' title={monthName} />
        <HabitsForm date={new Date(dateKey)} habits={data} />
      </Box>
    </>
  );
};
export default HabitsTracker;
