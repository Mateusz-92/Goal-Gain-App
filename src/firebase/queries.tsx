import { useQuery } from '@tanstack/react-query';
import { useQueries } from '@tanstack/react-query';
import { DayHabit, HabitFormData } from '../components/habits/HabitsEditor/HabitsEditor';
import {
  answerForMonthData,
  GoalFormValuesSchema,
  MonthlyValuesRatingSchema,
  SingleGoalValuesSchema,
  WeekPlannerData,
} from '../validators/validators';

import {
  FetchAllCrossOutAmountsInSaving,
  fetchAllGoalsData,
  FetchAllHabits,
  FetchAllMonthlyEvaluation,
  FetchAllRouletteInSaving,
  fetchAllWeekData,
  FetchCrossOutAmounts,
  fetchCrossOutSavingDetails,
  fetchCrossOutSavingName,
  fetchGoalsData,
  fetchHabitsPerMonth,
  fetchLatestHabitForMonth,
  fetchMonthAnswerData,
  fetchMonthCurrentAnswerQuestion,
  FetchMonthlyEvaluation,
  fetchMonthRateData,
  fetchUserAvatar,
  fetchUserPoints,
  fetchWeekData,
  fetchWeekDay,
  fetchWeekRateData,
} from './Api';
import { ammountBord, Saving, SavingCrossOut } from '../types';
export const QUERY_KEYS = {
  amount: 'amount',
  answerList: 'answerList',
  avatar: 'avatar',
  dayHabits: 'dayHabits',
  goals: 'goals',
  habits: 'habits',
  monthEvaulation: 'mothEvaulation',
  monthRate: 'monthRate',
  monthValue: 'monthValue',
  roulette: 'roulette',
  savingsCrossout: 'savingsCrossout',
  userPoints: 'userPoints',
  variant: 'variant',
  weekDay: 'weekDay',
  weekPlan: 'weekPlan',
  weekRate: 'weekRate',
};
export const useGetHabits = (userId: string, habitListId?: string) => {
  return useQuery<DayHabit | null>({
    enabled: !!userId,
    queryFn: async () => {
      return fetchLatestHabitForMonth(userId, habitListId);
    },
    queryKey: [QUERY_KEYS.habits],
  });
};
export const useGetAllHabits = (userId: string) => {
  return useQuery<HabitFormData[] | null>({
    enabled: !!userId,
    queryFn: async () => {
      return FetchAllHabits(userId);
    },
    queryKey: [QUERY_KEYS.habits],

    // enabled: !!clientId,
  });
};

export const useGetHabitsForMonthChart = (userId: string) => {
  return useQuery({
    enabled: !!userId,
    queryFn: async () => {
      return fetchLatestHabitForMonth(userId);
    },

    queryKey: [QUERY_KEYS.habits],
  });
};

export const useGetUserHabitNamesForMonth = (monthAndYear: string, userId: string) => {
  return useQuery({
    enabled: !!userId,
    queryFn: async () => {
      return fetchHabitsPerMonth(monthAndYear, userId);
    },
    queryKey: ['userHabitNamesForMonth'],

    // enabled: !!clientId,
  });
};

export const useGetGoals = (goalId: string, userId: string) => {
  return useQuery<SingleGoalValuesSchema[] | null>({
    enabled: !!goalId && !!userId,
    queryFn: async () => {
      return fetchGoalsData(goalId, userId);
    },
    queryKey: [QUERY_KEYS.goals, goalId],
  });
};
export const useGetAllGoals = (userId: string) => {
  return useQuery<GoalFormValuesSchema[] | null>({
    enabled: !!userId,
    queryFn: async () => {
      return fetchAllGoalsData(userId);
    },
    queryKey: [QUERY_KEYS.goals],
  });
};

