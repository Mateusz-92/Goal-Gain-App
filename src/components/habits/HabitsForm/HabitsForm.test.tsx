import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import HabitsForm from "./HabitsForm";

describe("Tested correctly showing data:", () => {
  test("Renders correctly with given props", () => {
    // ARRANGE
    const year = 2024;
    const month = 2; // Marzec
    const day = 1;
    const date = new Date(year, month, day);
    const habits = ["Exercise", "Read", "Meditate"];
    const zero = 0;
    const one = 1;

    // ACT
    render(<HabitsForm date={date} habits={habits} />);

    // ASSERT
    // Sprawdzamy, czy istnieją wszystkie komórki dla dni i nawyków
    habits.forEach((habit) => {
      expect(screen.getByText(habit)).toBeInTheDocument();
    });

    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + one,
      zero
    ).getDate();
    const startingDay = 1;
    for (let day = startingDay; day <= daysInMonth; day++) {
      expect(screen.getByText(day)).toBeInTheDocument();
    }
  });

  // Test sprawdzający, czy domyślne ustawienia checkboxów są poprawne
  test("Checkbox default state", () => {
    // ARRANGE
    const year = 2024;
    const month = 2; // Marzec
    const day = 1;
    const date = new Date(year, month, day);
    const habits = ["Exercise", "Read", "Meditate"];

    // ACT
    render(<HabitsForm date={date} habits={habits} />);

    // ASSERT
    // Sprawdzamy, czy wszystkie checkboxy są niezaznaczone
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });
});
