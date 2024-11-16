import React, { useState } from 'react';
import { Box, Button, Input, useDisclosure } from '@chakra-ui/react';

import { useAuth } from '../../../context/AuthContext';
import { useAddUserPoints, useEditHabits } from '../../../firebase/mutations';
import ModalApp from '../../Modal/ModalApp';

export type Habit = {
  id: number;
  name: string;
  status: boolean;
};

export type DayHabitIds = {
  id?: string;
  userId?: string;
};

export type DayHabit = {
  [key: string]: {
    habits: Habit[];
  };
} & DayHabitIds;

export type HabitFormData = {
  date: Date;
  habits: DayHabit;
  id?: string;
};

const initialHabitData: HabitFormData = {
  date: new Date(),
  habits: {},
};

const habitsLength: number = 4;

const HabitsEditor = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const [habitData, setHabitData] = useState<HabitFormData>(initialHabitData);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const onAddHabitsMutation = useEditHabits(userId);
  const { mutate: onAddUserPoints } = useAddUserPoints(userId);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHabitData({
      ...habitData,
      date: new Date(e.target.value),
    });
  };

  const addHabitLocal = () => {
    const newHabit = {
      id: Date.now(),
      name: '',
      status: false,
    };

    const currentDateString = habitData.date.toISOString().split('T')[0];

    setHabitData({
      ...habitData,
      habits: {
        ...habitData.habits,
        [currentDateString]: {
          habits: [...(habitData.habits[currentDateString]?.habits || []), newHabit],
        },
      },
    });
  };

  const removeHabitLocal = async (id: number) => {
    const currentDateString = habitData.date.toISOString().split('T')[0];
    const updatedHabits = habitData.habits[currentDateString]?.habits.filter(
      (habit) => habit.id !== id,
    );

    setHabitData({
      ...habitData,
      habits: {
        ...habitData.habits,
        [currentDateString]: {
          habits: updatedHabits || [],
        },
      },
    });
  };

  const addHabitsHandler = async () => {
    onAddHabitsMutation.mutate(habitData);
    onAddUserPoints({ points: 50 });

    onClose();
  };

  const saveData = () => {
    onOpen();
  };

  const currentDateString = habitData.date.toISOString().split('T')[0];
  const habitsForCurrentDate = habitData.habits[currentDateString]?.habits || [];

  return (
    <Box>
      <Input
        placeholder='Data'
        type='date'
        value={habitData.date?.toISOString().split('T')[0] || ''}
        onChange={handleDateChange}
      />

      {habitsForCurrentDate.map((habit) => (
        <div key={habit.id}>
          <Input
            mt={4}
            placeholder={`Wpisz nawyk `}
            value={habit.name}
            width={'70%'}
            onChange={(e) => {
              const updatedHabits = habitsForCurrentDate.map((item) =>
                item.id === habit.id
? { ...item, name: e.target.value }
: item,
              );
              setHabitData({
                ...habitData,
                habits: {
                  ...habitData.habits,
                  [currentDateString]: {
                    habits: updatedHabits,
                  },
                },
              });
            }}
          />
          <Button mt={2} onClick={() => removeHabitLocal(habit.id)}>
            Usuń nawyk
          </Button>
        </div>
      ))}
      {habitsForCurrentDate.length < habitsLength && (
        <Button mt={4} onClick={addHabitLocal}>
          Dodaj nawyk
        </Button>
      )}
      <Button mt={4} onClick={saveData}>
        Zapisz
      </Button>
      <ModalApp
        body={'Potwierdź, aby dodać punkty oraz nawyki do tabeli lub anuluj, aby zmodyfikować dane'}
        cancelText='Anuluj'
        confirmText='Potwierdź'
        header='Gratulacje! Określiłeś swoje nawyki, które chcesz wprowadzić w życie, otrzymujesz 500 punktów'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={addHabitsHandler}
      />
    </Box>
  );
};

export default HabitsEditor;
