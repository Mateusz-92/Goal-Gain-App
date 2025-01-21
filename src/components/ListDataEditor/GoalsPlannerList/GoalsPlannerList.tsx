import { Box } from '@chakra-ui/react';

import { ROUTES } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { useGetAllGoals } from '../../../firebase/queries';
import DataList from '../../DataList/DataList';
import Loader from '../../Loader/Loader';
import { RedirectBox } from '../../RedirectBox/RedirectBox';

const GoalPlannerList = () => {
  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetAllGoals(userId);
  const goalsData = data?.map((el) => ({
    date: el.date || 'Nie podano daty utworzenia',
    id: el.id,
    routes: ROUTES.threeMonthsGoalsPlanner,
    title: 'Plan na 3 miesiące',
  }));
  if (isLoading) return <Loader />;
  if (isError) return <div>Coś poszło nie tak</div>;
  if (!data)
    return <RedirectBox href={ROUTES.threeMonthsGoalsPlanner} text='Przejdź do kreatora celów' />;
  return (
    <Box className='step-4-GoalsList'>
      <DataList data={goalsData || []} />
    </Box>
  );
};

export default GoalPlannerList;
