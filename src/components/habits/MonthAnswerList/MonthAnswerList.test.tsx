import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import MonthAnswersList from './MonthAnswerList';

describe('Testing the display of the response list:', () => {
  test('Checking whether the response list is rendered correctly for an empty list', () => {
    render(<MonthAnswersList />);
    const toBeLength = 0;
    const listElement = screen.getByRole('list');
    const answerItems = screen.queryAllByRole('listitem');

    expect(listElement).toBeInTheDocument();
    expect(answerItems.length).toBe(toBeLength);
  });

  test('Checking whether adding answers to the list works correctly', async () => {
    render(<MonthAnswersList />);

    const inputElement = screen.getByPlaceholderText('Enter your answer');
    const addButton = screen.getByRole('button', { name: 'Add Answer' });

    fireEvent.change(inputElement, { target: { value: 'New answer' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      const answerItem = screen.queryByText(/New answer/);
      expect(answerItem).toBeInTheDocument();
    });
  });
});
