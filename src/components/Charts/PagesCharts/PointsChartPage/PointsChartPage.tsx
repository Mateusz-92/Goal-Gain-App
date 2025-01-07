import { useAuth } from '../../../../context/AuthContext';
import { useGetUserPoints } from '../../../../firebase/queries';
import Loader from '../../../Loader/Loader';
import { MonthlyChart } from '../../MonthlyChart/MonthlyChart';
import { calculateMonthlyChart } from '../MonthlyRateChartPage/MonthlyRateChartPage';

export const PointsChartPage = () => {
  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetUserPoints(userId);
  const monthlyPoints = calculateMonthlyChart(data || []);
  if (isLoading) {
    return <Loader />;
  }
  if (isError || !data) {
    <div>coś poszło nie tak</div>;
  }

  return <MonthlyChart data={monthlyPoints} />;
};
