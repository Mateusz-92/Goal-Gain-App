import { useAuth } from '../../../context/AuthContext';
import { useGetAllHabits } from '../../../firebase/queries';
import { ROUTES } from '../../../routes';
import DataList from '../../DataList/DataList';
import Loader from '../../Loader/Loader';

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
  if (isLoading) return <Loader />;
  if (isError || !data) return <div>Coś poszło nie tak</div>;
  return <DataList data={habitData || []} />;
};

export default HabitTrackerList;
