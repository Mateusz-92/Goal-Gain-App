import { Box, Heading } from '@chakra-ui/react';
import { getMonth } from 'date-fns';

import { ROUTES } from '../../../../constants';
import { useAuth } from '../../../../context/AuthContext';
import { monthRateType } from '../../../../firebase/Api/MonthAndRate';
import { useGetWMonthRate } from '../../../../firebase/queries';
import { Points } from '../../../../types';
import Loader from '../../../Loader/Loader';
import { RedirectBox } from '../../../RedirectBox/RedirectBox';
import { MonthlyChart } from '../../MonthlyChart/MonthlyChart';
export const calculateMonthlyChart = (scope: monthRateType[] | Points[]): number[] => {
  const monthlyScope: number[] = new Array(12).fill(0);

  (scope as monthRateType[] | Points[]).forEach((item) => {
    const month = getMonth(new Date(item.date));
    if ('rate' in item) {
      monthlyScope[month] += item.rate;
    } else if ('points' in item) {
      monthlyScope[month] += item.points;
    }
  });

  return monthlyScope;
};

export const MonthlyRateChartPage = () => {
  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetWMonthRate(userId);
  const monthlyRates = calculateMonthlyChart(data || []);
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>coś poszło nie tak</div>;
  }
  if (!data) {
    return (
      <RedirectBox
        href={ROUTES.monthEvaluation}
        text='Nie masz jeszcze ocenionych miesięcy, przejdź do oceniania jeśli już zakończyłeś miesiąc'
      />
    );
  }

  return (
    <Box mb={15}>
      <Heading textAlign={'center'}>Wykres - oceny miesiąca</Heading>
      <MonthlyChart data={monthlyRates} />;
    </Box>
  );
};
