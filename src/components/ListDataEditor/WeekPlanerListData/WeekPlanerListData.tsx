import { useAuth } from '../../../context/AuthContext';
import { useGetAllWeekPlans } from '../../../firebase/queries';
import { ROUTES } from '../../../routes';
import DataList from '../../DataList/DataList';
import Loader from '../../Loader/Loader';
import { RedirectBox } from '../../RedirectBox/RedirectBox';

const WeekPlannerDataListData = () => {
  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetAllWeekPlans(userId);
  const weekData = data?.map((el) => ({
    date: el.startDay,
    id: el.id,
    routes: ROUTES.weekPlanner,
    title: 'Plan tygodniowy',
  }));
  if (isLoading) return <Loader />;
  if (isError) return <div>coś poszło nie tak</div>;
  if (!data)
    return <RedirectBox href={ROUTES.weekPlanner} text='Przejdź do kreatora planów tygodniowych' />;
  return <DataList data={weekData || []} />;
};

export default WeekPlannerDataListData;
