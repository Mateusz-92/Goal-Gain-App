import { ROUTES } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { useGetAllMonthlyEvaluation } from '../../../firebase/queries';
import DataList from '../../DataList/DataList';
import Loader from '../../Loader/Loader';
import { RedirectBox } from '../../RedirectBox/RedirectBox';
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
  if (isError) return <div>coś poszło nie tak</div>;
  if (!data) {
    return (
      <RedirectBox
        href={ROUTES.monthEvaluation}
        text='Nie masz jeszcze ocenionych miesięcy, przejdź do oceniania jeśli już zakończyłeś miesiąc'
      />
    );
  }
  return <DataList data={evaulationData || []} />;
};

export default MonthRatingList;
