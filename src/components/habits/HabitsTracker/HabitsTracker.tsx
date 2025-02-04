import { Box, Heading } from '@chakra-ui/react';
import { isSameMonth } from 'date-fns';

import { months, ROUTES } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { useGetHabits } from '../../../firebase/queries';
import TitleName from '../../../UI/TitleName/TitleName';
import Loader from '../../Loader/Loader';
import { RedirectBox } from '../../RedirectBox/RedirectBox';
import HabitsForm from '../HabitsForm/HabitsForm';

const HabitsTracker = () => {
  const { userId } = useAuth();

  const { data, isError, isLoading } = useGetHabits(userId);

  if (isError) {
    return <p>coś poszło nie tak</p>;
  }
  if (isLoading) {
    return <Loader />;
  }
  const dateKey = data
? Object.keys(data)[0]
: '';
  const isCurrentMonth = dateKey
? isSameMonth(new Date(dateKey), new Date())
: false;

  if (!data || Object.keys(data).length === 0 || !isCurrentMonth) {
    return (
      <Box fontSize={18} textAlign={'center'}>
        <RedirectBox
          href={ROUTES.createHabits}
          text='Nie masz jeszcze utworzonych nawyków, przejdź do kreatora nawyków aby je utworzyć'
        />
      </Box>
    );
  }
  const monthName = months[new Date(dateKey).getMonth()];
  if (!data) {
    return <p>dane są niedostępne</p>;
  }

  return (
    <>
      <Heading textAlign={'center'}>Nawyki </Heading>

      <Box display='flex' flexDirection='column' justifyContent='center' p={10}>
        <TitleName textAlign='center' title={monthName} />
        <HabitsForm date={new Date(dateKey)} habits={data} />
      </Box>
    </>
  );
};
export default HabitsTracker;
