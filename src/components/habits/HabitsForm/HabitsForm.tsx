import React from "react";
import { Checkbox, Table, Tbody, Td, Th, Tr } from "@chakra-ui/react";

type HabitFormProps = {
  date: Date;
  habits: string[];
};

const HabitForm: React.FC<HabitFormProps> = ({ date, habits }) => {
  const numZero = 0;
  const dayCheckboxKeyPrefix = "day-checkbox";
  const startingIndex = 1;
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + startingIndex, numZero).getDate();
  };

  const daysInMonth = Array.from(
    { length: getDaysInMonth(date) },
    (_, i) => i + startingIndex
  );

  return (
    <Table variant="simple" width={"40%"}>
      <Tbody>
        <Tr>
          <Th>Dzień</Th>
          {habits.map((habit) => (
            <Th key={habit}>{habit}</Th>
          ))}
        </Tr>
        {daysInMonth.map((day) => (
          <Tr key={day}>
            <Td>{day}</Td>
            {habits.map((habit, index) => (
              <Td
                key={`${day}-${habit}-${dayCheckboxKeyPrefix}-${index + startingIndex}`}
              >
                <Checkbox defaultChecked={false} />
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default HabitForm;
