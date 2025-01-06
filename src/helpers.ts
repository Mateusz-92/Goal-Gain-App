import { getMonth, lastDayOfMonth, parse } from 'date-fns';

import { DataSeries } from './components/Charts/HabitChart/HabitChart/HabitChart';
import { DayHabit } from './components/habits/HabitsEditor/HabitsEditor';
import { ammountBord, Saving } from './types';

export const calculateMonthlySavings = (savings: Saving[]): number[] => {
  const monthlySums: number[] = new Array(12).fill(0);

  savings.forEach((saving) => {
    const month = getMonth(new Date(saving.date));
    monthlySums[month] += saving.amount;
  });

  return monthlySums;
};

export const calculateMonthlyCrossOutSavings = (savings: ammountBord[][]): number[] => {
  const monthlySums: number[] = new Array(12).fill(0); //

  savings.forEach((savingCrossOut) => {
    savingCrossOut.forEach((saving) => {
      if (saving.date) {
        const month = getMonth(new Date(saving.date));
        monthlySums[month] += saving.value;
      }
    });
  });
  return monthlySums;
};

export const calculateTotalMonthlySavings = (
  rouletteSavings: number[],
  crossOutSavings: number[],
): number[] => {
  return rouletteSavings.map((roulette, index) => roulette + crossOutSavings[index]);
};

export const isValidDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};
export function getDayFromDate(dateString: string): string {
  const date = new Date(dateString);
  const day = ('0' + date.getDate()).slice(-2);
  return day;
}

export const getDaysInMonth = (dateString: string): string[] => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const days: string[] = [];
  for (let i = 2; i <= lastDay + 1; i++) {
    const day = new Date(year, month, i);
    days.push(day.toISOString().split('T')[0]);
  }
  return days;
};

export const getDaysInMonthAsString = (date: string): string[] => {
  const daysInMonth = getDaysInMonth(date);
  return daysInMonth.map((day) => day.toString());
};

export function extractHabitsForDate(date: string, allHabits: DayHabit) {
  return allHabits[date as keyof typeof allHabits]?.habits || [];
}

export function extractHabitNames(data: DayHabit) {
  const dateKey = Object.keys(data).find((key) => key.includes('-'));
  const habitsArray = data[dateKey as keyof typeof data]?.habits || [];
  const namesArray = habitsArray.map((habit) => habit.name);
  return namesArray;
}

export const getLastDaysInMonth = (monthYear: string): number => {
  const parsedDate = parse(monthYear, 'MM.yyyy', new Date());

  const lastDay = lastDayOfMonth(parsedDate);

  return lastDay.getDate();
};
export const convertDataToChartData = (
  data: any,
  monthAndYear: string,
  userHabitsNames: string[],
): DataSeries[] => {
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
            return userHabitsNames[0]
? '0'
: '';
          case userHabitsNames[1]:
            return userHabitsNames[1]
? '1'
: '';
          case userHabitsNames[2]:
            return userHabitsNames[2]
? '2'
: '';
          case userHabitsNames[3]:
            return userHabitsNames[3]
? '3'
: '';
          default:
            return '';
        }
      })
      .join('|');

    return [el[0], mappedToValues];
  });
  return dateWithStatuses as DataSeries[];
};
