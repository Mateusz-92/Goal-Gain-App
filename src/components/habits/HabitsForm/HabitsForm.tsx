import React from "react";
import { Checkbox, Table, Tbody, Td, Th, Tr } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import { DayHabit, HabitFormData } from "../HabitsEditor/HabitsEditor";

const HabitsForm: React.FC<HabitFormData> = ({
  date,
  habits,
}: {
  date: Date;
  habits: DayHabit;
}) => {
  // const numZero = 0;
  // const startingIndex = 1;
  function getDayFromDate(dateString: string): string {
    const date = new Date(dateString);
    // eslint-disable-next-line no-magic-numbers
    const day = ("0" + date.getDate()).slice(-2);
    return day;
  }

  const getDaysInMonth = (dateString: string): string[] => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    // eslint-disable-next-line no-magic-numbers
    const lastDay = new Date(year, month + 1, 0).getDate();
    const days: string[] = [];
    // eslint-disable-next-line no-magic-numbers
    for (let i = 2; i <= lastDay + 1; i++) {
      const day = new Date(year, month, i);
      // eslint-disable-next-line no-magic-numbers
      days.push(day.toISOString().split("T")[0]);
    }
    return days;
  };
  const getDaysInMonthAsString = (date: string): string[] => {
    const daysInMonth = getDaysInMonth(date);
    return daysInMonth.map((day) => day.toString());
  };

  const daysInMonthAsString = getDaysInMonthAsString(date.toString());

  function extractHabitsForDate(date: string, allHabits: DayHabit) {
    // eslint-disable-next-line no-console
    console.log("allHabits", allHabits);
    // eslint-disable-next-line no-console
    console.log("Date", date);
    // eslint-disable-next-line no-console
    console.log("allHabits in date", allHabits[date]);
    return allHabits[date as keyof typeof allHabits]?.habits;
  }

  function extractHabitNames(data: DayHabit) {
    const dateKey = Object.keys(data).find((key) => key.includes("-"));

    const habitsArray = data[dateKey as keyof typeof data]?.habits;

    const namesArray = habitsArray.map((habit) => habit.name);

    return namesArray;
  }
  const habitNames = extractHabitNames(habits);

  return (
    <Table variant="simple" width={"40%"}>
      <Tbody>
        <Tr>
          <Th>Dzień</Th>
          {habitNames.map((habit) => (
            <Th key={habit}>{habit}</Th>
          ))}
        </Tr>
        {daysInMonthAsString.map((day) => {
          const extractedHabits = extractHabitsForDate(day, habits);
          return (
            <Tr key={day}>
              <Td>{getDayFromDate(day)}</Td>
              {extractedHabits.map((habit) => {
                return (
                  <Td key={habit.id || uuidv4()}>
                    <Checkbox defaultChecked={habit?.status || false} />
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default HabitsForm;
