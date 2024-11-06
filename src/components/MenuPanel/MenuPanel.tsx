import { Box, Grid, GridItem } from '@chakra-ui/react';

import DropdownMenu from '../../layout/header/DropdownMenu/DropdownMenu';
import { ROUTES } from '../../routes';

export const MenuPanel = () => {
  const chartMenu = [
    { path: ROUTES.habitChartPages, title: 'Nawyki w danym miesiącu' },
    { path: ROUTES.savingsChartPage, title: 'Oszczędności' },
    { path: ROUTES.weeklyRate, title: 'Oceny tygodniowe' },
    { path: ROUTES.monthlyRate, title: 'Oceny miesięczne' },
    { path: ROUTES.monthlyPointsChart, title: 'Zdobyte punkty' },
  ];
  const menuItems = [
    { path: ROUTES.habitsTracker, title: 'Nawyki' },
    { path: '/showcase', title: 'showcase' },
    { path: ROUTES.roulette, title: 'ruletka' },
  ];
  const ratesMenu = [
    { path: ROUTES.monthEvaluation, title: 'Ocena miesięczna' },
    { path: ROUTES.monthEvaluationList, title: 'Lista ocen miesięcznych' },
  ];

  const goalsMenu = [
    {
      path: ROUTES.threeMonthsGoalsPlanner,
      title: 'Kreator celów 3-miesięcznych',
    },
    {
      path: ROUTES.threeMonthsGoalsPlannerList,
      title: 'Lista twoich celów 3-miesięcznych',
    },
    {
      path: ROUTES.weekPlanner,
      title: 'Zaplanuj cele tygodniowe',
    },
    {
      path: '/weePlannerList',
      title: 'Lista planów tygodniowych',
    },
  ];
  const savingsMenu = [
    { path: ROUTES.savingCrossOutList, title: 'Twoje wykreślanki' },
    { path: ROUTES.savingCrossOutCreator, title: 'kreator wykreślanki' },
    { path: ROUTES.roulette, title: 'ruletka' },
  ];
  return (
    <Box>
      <Grid gap={1} mb={1} templateColumns={'1fr'}>
        <GridItem>
          <DropdownMenu buttonTitle='App' itemTitles={menuItems} />
        </GridItem>
        <GridItem>
          <DropdownMenu buttonTitle='Cele' itemTitles={goalsMenu} />
        </GridItem>
        <GridItem>
          <DropdownMenu buttonTitle='Oszczędności' itemTitles={savingsMenu} />
        </GridItem>
        <GridItem>
          <DropdownMenu buttonTitle='Oceny' itemTitles={ratesMenu} />
        </GridItem>
        <GridItem>
          <DropdownMenu buttonTitle='Wykresy' itemTitles={chartMenu} />
        </GridItem>
        <GridItem>
          <DropdownMenu buttonTitle='Samouczek' itemTitles={[]} />
        </GridItem>
      </Grid>
    </Box>
  );
};
