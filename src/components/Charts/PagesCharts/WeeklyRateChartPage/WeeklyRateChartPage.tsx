import { useAuth } from '../../../../context/AuthContext';
import { useGetWeekRate } from '../../../../firebase/queries';
import Loader from '../../../Loader/Loader';
import { WeeklyRateChart } from '../../WeeklyRateChart/WeeklyRateChart';
export const WeeklyRateChartPage = () => {
  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetWeekRate(userId);

  if (isLoading) {
    return <Loader />;
  }
  if (isError || !data) {
    <div>Somethig went wrong</div>;
  }

  return (
    <div>
      <WeeklyRateChart data={data || ([] as number[])} />
    </div>
  );
};
