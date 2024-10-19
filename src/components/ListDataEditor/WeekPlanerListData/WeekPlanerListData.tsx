import { useAuth } from '../../../context/AuthContext';
import { useGetAllWeekPlans } from '../../../firebase/queries';
import { ROUTES } from '../../../routes';
import DataList from '../../DataList/DataList';

const WeekPlannerDataListData = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetAllWeekPlans(userId);
  const weekData = data?.map((el) => ({
    date: el.startDay,
    id: el.id,
    routes: ROUTES.weekPlanner,
    title: 'Plan tygodniowy',
  }));
  if (isLoading) return <div>isLoading</div>;
  if (isError) return <div>isError</div>;
  if (data) return <DataList data={weekData || []} />;
};

export default WeekPlannerDataListData;
