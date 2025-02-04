import { useNavigate } from 'react-router-dom';
import { Box, Grid, GridItem } from '@chakra-ui/react';

import {
  chartMenu,
  goalsMenu,
  habitsMenu,
  monthAnswerMenu,
  ratesMenu,
  ROUTES,
  savingsMenu,
} from '../../constants';
import DropdownMenu from '../../layout/header/DropdownMenu/DropdownMenu';

export const MenuPanel = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Grid gap={1} mb={1} templateColumns={'1fr'}>
        <GridItem>
          <DropdownMenu buttonTitle='Pytanie miesiąca' itemTitles={monthAnswerMenu} />
        </GridItem>
        <GridItem>
          <DropdownMenu buttonTitle='Cele' itemTitles={goalsMenu} />
        </GridItem>
        <GridItem>
          <DropdownMenu buttonTitle='Nawyki' itemTitles={habitsMenu} />
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
          <DropdownMenu
            buttonTitle='Samouczek'
            itemTitles={[]}
            onClick={() => navigate(ROUTES.tutorial)}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
