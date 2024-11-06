import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HabitFormData } from '../components/habits/HabitsEditor/HabitsEditor';

import {
  answerForMonthData,
  GoalFormValuesSchema,
  monthAnswerData,
  MonthlyValuesRatingSchema,
  questionForMonthData,
  WeekPlannerData,
} from '../validators/validators';

import {
  addCrossoutSaving,
  addGoals,
  addHabits,
  addMonthAnswerData,
  addMonthAnswerQuestion,
  addMonthlyEvaluation,
  addRouletteSavingData,
  addUserPointsData,
  addWeekPlan,
  updateHabitStatus,
  uploadAvatarToFirebase,
} from './Api';
import { QUERY_KEYS } from './queries';
import { ammountBord, Saving } from '../types';

export const useEditHabits = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: HabitFormData) => {
      return await addHabits(value.habits, value.date, userId);
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

export const useEditGoals = (userId: string, id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: GoalFormValuesSchema) => {
      return await addGoals(value, userId, id);
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

export const useEditMonthRate = (userId: string, id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: MonthlyValuesRatingSchema) => {
      return await addMonthlyEvaluation(value, userId, id);
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
export const useEditWeekPlan = (userId: string, id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: WeekPlannerData) => {
      return await addWeekPlan(value, userId, id);
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
export const useEditDayHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: {
      date: string;
      habitId: number;
      id: string;
      newStatus: boolean;
    }) => {
      return await updateHabitStatus(value.date, value.habitId, value.newStatus, value.id);
    },

    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.dayHabits] });
    },
  });
};

export const useEditCrossOutSavingComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      value,
    }: {
      userId: string;
      value: { amounts: ammountBord[]; id?: string; variantName?: string };
    }) => {
      return await addCrossoutSaving(userId, value.amounts, value.variantName || '', value.id);
    },

    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.savingsCrossout] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.amount] });
    },
  });
};
export const useAddRouletteSaving = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Saving) => {
      return await addRouletteSavingData(data, userId);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.roulette] });
    },
  });
};
export const useAddUserPoints = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (points: number) => {
      return await addUserPointsData(points, userId);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.userPoints] });
    },
  });
};
export const useAddAnswerForMonth = (userId: string, id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: answerForMonthData | questionForMonthData) => {
      return await addMonthAnswerData(data, userId, id);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.answerList] });
    },
  });
};
export const useAddCurrentAnswerForMonthQuestion = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: monthAnswerData) => {
      return await addMonthAnswerQuestion(data, id);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.answerList] });
    },
  });
};
export const useAddAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, userId }: { file: File; userId: string }) => {
      return await uploadAvatarToFirebase(file, userId);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.avatar] });
    },
  });
};
