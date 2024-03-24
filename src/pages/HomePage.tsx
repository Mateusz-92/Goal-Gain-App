import DropdownMenu from "../layout/header/DropdownMenu/DropdownMenu";
import { ROUTES } from "../routes";

export const HomePage = () => {
  const menuItems = [
    { path: ROUTES.habitsTracker, title: "Nawyki" },
    { path: "/", title: "elemnet2" },
    { path: "/", title: "element3" },
  ];
  return <DropdownMenu buttonTitle="Osiągaj cele" itemTitles={menuItems} />;
};
