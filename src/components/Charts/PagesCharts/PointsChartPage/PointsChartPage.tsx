import { useAuth } from '../../../../context/AuthContext';
import { useGetUserPoints } from '../../../../firebase/queries';
import { MonthlyChart } from '../../MonthlyChart/MonthlyChart';
import { calculateMonthlyChart } from '../MonthlyRateChartPage/MonthlyRateChartPage';

export const PointsChartPage = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetUserPoints(userId);
  const monthlyPoints = calculateMonthlyChart(data || []);
  if (isLoading) {
    return <div>loading</div>;
  }
  if (isError || !data) {
    <div>error</div>;
  }

  return (
    <div>
      <MonthlyChart data={monthlyPoints} />
    </div>
  );
};
