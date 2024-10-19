import { useAuth } from '../../../context/AuthContext';
import { useGetAllHabits } from '../../../firebase/queries';
import { ROUTES } from '../../../routes';
import DataList from '../../DataList/DataList';

const HabitTrackerList = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetAllHabits(userId);
  const habitData = data?.map((el) => ({
    date: el.date || 'Nie podano daty utworzenia',
    id: el.id,
    routes: ROUTES.habitsTracker,
    title: 'Lista nawyków',
  }));
  if (isLoading) return <div>isLoading</div>;
  if (isError) return <div>isError</div>;
  if (data) return <DataList data={habitData || []} />;
};

export default HabitTrackerList;
