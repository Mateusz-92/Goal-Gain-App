import { useAuth } from '../../../context/AuthContext';
import { useGetAllMonthlyEvaluation } from '../../../firebase/queries';
import { ROUTES } from '../../../routes';
import DataList from '../../DataList/DataList';

const MonthRatingList = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetAllMonthlyEvaluation(userId);
  const evaulationData = data?.map((el) => ({
    date: el.date,
    id: el.id,
    routes: ROUTES.monthEvaluation,
    title: 'Ocena miesięczna',
  }));
  if (isLoading) return <div>isLoading</div>;
  if (isError) return <div>isError</div>;
  if (data) return <DataList data={evaulationData || []} />;
};

export default MonthRatingList;
