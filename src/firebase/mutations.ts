import { useMutation, useQueryClient } from "@tanstack/react-query";

import { HabitFormData } from "../components/habits/HabitsEditor/HabitsEditor";
import {
  GoalFormValuesSchema,
  MonthlyValuesRatingSchema,
  WeekPlannerData,
} from "../validators/validators";

import { addGoals, addHabits, addMonthlyEvaluation, addWeekPlan } from "./Api";
import { QUERY_KEYS } from "./queries";

export const useEditHabits = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: HabitFormData) => {
      return await addHabits(value.habits, value.date);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.habits] });
    },
  });
};

export const useEditGoals = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: GoalFormValuesSchema) => {
      return await addGoals(value, id);
    },

    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.goals] });
    },
  });
};

export const useEditMonthRate = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: MonthlyValuesRatingSchema) => {
      return await addMonthlyEvaluation(value, id);
    },

    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.monthRate] });
    },
  });
};
export const useEditWeekPlan = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: WeekPlannerData) => {
      return await addWeekPlan(value, id);
    },

    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.weekPlan] });
    },
  });
};