export const useGetWeekPlan = (weekId: string, userId: string) => {
  return useQuery<WeekPlannerData | null>({
    enabled: !!weekId && !!userId,
    queryFn: async () => {
      const data = await fetchWeekData(weekId, userId);

      return data;
    },
    queryKey: [QUERY_KEYS.weekPlan, weekId],
  });
};
export const useGetWeekRate = (userId: string) => {
  return useQuery({
    enabled: !!userId,
    queryFn: async () => {
      const data = await fetchWeekRateData(userId);

      return data;
    },
    queryKey: [QUERY_KEYS.weekRate],
  });
};
export const useGetWMonthRate = (userId: string) => {
  return useQuery({
    enabled: !!userId,
    queryFn: async () => {
      const data = await fetchMonthRateData(userId);

      return data;
    },
    queryKey: [QUERY_KEYS.monthValue],
  });
};
export const useGetAllWeekPlans = (userId: string) => {
  return useQuery<WeekPlannerData[] | null>({
    enabled: !!userId,
    queryFn: async () => {
      const data = await fetchAllWeekData(userId);

      return data;
    },
    queryKey: [QUERY_KEYS.weekPlan],
  });
};
export const useGetDayPlan = (userId: string) => {
  return useQuery({
    enabled: !!userId,
    queryFn: async () => {
      const data = await fetchWeekDay(userId);

      return data;
    },
    queryKey: [QUERY_KEYS.weekDay],
  });
};
export const useGetMonthlyEvaluation = (rateId: string, userId: string) => {
  return useQuery<MonthlyValuesRatingSchema | null>({
    enabled: !!rateId && !!userId,
    queryFn: async () => {
      const data = await FetchMonthlyEvaluation(rateId, userId);

      return data;
    },
    queryKey: [QUERY_KEYS.monthEvaulation],
    // queryKey: [QUERY_KEYS.monthEvaulation, rateId],
  });
};
export const useGetAllMonthlyEvaluation = (userId: string) => {
  return useQuery<MonthlyValuesRatingSchema[] | null>({
    enabled: !!userId,
    queryFn: async () => {
      const data = await FetchAllMonthlyEvaluation(userId);

      return data;
    },
    queryKey: [QUERY_KEYS.monthEvaulation],
  });
};
export const useGetCrossOutAmounts = (crossoutId: string, userId: string) => {
  return useQuery<ammountBord[] | null>({
    enabled: !!crossoutId && !!userId,
    queryFn: async () => {
      const data = await FetchCrossOutAmounts(crossoutId, userId);

      return data;
    },
    queryKey: [QUERY_KEYS.amount, crossoutId],
  });
};

const getRouletteQueryConfig = (userId: string) => ({
  enabled: !!userId,
  queryFn: async () => {
    const data = await FetchAllRouletteInSaving(userId);

    return data;
  },

  queryKey: [QUERY_KEYS.roulette],
});
const getUserPointsQueryConfig = (userId: string) => ({
  enabled: !!userId,
  queryFn: async () => {
    const data = await fetchUserPoints(userId);

    return data;
  },
  queryKey: [QUERY_KEYS.userPoints],
});

export const useGetUserPoints = (userId: string) => {
  return useQuery(getUserPointsQueryConfig(userId));
};
export const useGetRouletteSaving = (userId: string) => {
  return useQuery<Saving[] | null>(getRouletteQueryConfig(userId));
};

const crossOutSavingQueryConfig = (userId: string) => ({
  enabled: !!userId,
  queryFn: async () => {
    const data = await FetchAllCrossOutAmountsInSaving(userId);
    return data;
  },
  queryKey: [QUERY_KEYS.savingsCrossout], // Add enabled property here
});

