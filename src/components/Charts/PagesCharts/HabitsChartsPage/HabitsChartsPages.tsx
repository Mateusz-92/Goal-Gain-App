import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { format } from 'date-fns';

import { ROUTES } from '../../../../constants';
import { useAuth } from '../../../../context/AuthContext';
import { useGetUserHabitNamesForMonth } from '../../../../firebase/queries';
import { convertDataToChartData } from '../../../../helpers';
import { DateHabitInput } from '../../../../UI/DateHabitInput/DateHabitInput';
import { Habit } from '../../../habits/HabitsEditor/HabitsEditor';
import Loader from '../../../Loader/Loader';
import { RedirectBox } from '../../../RedirectBox/RedirectBox';
import { colors, HabitChart, pathes } from '../../HabitChart/HabitChart/HabitChart';
import { LegendCalendar } from '../../LegendCalendar/LegendCalendar';

export const HabitChartPages = () => {
  const { userId } = useAuth();
  const [monthAndYear, setMonthAndYear] = useState(() => format(new Date(), 'yyyy-MM'));
  const {
    data: habitsData,
    isError,
    isLoading,
  } = useGetUserHabitNamesForMonth(monthAndYear, userId || '');

  const handleChange = (event: any) => {
    setMonthAndYear(event.target.value);
  };
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Coś poszło nie tak</div>;
  }
  if (!habitsData || Object.keys(habitsData).length === 0) {
    return (
      <RedirectBox
        href={ROUTES.createHabits}
        text='Nie masz utworzonych nawyków w tym miesiącu aby wyświelić wykres'
      />
    );
  }

  const userHabitsObj = Object.entries(habitsData)[0][1] as unknown as { habits: Habit[] };

  const userHabitsNames = userHabitsObj.habits.map((el: Habit) => el.name);

  return (
    <Box
      alignItems={'center'}
      className='step-13-habit-chart'
      display={'flex'}
      flexDirection={'column'}
      justifyItems={'start'}
    >
      <DateHabitInput value={monthAndYear} onChange={handleChange} />

      <HabitChart
        key={monthAndYear}
        dataSeries={convertDataToChartData(habitsData, monthAndYear, userHabitsNames) || []}
        yearAndMonth={monthAndYear}
      />

      <LegendCalendar colors={colors} icons={pathes} names={userHabitsNames} />
    </Box>
  );
};
