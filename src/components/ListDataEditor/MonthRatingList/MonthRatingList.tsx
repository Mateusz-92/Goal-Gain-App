import { ROUTES } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { useGetAllMonthlyEvaluation } from '../../../firebase/queries';
import DataList from '../../DataList/DataList';
import Loader from '../../Loader/Loader';
const MonthRatingList = () => {
  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetAllMonthlyEvaluation(userId);
  const evaulationData = data?.map((el) => ({
    date: el.date,
    id: el.id,
    routes: ROUTES.monthEvaluation,
    title: 'Ocena miesięczna',
  }));
  if (isLoading) return <Loader />;
  if (isError || !data) return <div>coś poszło nie tak</div>;
  return <DataList data={evaulationData || []} />;
};

export default MonthRatingList;
