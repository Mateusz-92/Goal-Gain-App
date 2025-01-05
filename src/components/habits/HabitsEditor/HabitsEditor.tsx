import React, { useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { Box, Input, useDisclosure } from '@chakra-ui/react';

import { useAuth } from '../../../context/AuthContext';
import { useAddUserPoints, useEditHabits } from '../../../firebase/mutations';
import Btn from '../../../UI/Btn/Btn';
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
  const [formChanged, setFormChanged] = useState(false);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      formChanged && currentLocation.pathname !== nextLocation.pathname,
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);

 
    if (newDate.getTime() !== habitData.date.getTime()) {
      setHabitData({
        ...habitData,
        date: newDate,
      });
    }
    setFormChanged(true);
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
    setFormChanged(true);
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
    setFormChanged(true);
  };

  const addHabitsHandler = async () => {
    onAddHabitsMutation.mutate(habitData);
    onAddUserPoints({ points: 50 });

    onClose();
    setFormChanged(false);
  };

  const saveData = () => {
    onOpen();
  };

  const currentDateString = habitData.date.toISOString().split('T')[0];
  const habitsForCurrentDate = habitData.habits[currentDateString]?.habits || [];

  return (
    <Box>
      <Input
        bg='white'
        border='2px solid'
        borderColor={'transparent'}
        borderRadius='15px'
        height='52px'
        mb='3'
        textAlign='left'
        type='date'
        value={habitData.date?.toISOString().split('T')[0] || ''}
        width='100%'
        _disabled={{
          _hover: {
            bg: 'white',
            borderColor: 'black',
            cursor: 'not-allowed',
            fontWeight: 'bold',
          },
        }}
        _focus={{
          borderColor: 'var(--dark-gray)',
        }}
        _focusVisible={{
          outline: 'none',
        }}
        onChange={handleDateChange}
      />

      {habitsForCurrentDate.map((habit) => (
        <div key={habit.id}>
          <Input
            bg='white'
            border='2px solid'
            borderColor={'transparent'}
            borderRadius='15px'
            height='52px'
            mb='2'
            mr={2}
            placeholder={`Wpisz nawyk `}
            textAlign='left'
            type='text'
            value={habit.name}
            width={'70%'}
            _disabled={{
              _hover: {
                bg: 'white',
                borderColor: 'black',
                cursor: 'not-allowed',
                fontWeight: 'bold',
              },
            }}
            _focus={{
              borderColor: 'var(--dark-gray)',
            }}
            _focusVisible={{
              outline: 'none',
            }}
            onChange={(e) => {
              const updatedHabits = habitsForCurrentDate.map((item) =>
                item.id === habit.id ? { ...item, name: e.target.value } : item,
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
          <Btn text='  Usuń nawyk' type='button' onClick={() => removeHabitLocal(habit.id)} />
        </div>
      ))}
      {habitsForCurrentDate.length < habitsLength && (
        <Btn text='Dodaj nawyk' type='button' onClick={addHabitLocal} />
      )}
      <Btn text='Zapisz ' type='button' onClick={saveData} />
      <ModalApp
        body={'Potwierdź, aby dodać punkty oraz nawyki do tabeli lub anuluj, aby zmodyfikować dane'}
        cancelText='Anuluj'
        confirmText='Potwierdź'
        header='Gratulacje! Określiłeś swoje nawyki, które chcesz wprowadzić w życie, otrzymujesz 500 punktów'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={addHabitsHandler}
      />
      {blocker.state === 'blocked' ? (
        <ModalApp
          body={`Masz nie zapisane dane.`}
          cancelText='Nie'
          confirmText='Tak'
          header=' Czy na pewno chcesz wyjść?'
          isOpen={blocker.state === 'blocked'}
          onClose={() => blocker.reset()}
          onConfirm={() => blocker.proceed()}
        />
      ) : null}
    </Box>
  );
};

export default HabitsEditor;
