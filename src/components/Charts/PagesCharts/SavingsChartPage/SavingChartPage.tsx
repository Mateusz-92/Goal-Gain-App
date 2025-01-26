import { Heading } from '@chakra-ui/react';

import { useAuth } from '../../../../context/AuthContext';
import { useUserAvatarData } from '../../../../firebase/queries';
import {
  calculateMonthlyCrossOutSavings,
  calculateMonthlySavings,
  calculateTotalMonthlySavings,
} from '../../../../helpers';
import Loader from '../../../Loader/Loader';
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
  if (isError || !roulette || !crossOutSaving) {
    return <div> coś poszło nie tak</div>;
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
