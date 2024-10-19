import { useState } from 'react';
import { Input } from '@chakra-ui/react';

import { useAuth } from '../../../../context/AuthContext';
import {
  useGetHabitsForMonthChart,
  useGetUserHabitNamesForMonth,
} from '../../../../firebase/queries';
import { DataSeries, HabitChart } from '../../HabitChart/HabitChart/HabitChart';

export const HabitChartPages = () => {
  const { user } = useAuth();
  const userId = user?.uid;
  const { data: habitsData, isError, isLoading } = useGetHabitsForMonthChart(userId || '');

  const [monthAndYear, setMonthAndYear] = useState('2024-07');

  const {
    data: userHabitPerMonth,
    isError: isError2,
    isLoading: isLoading2,
  } = useGetUserHabitNamesForMonth(monthAndYear, userId || '');

  //TODO: add type
  //      add legend

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
            case userHabitPerMonth[0]:
              return userHabitPerMonth[0]
? '1'
: '';
            case userHabitPerMonth[1]:
              return userHabitPerMonth[1]
? '2'
: '';
            case userHabitPerMonth[2]:
              return userHabitPerMonth[2]
? '3'
: '';
            case userHabitPerMonth[3]:
              return userHabitPerMonth[3]
? '4'
: '';
            default:
              return '';
          }
        })
        .join('|');

      return [el[0], mappedToValues];
    });
    return dateWithStatuses;
  };

  const handleChange = (event: any) => setMonthAndYear(event.target.value);

  if (isLoading || isLoading2) {
    return <div>isLoading</div>;
  }
  if (isError || isError2 || !habitsData || !userHabitPerMonth) {
    return <div>isError</div>;
  }
  return (
    <>
      <Input type='month' value={monthAndYear} onChange={handleChange} />
      <HabitChart
        key={monthAndYear}
        dataSeries={convertDataToChartData(habitsData, monthAndYear) || []}
        yearAndMonth={monthAndYear}
      />
    </>
  );
};
