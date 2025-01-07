import React, { useState } from 'react';
import { Box, Table, Tbody, Td, Th, Tr, useDisclosure } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import { useAuth } from '../../../context/AuthContext';
import { useAddUserPoints, useEditDayHabit } from '../../../firebase/mutations';
import {
  extractHabitNames,
  extractHabitsForDate,
  getDayFromDate,
  getDaysInMonthAsString,
} from '../../../helpers';
import { CustomCheckbox } from '../../../UI/Forms/CustomCheckbox/CustomCheckbox';
import ModalApp from '../../Modal/ModalApp';
import { DayHabit, HabitFormData } from '../HabitsEditor/HabitsEditor';

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
  const { userId } = useAuth();
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
