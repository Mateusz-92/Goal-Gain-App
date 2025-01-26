import { Box, Heading } from '@chakra-ui/react';

import { useAuth } from '../../../../context/AuthContext';
import { useGetUserPoints } from '../../../../firebase/queries';
import Loader from '../../../Loader/Loader';
import { DUMMY_POINTS_DATA } from '../../../Tour/helpers';
import { MonthlyChart } from '../../MonthlyChart/MonthlyChart';
import { calculateMonthlyChart } from '../MonthlyRateChartPage/MonthlyRateChartPage';

interface Props {
  isTutorial: boolean;
}

export const PointsChartPage: React.FC<Props> = ({ isTutorial }) => {
  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetUserPoints(userId);
  const monthlyPoints = calculateMonthlyChart(isTutorial
? DUMMY_POINTS_DATA
: data || []);
  if (isLoading) {
    return <Loader />;
  }
  if (isError || !data) {
    <div>coś poszło nie tak</div>;
  }

  return (
    <Box className='step-18-points-chart'>
      <Heading mb={15} textAlign={'center'}>
        Wykres - zdobyte punkty
      </Heading>
      <MonthlyChart data={monthlyPoints} />;
    </Box>
  );
};
