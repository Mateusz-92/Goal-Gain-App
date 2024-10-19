import { getMonth } from 'date-fns';

import { useAuth } from '../../../../context/AuthContext';
import { monthRateType } from '../../../../firebase/Api';
import { useGetWMonthRate } from '../../../../firebase/queries';
import { Points } from '../../../UserAvatar/UserAvatar';
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
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetWMonthRate(userId);
  const monthlyRates = calculateMonthlyChart(data || []);
  if (isLoading) {
    return <div>loading</div>;
  }
  if (isError || !data) {
    <div>error</div>;
  }

  return (
    <div>
      <MonthlyChart data={monthlyRates} />
    </div>
  );
};
