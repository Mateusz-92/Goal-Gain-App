import { createBrowserRouter } from "react-router-dom";

import { CreateHabits } from "./pages/CreateHabits";
import { Habits } from "./pages/Habits";
import { HomePage } from "./pages/HomePage";

export const ROUTES = {
  createHabits: "/createHabits",
  habitsEditor: "/habitsEditor",
  habitsTracker: "/habitsTracker",
  home: "/",
};

export const router = createBrowserRouter([
  { element: <HomePage />, path: ROUTES.home },
  { element: <CreateHabits />, path: ROUTES.createHabits },
  { element: <Habits />, path: ROUTES.habitsTracker },
]);
