import { useState } from 'react';
import { Input } from '@chakra-ui/react';

import { useAuth } from '../../../../context/AuthContext';
import { useGetHabitsChartsData } from '../../../../firebase/queries';
import { DataSeries, HabitChart } from '../../HabitChart/HabitChart/HabitChart';

export const HabitChartPages = () => {
  const [isFocused, setIsFocused] = useState(false);

  const { user } = useAuth();
  const userId = user?.uid;
  const [monthAndYear, setMonthAndYear] = useState('2024-07');
  const {
    data: { habitsData, userHabitNames },
    isError,
    isLoading,
  } = useGetHabitsChartsData(monthAndYear, userId || '');

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
            case userHabitNames[0]:
              return userHabitNames[0]
? '1'
: '';
            case userHabitNames[1]:
              return userHabitNames[1]
? '2'
: '';
            case userHabitNames[2]:
              return userHabitNames[2]
? '3'
: '';
            case userHabitNames[3]:
              return userHabitNames[3]
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

  if (isLoading) {
    return <div>isLoading</div>;
  }
  if (isError || !habitsData || !userHabitNames) {
    return <div>isError</div>;
  }
  return (
    <>
      <Input
        bg='white'
        border='2px solid'
        borderRadius='15px'
        height='52px'
        mt='0'
        textAlign='left'
        type='month'
        value={monthAndYear}
        width='100%'
        _focus={{
          borderColor: 'var(--dark-gray)',
        }}
        _focusVisible={{
          outline: 'none',
        }}
        borderColor={isFocused
? 'black'
: 'transparent'}
        fontWeight={isFocused
? 'bold'
: 'normal'}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
      />

      <HabitChart
        key={monthAndYear}
        dataSeries={convertDataToChartData(habitsData, monthAndYear) || []}
        yearAndMonth={monthAndYear}
      />
    </>
  );
};
