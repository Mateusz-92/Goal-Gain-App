import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { format } from 'date-fns';

import { useAuth } from '../../../../context/AuthContext';
import { useGetUserHabitNamesForMonth } from '../../../../firebase/queries';
import { DateHabitInput } from '../../../../UI/DateHabitInput/DateHabitInput';
import {  Habit } from '../../../habits/HabitsEditor/HabitsEditor';
import Loader from '../../../Loader/Loader';
import { colors, DataSeries, HabitChart, pathes } from '../../HabitChart/HabitChart/HabitChart';
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

  //TODO: move to helpers, write tests for it!

  const convertDataToChartData = (data: any, monthAndYear: string): DataSeries[] => {
    const onlyFromSelectedMonth = Object.entries(data).filter(([key]) => {
      const splitted = key.split('-');
      const yearMonth = splitted[0] + '-' + splitted[1];
      return yearMonth === monthAndYear;
    });

    const dateWithStatuses = onlyFromSelectedMonth.map((el: any) => {
      const onlyMarkedHabits = el[1].habits.filter((habit: any) => habit.status === true);
      const mappedToValues = onlyMarkedHabits
        .map((el: any) => {
          switch (el.name) {
            case userHabitsNames[0]:
              return userHabitsNames[0] ? '0' : '';
            case userHabitsNames[1]:
              return userHabitsNames[1] ? '1' : '';
            case userHabitsNames[2]:
              return userHabitsNames[2] ? '2' : '';
            case userHabitsNames[3]:
              return userHabitsNames[3] ? '3' : '';
            default:
              return '';
          }
        })
        .join('|');

      return [el[0], mappedToValues];
    });
    return dateWithStatuses as DataSeries[];
  };

  return (
    <Box m={5}>
      <DateHabitInput value={monthAndYear} onChange={handleChange} />

      <HabitChart
        key={monthAndYear}
        dataSeries={convertDataToChartData(habitsData, monthAndYear) || []}
        yearAndMonth={monthAndYear}
      />

      <LegendCalendar colors={colors} icons={pathes} names={userHabitsNames} />
    </Box>
  );
};
