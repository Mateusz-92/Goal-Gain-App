import { useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
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
  const { userId } = useAuth();
  const [monthAndYear, setMonthAndYear] = useState(() => format(new Date(), 'yyyy-MM'));
  const emptyDataSeries: [string, string][] = [];
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
      <div>
        <Heading mb={15} textAlign={'center'}>
          Wykres - wykonane nawyki
        </Heading>
        <DateHabitInput value={monthAndYear} onChange={handleChange} />
        <Box
          alignItems={'center'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          mt={'50px'}
        >
          <HabitChart key={monthAndYear} dataSeries={emptyDataSeries} yearAndMonth={monthAndYear} />
          <Text mt={'50px'} textAlign={'center'}>
            Nie masz danych o nawykach w tym miesiącu.
          </Text>
        </Box>
      </div>
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
