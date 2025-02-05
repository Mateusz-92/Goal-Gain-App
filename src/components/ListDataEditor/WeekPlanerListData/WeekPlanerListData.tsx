import { Box } from '@chakra-ui/react';

import { ROUTES } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { useGetAllWeekPlans } from '../../../firebase/queries';
import DataList from '../../DataList/DataList';
import Loader from '../../Loader/Loader';
import { RedirectBox } from '../../RedirectBox/RedirectBox';
import { DUMMY_WEEKDAY_PLAN_DATA } from '../../Tour/helpers';

interface WeekPlannerListProps {
  isTutorialMode?: boolean;
}
const WeekPlannerDataListData: React.FC<WeekPlannerListProps> = ({ isTutorialMode }) => {
  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetAllWeekPlans(userId);
  const weeklist = isTutorialMode
? DUMMY_WEEKDAY_PLAN_DATA
: data;
  const weekData = weeklist?.map((el) => ({
    date: el.startDay,
    id: el.id,
    routes: ROUTES.weekPlanner,
    title: 'Plan tygodniowy',
  }));
  if (isLoading) return <Loader />;
  if (isError) return <div>coś poszło nie tak</div>;
  if (!data && !isTutorialMode) {
    return (
      <RedirectBox
        href={ROUTES.weekPlanner}
        text='Nie masz jeszcze ocenionych miesięcy, przejdź do kreatora'
      />
    );
  }
  return (
    <Box className='step-6-WeekPlannerList'>
      <DataList data={weekData || []} />
    </Box>
  );
};

export default WeekPlannerDataListData;
