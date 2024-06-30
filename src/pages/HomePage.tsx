import DropdownMenu from "../layout/header/DropdownMenu/DropdownMenu";
import { ROUTES } from "../routes";

export const HomePage = () => {
  const menuItems = [
    { path: ROUTES.habitsTracker, title: "Nawyki" },
    { path: "/showcase", title: "showcase" },
  ];
  const goalsMenu = [
    { path: "/threeMonthsGoalsPlanner", title: "Kreator celów 3-miesięcznych" },
    {
      path: "",
      title: "Lista twoich celów 3-miesęcznych",
    },
    {
      path: "/weekPlanner",
      title: "Zaplanuj cele tygodniowe",
    },
    {
      path: "/",
      title: "Lista planów tygodniowych",
    },
  ];
  return (
    <>
      <DropdownMenu buttonTitle="App" itemTitles={menuItems} />
      <DropdownMenu buttonTitle="Cele" itemTitles={goalsMenu} />
    </>
  );
};