export const useGetCrossOutSaving = (userId: string) => {
  return useQuery<SavingCrossOut[] | null>(crossOutSavingQueryConfig(userId));
};
export const useGetMonthAnswerList = (userId: string) => {
  return useQuery<answerForMonthData[] | null>({
    enabled: !!userId,
    queryFn: async () => {
      const data = await fetchMonthAnswerData(userId);

      return data;
    },
    queryKey: [QUERY_KEYS.answerList],
  });
};
export const useGetCurrentMonthAnswerQuestion = (userId: string) => {
  return useQuery({
    enabled: !!userId,
    queryFn: async () => {
      const data = await fetchMonthCurrentAnswerQuestion(userId);

      return data;
    },
    queryKey: [QUERY_KEYS.answerList],
  });
};

export const useUserAvatarData = (userId: string) => {
  const allQueries = useQueries({
    queries: [
      crossOutSavingQueryConfig(userId),
      getRouletteQueryConfig(userId),
      getUserPointsQueryConfig(userId),
    ],
  });

  const [crossOutSavingQuery, rouletteQuery, userPointsQuery] = allQueries;

  const isCrossOut = crossOutSavingQuery.data?.map((el) =>
    el.amounts.filter((el) => el.isCrossOut),
  );

  const sumOfCrossoutSaving =
    isCrossOut?.reduce((acc, curr) => acc + curr.reduce((acc, curr) => acc + curr.value, 0), 0) ||
    0;

  const sumOfroulette =
    rouletteQuery.data?.map((el) => el.amount).reduce((acc, curr) => acc + curr, 0) || 0;
  const sumOfUserPoints =
    userPointsQuery.data?.map((el) => el.points).reduce((acc, curr) => acc + curr, 0) || 0;

  const sumOfSavings = sumOfCrossoutSaving + sumOfroulette;

  return {
    data: {
      crossOutSaving: crossOutSavingQuery.data,
      roulette: rouletteQuery.data,
      sumOfCrossoutSaving,
      sumOfroulette,
      sumOfSavings,
      sumOfUserPoints,
    },
    isError: allQueries.some((query) => query.isError),
    isLoading: allQueries.some((query) => query.isLoading),
  };
};
export const getHabitsForMonthChartQueryConfig = (userId: string) => {
  return {
    enabled: !!userId,
    queryFn: async () => {
      return fetchLatestHabitForMonth(userId);
    },

    queryKey: [QUERY_KEYS.habits],
  };
};

export const getUserHabitNamesForMonthQueryConfig = (monthAndYear: string, userId: string) => {
  return {
    enabled: !!userId,
    queryFn: async () => {
      return fetchHabitsPerMonth(monthAndYear, userId);
    },
    queryKey: ['userHabitNamesForMonth'],
  };
};
export const useGetHabitsChartsData = (monthAndYear: string, userId: string) => {
  const allQueries = useQueries({
    queries: [
      getHabitsForMonthChartQueryConfig(userId),
      getUserHabitNamesForMonthQueryConfig(monthAndYear, userId),
    ],
  });

  const [habitsDataQuery, userHabitNamesQuery] = allQueries;

  return {
    data: {
      habitsData: habitsDataQuery.data,
      userHabitNames: userHabitNamesQuery.data,
    },
    isError: allQueries.some((query) => query.isError),
    isLoading: allQueries.some((query) => query.isLoading),
  };
};
export const useGetUserAvatar = (userId: string) => {
  return useQuery<string | null>({
    enabled: !!userId,
    queryFn: async () => {
      return fetchUserAvatar(userId);
    },
    queryKey: [QUERY_KEYS.avatar],
  });
};
export const useGetCrossOutSavingName = (userId: string, id: string) => {
  return useQuery<string | null>({
    enabled: !!userId,
    queryFn: async () => {
      return fetchCrossOutSavingName(userId, id);
    },
    queryKey: [QUERY_KEYS.variant],
  });
};
export const useGetCrossOutSavingDetails = (userId: string) => {
  return useQuery({
    enabled: !!userId,
    queryFn: async () => {
      return fetchCrossOutSavingDetails(userId);
    },
    queryKey: [QUERY_KEYS.savingsCrossout],
  });
};
