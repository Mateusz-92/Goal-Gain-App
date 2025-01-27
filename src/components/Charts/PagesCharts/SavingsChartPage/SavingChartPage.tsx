import { Heading } from '@chakra-ui/react';

import { ROUTES } from '../../../../constants';
import { useAuth } from '../../../../context/AuthContext';
import { useUserAvatarData } from '../../../../firebase/queries';
import {
  calculateMonthlyCrossOutSavings,
  calculateMonthlySavings,
  calculateTotalMonthlySavings,
} from '../../../../helpers';
import Loader from '../../../Loader/Loader';
import { RedirectBox } from '../../../RedirectBox/RedirectBox';
import { SavingChart } from '../../SavingsChart/SavingChart';

export const SavingChartPage = () => {
  const { userId } = useAuth();
  const {
    data: { crossOutSaving, roulette },
    isError,
    isLoading,
  } = useUserAvatarData(userId);

  const isCrossOut = crossOutSaving?.map((el) => el.amounts.filter((el) => el.isCrossOut));
  const montlhlySumOfRouletteSaving = calculateMonthlySavings(roulette || []);
  const montlhlySumOfCrossOutSaving = calculateMonthlyCrossOutSavings(isCrossOut || []);
  const totalMonthlySavings = calculateTotalMonthlySavings(
    montlhlySumOfRouletteSaving,
    montlhlySumOfCrossOutSaving,
  );
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div> coś poszło nie tak</div>;
  }
  if (!roulette && !crossOutSaving) {
    return (
      <RedirectBox
        href={ROUTES.roulette}
        text='Nie masz jeszcze oszędności, zagraj w oszczędzanie lub utwórz wykreślankę'
      />
    );
  }
  return (
    <div>
      <Heading mb={15} textAlign={'center'}>
        Wykres - oszczędności
      </Heading>

      <SavingChart
        crossOutSavings={montlhlySumOfCrossOutSaving}
        rouletteSavings={montlhlySumOfRouletteSaving}
        totalSavings={totalMonthlySavings}
      />
    </div>
  );
};
