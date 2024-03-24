import { Box, Grid } from "@chakra-ui/react";

import { months } from "../../../constants";
import TitleName from "../../../UI/TitleName/TitleName";
import { HabitFormData } from "../HabitsEditor/HabitsEditor";
import HabitForm from "../HabitsForm/HabitsForm";
import MonthAnswersList from "../MonthAnswerList/MonthAnswerList";

const test: HabitFormData = {
  date: new Date("Thu Mar 14 2024 01:00:00 GMT+0100"),
  habits: [
    { id: 1, name: "odpoczywanie" },
    { id: 2, name: "ćwiczenia fizyczne" },
    { id: 3, name: "czytanie książek" },
  ],

  questionTitle: "Co dziś mnie zadowoliło ?",
};
const habitsName = test.habits.map((habit) => habit.name);

const HabitsTracker = () => {
  const monthIndex = test.date.getMonth();
  const monthName = months[monthIndex];

  return (
    <Box>
      <TitleName textAlign="center" title={monthName} />
      <Grid gap={8} mt={10} templateColumns={{ base: "1fr", md: "1fr 2fr" }}>
        <div>
          <TitleName textAlign="start" title={test.questionTitle} />
          <MonthAnswersList />
        </div>
        <HabitForm date={test.date!} habits={habitsName} />
      </Grid>
    </Box>
  );
};

export default HabitsTracker;
