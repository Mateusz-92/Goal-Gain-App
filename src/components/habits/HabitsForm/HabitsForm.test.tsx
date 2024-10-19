import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import HabitsForm from './HabitsForm';

describe('Tested correctly showing data:', () => {
  test('Renders correctly with given props', () => {
    // ARRANGE
    const year = 2024;
    const month = 2;
    const day = 1;
    const date = new Date(year, month, day);
    const habits = ['Exercise', 'Read', 'Meditate'];
    const zero = 0;
    const one = 1;

    // ACT
    render(<HabitsForm date={date} habits={habits} />);

    // ASSERT

    habits.forEach((habit) => {
      expect(screen.getByText(habit)).toBeInTheDocument();
    });

    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + one, zero).getDate();
    const startingDay = 1;
    for (let day = startingDay; day <= daysInMonth; day++) {
      expect(screen.getByText(day)).toBeInTheDocument();
    }
  });

  test('Checkbox default state', () => {
    // ARRANGE
    const year = 2024;
    const month = 2;
    const day = 1;
    const date = new Date(year, month, day);
    const habits = ['Exercise', 'Read', 'Meditate'];

    render(<HabitsForm date={date} habits={habits} />);

    // ASSERT

    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });
});
