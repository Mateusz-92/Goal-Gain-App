import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { months } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { useGetHabits } from '../../../firebase/queries';
import TitleName from '../../../UI/TitleName/TitleName';
import HabitsForm from '../HabitsForm/HabitsForm';

const HabitsTracker = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';

  const { habitListId } = useParams();

  const { data, isError, isLoading } = useGetHabits(userId, habitListId);
  useEffect(() => {}, [userId, data]);

  if (isError) {
    return <p>Cannot get data</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <p>No data available</p>;
  }

  const dateKey = Object.keys(data)[2];

  const monthName = months[new Date(dateKey).getMonth()];
  if (!data) {
    return <p>No habits data available</p>;
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
