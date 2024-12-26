import React, { useState } from 'react';
import { Box, Table, Tbody, Td, Th, Tr, useDisclosure } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import { useAuth } from '../../../context/AuthContext';
import { useAddUserPoints, useEditDayHabit } from '../../../firebase/mutations';
import { CustomCheckbox } from '../../../UI/CustomCheckbox/CustomCheckbox';
import ModalApp from '../../Modal/ModalApp';
import { DayHabit, HabitFormData } from '../HabitsEditor/HabitsEditor';

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

  // TODO : date fns
};

const getDaysInMonthAsString = (date: string): string[] => {
  const daysInMonth = getDaysInMonth(date);
  return daysInMonth.map((day) => day.toString());
};

function extractHabitsForDate(date: string, allHabits: DayHabit) {
  return allHabits[date as keyof typeof allHabits]?.habits || [];
}

function extractHabitNames(data: DayHabit) {
  const dateKey = Object.keys(data).find((key) => key.includes('-'));
  const habitsArray = data[dateKey as keyof typeof data]?.habits || [];
  const namesArray = habitsArray.map((habit) => habit.name);
  return namesArray;
}

const HabitsForm: React.FC<HabitFormData> = ({
  date,
  habits,
}: {
  date: Date;
  habits: DayHabit;
}) => {
  const [currentHabits, setCurrentHabits] = useState<DayHabit>(habits);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { mutate: onAddUserPoints } = useAddUserPoints(userId);

  const onDayHabitMutation = useEditDayHabit();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleCheckboxChange = (day: string, habitId: number) => {
    setSelectedDay(day);
    setSelectedHabitId(habitId);
    onOpen();
  };

  const handleStatusChange = async () => {
    if (selectedDay && selectedHabitId !== null) {
      setCurrentHabits((prevHabits) => {
        const dayHabits = prevHabits[selectedDay]?.habits || [];
        const updatedHabits = dayHabits.map((habit) =>
          habit.id === selectedHabitId
? { ...habit, status: !habit.status }
: habit,
        );

        const newState = {
          ...prevHabits,
          [selectedDay]: { habits: updatedHabits },
        };

        return newState;
      });

      const updatedHabit = currentHabits[selectedDay]?.habits.find(
        (habit) => habit.id === selectedHabitId,
      );

      if (updatedHabit) {
        const data = {
          date: selectedDay,
          habitId: selectedHabitId,
          id: currentHabits.id || ' ',
          newStatus: !updatedHabit.status,
        };

        data.newStatus
? onAddUserPoints({ points: 2 })
: onAddUserPoints({ points: -2 });
        try {
          await onDayHabitMutation.mutate(data);
          // eslint-disable-next-line no-console
          console.log(
            `Successfully updated habit with ID ${selectedHabitId} for ${selectedDay}. New status: ${!updatedHabit.status}`,
          );
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    }
    onClose();
  };

  const daysInMonthAsString = getDaysInMonthAsString(date.toISOString().split('T')[0]);

  const habitNames = extractHabitNames(currentHabits);
  return (
    <Box overflowX='auto'>
      <Table colorScheme='var(--dark-gray)' width={'100%'}>
        <Tbody>
          <Tr>
            <Th color='var(--dark-gray)' textAlign='left'>
              Dzień
            </Th>
            {habitNames.map((habit) => (
              <Th key={habit} color='var(--dark-gray)' textAlign='center'>
                {habit}
              </Th>
            ))}
          </Tr>
          {daysInMonthAsString.map((day) => {
            const extractedHabits = extractHabitsForDate(day, currentHabits);
            return (
              <Tr key={day}>
                <Td textAlign='left'>{getDayFromDate(day)}</Td>
                {extractedHabits.map((habit) => (
                  <Td key={habit.id || uuidv4()} color='var(--dark-gray)' textAlign='center'>
                    <CustomCheckbox
                      isChecked={habit.status}
                      onChange={() => handleCheckboxChange(day, habit.id)}
                    />
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <ModalApp
        body={`Potwierdź, aby zmienić status nawyku`}
        cancelText='Anuluj'
        confirmText='Tak'
        header='Czy chcesz zmienić status?'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleStatusChange}
      />
    </Box>
  );
};

export default HabitsForm;
