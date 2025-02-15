import { Box, Heading } from '@chakra-ui/react';

import { useAuth } from '../../../../context/AuthContext';
import { useGetUserPoints } from '../../../../firebase/queries';
import Loader from '../../../Loader/Loader';
import { RedirectBox } from '../../../RedirectBox/RedirectBox';
import { MonthlyChart } from '../../MonthlyChart/MonthlyChart';
import { calculateMonthlyChart } from '../MonthlyRateChartPage/MonthlyRateChartPage';

interface Props {
  isTutorial?: boolean;
}

export const PointsChartPage: React.FC<Props> = () => {
  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetUserPoints(userId);
  const monthlyPoints = calculateMonthlyChart(data || []);
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    <div>coś poszło nie tak</div>;
  }
  if (!data) {
    return (
      <RedirectBox
        href='/'
        text='Nie jeszcz zdobytych punktów, podejmij aktywność aby je zdobyć.'
      />
    );
  }

  return (
    <Box className='step-18-points-chart'>
      <Heading mb={15} textAlign={'center'}>
        Wykres - zdobyte punkty
      </Heading>
      <MonthlyChart data={monthlyPoints} />
    </Box>
  );
};
