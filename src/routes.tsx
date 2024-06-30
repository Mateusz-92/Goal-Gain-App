import { createBrowserRouter } from "react-router-dom";

import AuthForm from "./components/AuthForm/AuthForm";
import ThreeMonthsGoalsPlanner from "./components/Goals/ThreeMonthsGoals/ThreeMonthsGoalsPlanner/ThreeMonthsGoalsPlanner";
import WeekPlanner from "./components/Goals/WeekPlanner/WeekPlaner";
import { CreateHabits } from "./pages/CreateHabits";
import { Habits } from "./pages/Habits";
import { HomePage } from "./pages/HomePage";
import { Showcase } from "./Showcase";

export const ROUTES = {
  createHabits: "/createHabits",
  habitsEditor: "/habitsEditor",
  habitsTracker: "/habitsTracker",
  home: "/",
  login: "/login",
  register: "/register",
  showcase: "/showcase",
  threeMonthsGoalsPlanner: "/threeMonthsGoalsPlanner",
  weekPlanner: "/weekPlanner",
};

export const router = createBrowserRouter([
  { element: <HomePage />, path: ROUTES.home },
  { element: <CreateHabits />, path: ROUTES.createHabits },
  { element: <Habits />, path: ROUTES.habitsTracker },
  { element: <Showcase />, path: ROUTES.showcase },
  { element: <AuthForm isLogin={false} />, path: ROUTES.register },
  { element: <AuthForm isLogin={true} />, path: ROUTES.login },
  {
    element: <ThreeMonthsGoalsPlanner />,
    path: ROUTES.threeMonthsGoalsPlanner,
  },
  {
    element: <WeekPlanner />,
    path: ROUTES.weekPlanner,
  },
]);
