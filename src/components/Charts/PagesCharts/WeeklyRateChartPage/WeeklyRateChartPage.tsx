import { Heading } from '@chakra-ui/react';

import { ROUTES } from '../../../../constants';
import { useAuth } from '../../../../context/AuthContext';
import { useGetWeekRate } from '../../../../firebase/queries';
import Loader from '../../../Loader/Loader';
import { RedirectBox } from '../../../RedirectBox/RedirectBox';
import { WeeklyRateChart } from '../../WeeklyRateChart/WeeklyRateChart';
export const WeeklyRateChartPage = () => {
  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetWeekRate(userId);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    <div>Coś poszło nie tak</div>;
  }
  if (!data) {
    return (
      <RedirectBox
        href={ROUTES.weekPlannerList}
        text='Nie masz jeszcze ocenionych tygodni, przejdź do listy zaplanowanych tygodni i wybierz odpowieni aby ocenić'
      />
    );
  }
  return (
    <div>
      <Heading mb={15} textAlign={'center'}>
        Wykres - oceny tygodnia
      </Heading>

      <WeeklyRateChart data={data || ([] as number[])} />
    </div>
  );
};
