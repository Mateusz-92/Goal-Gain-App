import { getMonth } from 'date-fns';

import { useAuth } from '../../../../context/AuthContext';
import { useUserAvatarData } from '../../../../firebase/queries';
import { ammountBord, Saving } from '../../../../types';
import { SavingChart } from '../../SavingsChart/SavingChart';
import Loader from '../../../Loader/Loader';

const calculateMonthlySavings = (savings: Saving[]): number[] => {
  const monthlySums: number[] = new Array(12).fill(0);

  savings.forEach((saving) => {
    const month = getMonth(new Date(saving.date)); //
    monthlySums[month] += saving.amount;
  });

  return monthlySums;
};

const calculateMonthlyCrossOutSavings = (savings: ammountBord[][]): number[] => {
  const monthlySums: number[] = new Array(12).fill(0); //

  savings.forEach((savingCrossOut) => {
    savingCrossOut.forEach((saving) => {
      if (saving.date) {
        const month = getMonth(new Date(saving.date));
        monthlySums[month] += saving.value;
      }
    });
  });
  return monthlySums;
};

const calculateTotalMonthlySavings = (
  rouletteSavings: number[],
  crossOutSavings: number[],
): number[] => {
  return rouletteSavings.map((roulette, index) => roulette + crossOutSavings[index]);
};

export const SavingChartPage = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
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
    return <div> Somethig went wrong</div>;
  }
  return (
    <div>
      <SavingChart
        crossOutSavings={montlhlySumOfCrossOutSaving}
        rouletteSavings={montlhlySumOfRouletteSaving}
        totalSavings={totalMonthlySavings}
      />
    </div>
  );
};
