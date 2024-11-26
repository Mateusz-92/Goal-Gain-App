import { useAuth } from '../../../../context/AuthContext';
import { useGetUserPoints } from '../../../../firebase/queries';
import Loader from '../../../Loader/Loader';
import { MonthlyChart } from '../../MonthlyChart/MonthlyChart';
import { calculateMonthlyChart } from '../MonthlyRateChartPage/MonthlyRateChartPage';

export const PointsChartPage = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetUserPoints(userId);
  const monthlyPoints = calculateMonthlyChart(data || []);
  if (isLoading) {
    return <Loader />;
  }
  if (isError || !data) {
    <div>Somethig went wrong</div>;
  }

  return (
    <div>
      <MonthlyChart data={monthlyPoints} />
    </div>
  );
};
