import DropdownMenu from "../layout/header/DropdownMenu/DropdownMenu";
import { ROUTES } from "../routes";

export const HomePage = () => {
  const menuItems = [
    { path: ROUTES.habitsTracker, title: "Nawyki" },
    { path: "/showcase", title: "showcase" },
    { path: "/", title: "element3" },
  ];
  return <DropdownMenu buttonTitle="Osiągaj cele" itemTitles={menuItems} />;
};
