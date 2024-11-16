import { format } from 'date-fns';

import { useAuth } from '../../../context/AuthContext';
import { useGetAllMonthAnswerQuestion } from '../../../firebase/queries';
import { ROUTES } from '../../../routes';
import DataList from '../../DataList/DataList';

export const MonthEndedAnswerList = () => {
  const actualDate = format(new Date(), 'MM.yyyy');

  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetAllMonthAnswerQuestion(userId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
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
