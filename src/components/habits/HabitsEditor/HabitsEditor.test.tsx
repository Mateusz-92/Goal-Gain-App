import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import HabitsEditor from './HabitsEditor';

const lengthOne = 1;
const lengthZero = 0;

describe('HabitsEditor component tests', () => {
  test('Should render properly with initial data', async () => {
    // ARRANGE
    render(<HabitsEditor />);

    // ASSERT
    const dateInput = screen.getByPlaceholderText('Data') as HTMLInputElement;
    const questionInput = screen.getByPlaceholderText('Pytanie miesiąca') as HTMLInputElement;

    expect(dateInput).toBeDefined();
    expect(questionInput).toBeDefined();
    expect(dateInput.value).toBe('2024-03-14');
    expect(questionInput.value).toBe('');
  });

  test('Should add a habit', async () => {
    // ARRANGE
    render(<HabitsEditor />);
    const addButton = screen.getByText('Dodaj nawyk');

    // ACT
    fireEvent.click(addButton);

    // ASSERT
    const habitInputs = screen.getAllByPlaceholderText('Wpisz nawyk') as HTMLInputElement[];
    expect(habitInputs.length).toBe(lengthOne);
    expect(habitInputs[lengthZero].value).toBe('');
  });

  test('Should update the date', async () => {
    // ARRANGE
    render(<HabitsEditor />);
    const dateInput = screen.getByPlaceholderText('Data') as HTMLInputElement;
    const newDate = '2024-03-15';

    // ACT
    fireEvent.change(dateInput, { target: { value: newDate } });

    // ASSERT
    expect(dateInput.value).toBe(newDate);
  });

  test('Should update the question title', async () => {
    // ARRANGE
    render(<HabitsEditor />);
    const questionInput = screen.getByPlaceholderText('Pytanie miesiąca') as HTMLInputElement;
    const newQuestion = 'Nowe pytanie';

    // ACT
    fireEvent.change(questionInput, { target: { value: newQuestion } });

    // ASSERT
    expect(questionInput.value).toBe(newQuestion);
  });

  test('Should update a habit name', async () => {
    // ARRANGE
    render(<HabitsEditor />);
    const addButton = screen.getByText('Dodaj nawyk');
    fireEvent.click(addButton);

    // ACT
    const habitInput = (await screen.findByPlaceholderText('Wpisz nawyk')) as HTMLInputElement;
    const newHabitName = 'Nowy nawyk';
    fireEvent.change(habitInput, { target: { value: newHabitName } });

    // ASSERT
    expect(habitInput.value).toBe(newHabitName);
  });
});
