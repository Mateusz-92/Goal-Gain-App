import { Box,Heading } from '@chakra-ui/react';

import TitleName from '../../../UI/TitleName/TitleName';
import { Habit } from '../../habits/HabitsEditor/HabitsEditor';
import HabitsForm from '../../habits/HabitsForm/HabitsForm';
import { DUMMY_HABITS_DATA } from '../../Tour/helpers';

const data: { [key: string]: { date?: string, habits: Habit[]; userId?: string; } } =
  DUMMY_HABITS_DATA;
const dateKey = Object.keys(data)[0];

export const TutorialHabitTracker = () => {
  return (
    <>
      <Heading textAlign={'center'}>Nawyki </Heading>

      <Box
        className='step-8-habits-tracker'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        p={10}
      >
        <TitleName textAlign='center' title={'Styczeń'} />
        <HabitsForm date={new Date(dateKey)} habits={data} />
      </Box>
    </>
  );
};
