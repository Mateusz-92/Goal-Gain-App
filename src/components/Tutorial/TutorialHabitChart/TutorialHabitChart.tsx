import { Box } from '@chakra-ui/react';

import { dummyHabitChartPageDataSeries } from '../../../constants';
import { convertDataToChartData } from '../../../helpers';
import { colors, HabitChart, pathes } from '../../Charts/HabitChart/HabitChart/HabitChart';
import { LegendCalendar } from '../../Charts/LegendCalendar/LegendCalendar';
import { Habit } from '../../habits/HabitsEditor/HabitsEditor';

export const TutorialHabitChart = () => {
  const monthAndYear = '2025-01';
  const userHabitsObj = Object.entries(dummyHabitChartPageDataSeries)[3][1] as unknown as {
    habits: Habit[];
  };
  const userHabitsNames = userHabitsObj.habits.map((el: Habit) => el.name);

  return (
    <Box
      alignItems={'center'}
      className='step-13-habit-chart'
      display={'flex'}
      flexDirection={'column'}
      justifyItems={'start'}
    >
      <HabitChart
        key={monthAndYear}
        yearAndMonth={monthAndYear}
        dataSeries={
          convertDataToChartData(dummyHabitChartPageDataSeries, monthAndYear, userHabitsNames) || []
        }
      />
      <LegendCalendar colors={colors} icons={pathes} names={userHabitsNames} />
    </Box>
  );
};
