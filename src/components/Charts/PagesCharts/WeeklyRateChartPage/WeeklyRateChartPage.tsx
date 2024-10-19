import { useAuth } from '../../../../context/AuthContext';
import { useGetWeekRate } from '../../../../firebase/queries';
import { WeeklyRateChart } from '../../WeeklyRateChart/WeeklyRateChart';
export const WeeklyRateChartPage = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetWeekRate(userId);

  if (isLoading) {
    return <div>sloading</div>;
  }
  if (isError || !data) {
    <div>error</div>;
  }

  return (
    <div>
      <WeeklyRateChart data={data || ([] as number[])} />
    </div>
  );
};
