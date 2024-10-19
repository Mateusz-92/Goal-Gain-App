import { useAuth } from '../../../context/AuthContext';
import { useGetAllGoals } from '../../../firebase/queries';
import { ROUTES } from '../../../routes';
import DataList from '../../DataList/DataList';

const GoalPlannerList = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetAllGoals(userId);
  const goalsData = data?.map((el) => ({
    date: el.date || 'Nie podano daty utworzenia',
    id: el.id,
    routes: ROUTES.threeMonthsGoalsPlanner,
    title: 'Plan na 3 miesiące',
  }));
  if (isLoading) return <div>isLoading</div>;
  if (isError) return <div>isError</div>;
  if (data) return <DataList data={goalsData || []} />;
};

export default GoalPlannerList;
