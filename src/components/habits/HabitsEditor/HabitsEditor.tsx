import React, { useState } from "react";
import { Box, Button, Input, useDisclosure } from "@chakra-ui/react";

import { useUser } from "../../../context/UserContext";
import { useEditHabits } from "../../../firebase/mutations";
import ModalApp from "../../Modal/ModalApp";

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
  const [habitData, setHabitData] = useState<HabitFormData>(initialHabitData);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { addPoints } = useUser();
  const onAddHabitsMutation = useEditHabits();
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof HabitFormData
  ) => {
    setHabitData({
      ...habitData,
      [field]: e.target.value,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHabitData({
      ...habitData,
      date: new Date(e.target.value),
    });
  };

  const addHabitLocal = () => {
    const newHabit = {
      id: Date.now(),
      name: "",
      status: false,
    };
    // eslint-disable-next-line no-magic-numbers
    const currentDateString = habitData.date.toISOString().split("T")[0];

    setHabitData({
      ...habitData,
      habits: {
        ...habitData.habits,
        [currentDateString]: {
          habits: [
            ...(habitData.habits[currentDateString]?.habits || []),
            newHabit,
          ],
        },
      },
    });
  };

  const removeHabitLocal = async (id: number) => {
    // eslint-disable-next-line no-magic-numbers
    const currentDateString = habitData.date.toISOString().split("T")[0];
    const updatedHabits = habitData.habits[currentDateString]?.habits.filter(
      (habit) => habit.id !== id
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
    // eslint-disable-next-line no-magic-numbers
    addPoints(1000);
    onAddHabitsMutation.mutate(habitData);
    onClose();
  };

  const saveData = () => {
    onOpen();
  };
  // eslint-disable-next-line no-magic-numbers
  const currentDateString = habitData.date.toISOString().split("T")[0];
  const habitsForCurrentDate =
    habitData.habits[currentDateString]?.habits || [];

  return (
    <Box>
      <Input
        placeholder="Data"
        type="date"
        // eslint-disable-next-line no-magic-numbers
        value={habitData.date?.toISOString().split("T")[0] || ""}
        onChange={handleDateChange}
      />
      <Input
        mt={4}
        placeholder="Pytanie miesiąca"
        type="text"
        value={habitData.questionTitle}
        onChange={(e) => handleFormChange(e, "questionTitle")}
      />

      {habitsForCurrentDate.map((habit) => (
        <div key={habit.id}>
          <Input
            mt={4}
            placeholder={`Wpisz nawyk `}
            value={habit.name}
            width={"70%"}
            onChange={(e) => {
              const updatedHabits = habitsForCurrentDate.map((item) =>
                item.id === habit.id
? { ...item, name: e.target.value }
: item
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
        cancelText="Anuluj"
        confirmText="Potwierdź"
        header="Gratulacje! Określiłeś swoje nawyki, które chcesz wprowadzić w życie, otrzymujesz 500 punktów"
        isOpen={isOpen}
        body={
          "Potwierdź, aby dodać punkty oraz nawyki do tabeli lub anuluj, aby zmodyfikować dane"
        }
        onClose={onClose}
        onConfirm={addHabitsHandler}
      />
    </Box>
  );
};

export default HabitsEditor;
