import { createBrowserRouter, Navigate } from 'react-router-dom';

import AuthForm from './components/AuthForm/AuthForm';
import { HabitChartPages } from './components/Charts/PagesCharts/HabitsChartsPage/HabitsChartsPages';
import { MonthlyRateChartPage } from './components/Charts/PagesCharts/MonthlyRateChartPage/MonthlyRateChartPage';
import { PointsChartPage } from './components/Charts/PagesCharts/PointsChartPage/PointsChartPage';
import { SavingChartPage } from './components/Charts/PagesCharts/SavingsChartPage/SavingChartPage';
import { WeeklyRateChartPage } from './components/Charts/PagesCharts/WeeklyRateChartPage/WeeklyRateChartPage';
import ThreeMonthsGoalsPlanner from './components/Goals/ThreeMonthsGoals/ThreeMonthsGoalsPlanner/ThreeMonthsGoalsPlanner';
import WeekPlanner from './components/Goals/WeekPlanner/WeekPlaner';
import HabitsTracker from './components/habits/HabitsTracker/HabitsTracker';
import GoalsPlannerEditor from './components/ListDataEditor/GoalsPlannerList/GoalsPlannerList';
import HabitsTrackerList from './components/ListDataEditor/HabitsTrackerList/HabitsTrackerList';
import MonthEvaulationList from './components/ListDataEditor/MonthRatingList/MonthRatingList';
import WeekPlannerDataListData from './components/ListDataEditor/WeekPlanerListData/WeekPlanerListData';
import MonthlyRating from './components/Ratings/MothlyRating/MonthlyRating';
import Roulette from './components/Roulette/Roulette';
import ChoiceVariant from './components/SavingScratch/ChoiceVariant/ChoiceVariant';
import SavingsComponent from './components/SavingScratch/SavingsComponent/SavingsComponent';
import { useAuth } from './context/AuthContext';
import Layout from './layout/Layout';
import { CreateHabits } from './pages/CreateHabits';
import { Habits } from './pages/Habits';
import { HomePage } from './pages/HomePage';
import { Showcase } from './Showcase';

export const ROUTES = {
  createHabits: '/createHabits',
  habitChartPages: '/habitChartPages',
  habitsEditor: '/habitsEditor',
  habitsTracker: '/habitsTracker',
  habitsTrackerData: '/habitsTracker/:habitListId',
  habitsTrackerList: '/habitsTrackerList',
  home: '/',
  login: '/login',
  monthEvaluation: '/monthEvaluation',
  monthEvaluationData: '/monthEvaluation/:monthId',
  monthEvaluationList: '/monthEvaluationList',
  monthlyPointsChart: '/monthlyPointsChart',
  monthlyRate: '/monthlyRate',
  register: '/register',
  roulette: '/roulette',
  savingCrossOut: '/savingCrossOut',
  savingCrossOutCreator: '/savingCrossOutCretor',
  savingsChartPage: '/savingsCharPage',
  showcase: '/showcase',
  threeMonthsGoalsPlanner: '/threeMonthsGoalsPlanner',
  threeMonthsGoalsPlannerData: '/threeMonthsGoalsPlanner/:goalId',
  threeMonthsGoalsPlannerList: '/threeMonthsGoalsPlannerList',
  weeklyRate: '/weeklyRate',
  weekPlanner: '/weekPlanner',
  weekPlannerData: '/weekPlanner/:weekId',
  weekPlannerList: '/weePlannerList',
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to='/login' />;
  }

  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <HomePage />,
        path: ROUTES.home,
      },
      {
        element: <CreateHabits />,
        path: ROUTES.createHabits,
      },
      {
        element: <Habits />,
        path: ROUTES.habitsTracker,
      },
      {
        element: <Showcase />,
        path: ROUTES.showcase,
      },
      {
        element: <Roulette />,
        path: ROUTES.roulette,
      },
      {
        element: <ThreeMonthsGoalsPlanner />,
        path: ROUTES.threeMonthsGoalsPlanner,
      },
      {
        element: <ThreeMonthsGoalsPlanner />,
        path: ROUTES.threeMonthsGoalsPlannerData,
      },
      {
        element: <WeekPlanner />,
        path: ROUTES.weekPlanner,
      },
      {
        element: <WeekPlanner />,
        path: ROUTES.weekPlannerData,
      },
      {
        element: <WeekPlannerDataListData />,
        path: ROUTES.weekPlannerList,
      },
      {
        element: <GoalsPlannerEditor />,
        path: ROUTES.threeMonthsGoalsPlannerList,
      },
      {
        element: <MonthlyRating />,
        path: ROUTES.monthEvaluation,
      },
      {
        element: <MonthlyRating />,
        path: ROUTES.monthEvaluationData,
      },
      {
        element: <MonthEvaulationList />,
        path: ROUTES.monthEvaluationList,
      },
      {
        element: <HabitsTrackerList />,
        path: ROUTES.habitsTrackerList,
      },
      {
        element: <HabitsTracker />,
        path: ROUTES.habitsTrackerData,
      },
      {
        element: <HabitChartPages />,
        path: ROUTES.habitChartPages,
      },
      {
        element: <SavingChartPage />,
        path: ROUTES.savingsChartPage,
      },
      {
        element: <WeeklyRateChartPage />,
        path: ROUTES.weeklyRate,
      },
      {
        element: <MonthlyRateChartPage />,
        path: ROUTES.monthlyRate,
      },
      {
        element: <SavingsComponent />,
        path: ROUTES.savingCrossOut,
      },
      {
        element: <ChoiceVariant />,
        path: ROUTES.savingCrossOutCreator,
      },
      {
        element: <PointsChartPage />,
        path: ROUTES.monthlyPointsChart,
      },
    ],
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    path: ROUTES.home,
  },
  {
    element: <AuthForm isLogin={true} />,
    path: ROUTES.login,
  },
  {
    element: <AuthForm isLogin={false} />,
    path: ROUTES.register,
  },
]);
