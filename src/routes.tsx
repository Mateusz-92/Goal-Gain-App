import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Text,} from '@chakra-ui/react';

import AuthForm from './components/AuthForm/AuthForm';
import { HabitChartPages } from './components/Charts/PagesCharts/HabitsChartsPage/HabitsChartsPages';
import { MonthlyRateChartPage } from './components/Charts/PagesCharts/MonthlyRateChartPage/MonthlyRateChartPage';
import { PointsChartPage } from './components/Charts/PagesCharts/PointsChartPage/PointsChartPage';
import { SavingChartPage } from './components/Charts/PagesCharts/SavingsChartPage/SavingChartPage';
import { WeeklyRateChartPage } from './components/Charts/PagesCharts/WeeklyRateChartPage/WeeklyRateChartPage';
import ErrorBoundary from './components/Errors/ErrorBoundery';
import ThreeMonthsGoalsPlanner from './components/Goals/ThreeMonthsGoals/ThreeMonthsGoalsPlanner/ThreeMonthsGoalsPlanner';
import WeekPlanner from './components/Goals/WeekPlanner/WeekPlaner';
import HabitsTracker from './components/habits/HabitsTracker/HabitsTracker';
import { MonthAnswerList } from './components/habits/MonthAnswerList/MonthAnswerList';
import { MonthEndedAnswerListDetails } from './components/habits/MonthAnswerList/MonthEndedAnswerListDetails';
import { CrossOutSavingList } from './components/ListDataEditor/CrossOutSavingsList/CrossOutSavingList';
import GoalsPlannerEditor from './components/ListDataEditor/GoalsPlannerList/GoalsPlannerList';
import HabitsTrackerList from './components/ListDataEditor/HabitsTrackerList/HabitsTrackerList';
import { MonthEndedAnswerList } from './components/ListDataEditor/MonthEndedAnswerList/MonthEndedAnswerList';
import MonthEvaulationList from './components/ListDataEditor/MonthRatingList/MonthRatingList';
import WeekPlannerDataListData from './components/ListDataEditor/WeekPlanerListData/WeekPlanerListData';
import Loader from './components/Loader/Loader';
import MonthlyRating from './components/Ratings/MothlyRating/MonthlyRating';
import Roulette from './components/Roulette/Roulette';
import ChoiceVariant from './components/SavingScratch/ChoiceVariant/ChoiceVariant';
import SavingsComponent from './components/SavingScratch/SavingsComponent/SavingsComponent';
import { UserSettings } from './components/UserSettings/UserSettings';
import { useAuth } from './context/AuthContext';
import DesktopView from './layout/DesktopView/DesktopView';
import MobileView from './layout/MobileView/MobileView';
import { withResponsiveView } from './layout/withResponsiveView';
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
  monthAnswerDetails: '/monthAnswerDetails',
  monthAnswerDetailsData: '/monthAnswerDetails/:monthAnswerId',
  monthAnswerList: '/monthAnswerList',
  monthEvaluation: '/monthEvaluation',
  monthEvaluationData: '/monthEvaluation/:monthId',
  monthEvaluationList: '/monthEvaluationList',
  monthlyPointsChart: '/monthlyPointsChart',
  monthlyRate: '/monthlyRate',
  register: '/register',
  roulette: '/roulette',
  savingCrossOut: '/savingCrossOut',
  savingCrossOutCreator: '/savingCrossOutCretor',
  savingCrossOutData: '/savingCrossOut/:crossOutSavingId',
  savingCrossOutList: '/savingCrossOutList',
  savingsChartPage: '/savingsCharPage',
  showcase: '/showcase',
  threeMonthsGoalsPlanner: '/threeMonthsGoalsPlanner',
  threeMonthsGoalsPlannerData: '/threeMonthsGoalsPlanner/:goalId',
  threeMonthsGoalsPlannerList: '/threeMonthsGoalsPlannerList',
  updatePassword: '/updatePassword',
  userSettings: '/userSettings',
  weeklyRate: '/weeklyRate',
  weekPlanner: '/weekPlanner',
  weekPlannerData: '/weekPlanner/:weekId',
  weekPlannerList: '/weePlannerList',
};
const ResponsiveView = withResponsiveView(MobileView, DesktopView);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div>
        <Loader />
        <Text mt={50} textAlign={'center'}>
          Sprawdzanie danych użytkownika
        </Text>
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/login' />;
  }

  return (
    <ErrorBoundary>
      <>{children}</>
    </ErrorBoundary>
  );
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
        element: <ThreeMonthsGoalsPlanner mode='add' />,
        path: ROUTES.threeMonthsGoalsPlanner,
      },
      {
        element: <ThreeMonthsGoalsPlanner mode='edit' />,
        path: ROUTES.threeMonthsGoalsPlannerData,
      },
      {
        element: <WeekPlanner mode='add' />,
        path: ROUTES.weekPlanner,
      },
      {
        element: <WeekPlanner mode='edit' />,
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
        element: <MonthlyRating mode='add' />,
        path: ROUTES.monthEvaluation,
      },
      {
        element: <MonthlyRating mode='edit' />,
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
        element: <SavingsComponent />,
        path: ROUTES.savingCrossOutData,
      },
      {
        element: <MonthAnswerList />,
        path: ROUTES.monthAnswerList,
      },
      {
        element: <MonthEndedAnswerList />,
        path: ROUTES.monthAnswerDetails,
      },
      {
        element: <MonthEndedAnswerListDetails />,
        path: ROUTES.monthAnswerDetailsData,
      },

      {
        element: <CrossOutSavingList />,
        path: ROUTES.savingCrossOutList,
      },
      {
        element: <ChoiceVariant />,
        path: ROUTES.savingCrossOutCreator,
      },
      {
        element: <PointsChartPage />,
        path: ROUTES.monthlyPointsChart,
      },
      {
        element: <UserSettings />,
        path: ROUTES.userSettings,
      },
      {
        element: <AuthForm changeUserPassword={true} />,
        path: ROUTES.updatePassword,
      },
    ],
    element: (
      <ProtectedRoute>
        <ResponsiveView />
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
