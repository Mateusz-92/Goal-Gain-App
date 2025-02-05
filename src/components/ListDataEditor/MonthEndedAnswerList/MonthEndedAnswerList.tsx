import { Box } from '@chakra-ui/react';
import { format } from 'date-fns';

import { ROUTES } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { useGetAllMonthAnswerQuestion } from '../../../firebase/queries';
import DataList from '../../DataList/DataList';
import Loader from '../../Loader/Loader';
import { RedirectBox } from '../../RedirectBox/RedirectBox';
import { DUMMY_ANSWERS_DATA } from '../../Tour/helpers';
interface MonthEndedAnswerListProps {
  isTutorialMode?: boolean;
}

export const MonthEndedAnswerList: React.FC<MonthEndedAnswerListProps> = ({ isTutorialMode }) => {
  const actualDate = format(new Date(), 'MM.yyyy');

  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetAllMonthAnswerQuestion(userId);

  if (isLoading) return <Loader />;
  if (isError) return <div>Coś poszło nie tak</div>;
  if (!data && !isTutorialMode)
    return (
      <RedirectBox
        href={ROUTES.monthAnswerList}
        text='Nie masz jeszcze ukończonych odpowiedzi na pytania miesiąca, przejdź do listy odpowiedzi na pytania miesiąca aby je ukończyć'
      />
    );
  const answersList = (isTutorialMode ? DUMMY_ANSWERS_DATA : data) ?? [];
  const answerListData = answersList
    .filter((el) => el?.month && !el.month.includes(actualDate))
    .map((el) => ({
      date: el.month,
      id: el.id,
      routes: ROUTES.monthAnswerDetails,
      title: 'Lista ukończonych odpowiedzi na pytanie miesiąca',
    }));
  return (
    <Box className='step-2-monthEndedAnswerList'>
      <DataList data={answerListData} />
    </Box>
  );
};
