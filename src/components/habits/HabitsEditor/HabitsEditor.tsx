import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";

export type HabitFormData = {
  date: Date;
  habits: { id: number; name: string }[]; 
  questionTitle: string;
};

const initialHabitData: HabitFormData = {
  date: new Date("Thu Mar 14 2024 01:00:00 GMT+0100"),
  habits: [],
  questionTitle: "",
};

const HabitsEditor = () => {
  const [habitData, setHabitData] = useState<HabitFormData>(initialHabitData);
  const indexZero = 0;

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

  const addHabit = () => {
    const newHabit = {
      id: Date.now(), // here will be uuid generator
      name: "",
    };
    setHabitData({
      ...habitData,
      habits: [...habitData.habits, newHabit],
    });
  };

  const removeHabit = (id: number) => {
   
    const updatedHabits = habitData.habits.filter((habit) => habit.id !== id);
    setHabitData({
      ...habitData,
      habits: updatedHabits,
    });
  };

  const saveData = () => {
    // Zapis do serwera, ale tu będzie Formik
  };

  return (
    <Box>
      <Input
        placeholder="Data"
        type="date"
        value={habitData.date?.toISOString().split("T")[indexZero] || ""}
        onChange={handleDateChange}
      />
      <Input
        mt={4}
        placeholder="Pytanie miesiąca"
        type="text"
        value={habitData.questionTitle}
        onChange={(e) => handleFormChange(e, "questionTitle")}
      />

      {habitData.habits.map((habit) => (
        <div key={habit.id}>
          <Input
            mt={4}
            placeholder={`Wpisz nawyk `}
            value={habit.name}
            width={"70%"}
            onChange={(e) => {
              const updatedHabits = habitData.habits.map((item) =>
                item.id === habit.id
? { ...item, name: e.target.value }
: item
              );
              setHabitData({
                ...habitData,
                habits: updatedHabits,
              });
            }}
          />
          <Button mt={2} onClick={() => removeHabit(habit.id)}>
            Usuń nawyk
          </Button>
        </div>
      ))}
      <Button mt={4} onClick={addHabit}>
        Dodaj nawyk
      </Button>
      <Button mt={4} onClick={saveData}>
        Zapisz
      </Button>
    </Box>
  );
};

export default HabitsEditor;
