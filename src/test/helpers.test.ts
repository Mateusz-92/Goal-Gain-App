import { describe, expect, it } from 'vitest';

import { calculateMonthlyChart } from '../components/Charts/PagesCharts/MonthlyRateChartPage/MonthlyRateChartPage';
import { monthRateType } from '../firebase/Api/MonthAndRate';
import {
  calculateMonthlyCrossOutSavings,
  calculateMonthlySavings,
  calculateTotalMonthlySavings,
  convertDataToChartData,
  extractHabitNames,
  extractHabitsForDate,
  getDayFromDate,
  getDaysInMonth,
  getDaysInMonthAsString,
  getLastDaysInMonth,
  isValidDate,
} from '../helpers';
import { ammountBord } from '../types';

const savings = [
  { amount: 100, date: '2025-01-15' },
  { amount: 50, date: '2025-01-20' },
  { amount: 200, date: '2025-02-10' },
];

const savingsCrossOut: ammountBord[][] = [
  [
    { date: '2023-01-15', id: '1', isCrossOut: false, value: 100 },
    { date: '2023-01-20', id: '2', isCrossOut: false, value: 50 },
  ],
  [
    { date: '2023-02-10', id: '3', isCrossOut: false, value: 200 },
    { date: '2023-01-25', id: '4', isCrossOut: false, value: 150 },
  ],
];

const dateArray = [
  '2025-01-01',
  '2025-01-02',
  '2025-01-03',
  '2025-01-04',
  '2025-01-05',
  '2025-01-06',
  '2025-01-07',
  '2025-01-08',
  '2025-01-09',
  '2025-01-10',
  '2025-01-11',
  '2025-01-12',
  '2025-01-13',
  '2025-01-14',
  '2025-01-15',
  '2025-01-16',
  '2025-01-17',
  '2025-01-18',
  '2025-01-19',
  '2025-01-20',
  '2025-01-21',
  '2025-01-22',
  '2025-01-23',
  '2025-01-24',
  '2025-01-25',
  '2025-01-26',
  '2025-01-27',
  '2025-01-28',
  '2025-01-29',
  '2025-01-30',
  '2025-01-31',
];
describe('calculateMonthlySavings tests', () => {
  it('should return an array of 12 number', () => {
    const result = calculateMonthlySavings([]);
    expect(result).toHaveLength(12);
    expect(result).toEqual(new Array(12).fill(0));
  });
  it('should return an array with the sum of savings for each month', () => {
    const result = calculateMonthlySavings(savings);
    expect(result).toHaveLength(12);
    expect(result[0]).toBe(150);
    expect(result[1]).toBe(200);
    expect(result[2]).toBe(0);
  });
});
describe('calculateMonthlyCrossOutSavings', () => {
  it('should calculate monthly cross-out savings correctly', () => {
    const result = calculateMonthlyCrossOutSavings(savingsCrossOut);
    expect(result).toEqual([300, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});
describe('calculateTotalMonthlySavings', () => {
  it('should calculate total monthly savings correctly', () => {
    const rouletteSavings = calculateMonthlySavings(savings);
    const crossOutSavings = calculateMonthlyCrossOutSavings(savingsCrossOut);
    const result = calculateTotalMonthlySavings(rouletteSavings, crossOutSavings);
    expect(result).toEqual([450, 400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});
describe('isValidDate', () => {
  it('should return true if the date is valid', () => {
    const result = isValidDate('2025-01-15');
    expect(result).toBe(true);
  });
  it('should return false if the date is invalid', () => {
    const result = isValidDate('2025-01-32');
    expect(result).toBe(false);
  });
});
describe('getDayFromDate', () => {
  it('should return the day of the date', () => {
    const result = getDayFromDate('2025-01-15');
    expect(result).toBe('15');
  });
});
describe('getDaysInMonth', () => {
  it('should return an array of dates in the month', () => {
    const result = getDaysInMonth('2025-01-15');
    expect(result).toEqual(dateArray);
  });
});
describe('getDaysInMonthAsString', () => {
  it('should return an array of dates in the month as strings', () => {
    const result = getDaysInMonthAsString('2025-01-15');
    expect(result).toEqual(dateArray);
  });
});
describe('extractHabitsForDate', () => {
  it('should return an array of habits for the date', () => {
    const allHabits = {
      '2025-01-15': {
        habits: [
          { id: 1, name: 'habit1', status: false },
          { id: 2, name: 'habit2', status: false },
        ],
      },
      '2025-01-16': { habits: [{ id: 3, name: 'habit3', status: false }] },
    };
    const result = extractHabitsForDate('2025-01-15', allHabits);
    expect(result).toEqual([
      { id: 1, name: 'habit1', status: false },
      { id: 2, name: 'habit2', status: false },
    ]);
  });
});
describe('extractHabitNames', () => {
  it('should return an array of habit names', () => {
    const allHabits = {
      '2025-01-15': {
        habits: [
          { id: 1, name: 'habit1', status: false },
          { id: 2, name: 'habit2', status: false },
        ],
      },
    };
    const result = extractHabitNames(allHabits);
    expect(result).toEqual(['habit1', 'habit2']);
  });
});
describe('getLastDaysInMonth', () => {
  it('should return the last day of the month', () => {
    const result = getLastDaysInMonth('01.2025');
    expect(result).toBe(31);
  });
});
describe('convertDataToChartData', () => {
  it('should convert data to chart data correctly', () => {
    const data = {
      '2023-01-15': {
        habits: [
          { name: 'habit1', status: true },
          { name: 'habit2', status: false },
        ],
      },
      '2023-01-20': {
        habits: [
          { name: 'habit1', status: true },
          { name: 'habit3', status: true },
        ],
      },
      '2023-02-10': {
        habits: [
          { name: 'habit2', status: true },
          { name: 'habit4', status: true },
        ],
      },
    };
    const monthAndYear = '2023-01';
    const userHabitsNames = ['habit1', 'habit2', 'habit3', 'habit4'];

    const result = convertDataToChartData(data, monthAndYear, userHabitsNames);
    expect(result).toEqual([
      ['2023-01-15', '0'],
      ['2023-01-20', '0|2'],
    ]);
  });
});
describe('calculateMonthlyChart', () => {
  it('should calculate monthly chart correctly', () => {
    const scope: monthRateType[] = [
      { date: '2023-01-01', rate: 100 },
      { date: '2023-02-01', rate: 200 },
      { date: '2023-03-01', rate: 300 },
    ];
    const result = calculateMonthlyChart(scope);
    expect(result).toEqual([100, 200, 300, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});
