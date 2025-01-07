import { format } from 'date-fns';

import { useAuth } from '../../../context/AuthContext';
import { useGetAllMonthAnswerQuestion } from '../../../firebase/queries';
import { ROUTES } from '../../../routes';
import DataList from '../../DataList/DataList';
import Loader from '../../Loader/Loader';

export const MonthEndedAnswerList = () => {
  const actualDate = format(new Date(), 'MM.yyyy');

  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetAllMonthAnswerQuestion(userId);

  if (isLoading) return <Loader />;
  if (isError) return <div>Somethig went wrong</div>;
  if (!data) return <div>Nie masz jeszcze danych</div>;

  const answerListData = data
    .filter((el) => el?.month && !el.month.includes(actualDate))
    .map((el) => ({
      date: el.month,
      id: el.id,
      routes: ROUTES.monthAnswerDetails,
      title: 'Lista ukończonych odpowiedzi na pytanie miesiąca',
    }));

  return <DataList data={answerListData} />;
};
