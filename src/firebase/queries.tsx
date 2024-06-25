import { useQuery } from "@tanstack/react-query";

import { HabitFormData } from "../components/habits/HabitsEditor/HabitsEditor";
import {
  MonthlyValuesRatingSchema,
  SingleGoalValuesSchema,
  WeekPlannerData,
} from "../validators/validators";

import {
  fetchGoalsData,
  fetchLatestHabitForMonth,
  FetchMonthlyEvaluation,
  fetchWeekData,
} from "./Api";

export const QUERY_KEYS = {
  goals: "goals",
  habits: "habits",
  monthEvaulation: "mothEvaulation",
  monthRate: "monthRate",
  weekPlan: "weekPlan",
};
export const useGeHabits = () => {
  return useQuery<HabitFormData | null>({
    queryFn: async () => {
      return fetchLatestHabitForMonth();
    },
    queryKey: [QUERY_KEYS.habits],

    // enabled: !!clientId,
  });
};
export const useGetGoals = (goalId: string) => {
  return useQuery<SingleGoalValuesSchema[] | null>({
    enabled: !!goalId,
    queryFn: async () => {
      return fetchGoalsData(goalId);
    },
    queryKey: [QUERY_KEYS.goals, goalId],
  });
};

export const useGetWeekPlan = (weekId: string) => {
  return useQuery<WeekPlannerData | null>({
    enabled: !!weekId,
    queryFn: async () => {
      const data = await fetchWeekData(weekId);

      return data;
    },
    queryKey: [QUERY_KEYS.weekPlan, weekId],
  });
};
export const useGetMonthlyEvaluation = (rateId: string) => {
  return useQuery<MonthlyValuesRatingSchema | null>({
    enabled: !!rateId,
    queryFn: async () => {
      const data = await FetchMonthlyEvaluation(rateId);

      return data;
    },
    queryKey: [QUERY_KEYS.monthEvaulation, rateId],
  });
};
