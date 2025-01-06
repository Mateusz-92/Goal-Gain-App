import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { format } from 'date-fns';

import { useAuth } from '../../../../context/AuthContext';
import { useGetUserHabitNamesForMonth } from '../../../../firebase/queries';
import { convertDataToChartData } from '../../../../helpers';
import { DateHabitInput } from '../../../../UI/DateHabitInput/DateHabitInput';
import { Habit } from '../../../habits/HabitsEditor/HabitsEditor';
import Loader from '../../../Loader/Loader';
import { colors, HabitChart, pathes } from '../../HabitChart/HabitChart/HabitChart';
import { LegendCalendar } from '../../LegendCalendar/LegendCalendar';

export const HabitChartPages = () => {
  const { user } = useAuth();
  const userId = user?.uid;
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
  if (isError || !habitsData) {
    return <div>Something went wrong</div>;
  }
  if (!habitsData || Object.keys(habitsData).length === 0) {
    return (
      <div>
        <DateHabitInput value={monthAndYear} onChange={handleChange} />
        <Text mt={'50px'} textAlign={'center'}>
          Nie masz danych o nawykach w tym miesiącu.
        </Text>
      </div>
    );
  }
  const userHabitsObj = Object.entries(habitsData)[0][1] as unknown as { habits: Habit[] };

  const userHabitsNames = userHabitsObj.habits.map((el: Habit) => el.name);


  return (
    <Box m={5}>
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
