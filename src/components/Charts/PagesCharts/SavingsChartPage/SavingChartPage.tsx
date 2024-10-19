import { getMonth } from 'date-fns';

import { useAuth } from '../../../../context/AuthContext';
import { useGetCrossOutSaving, useGetRouletteSaving } from '../../../../firebase/queries';
import { ammountBord } from '../../../SavingScratch/CircleList/CircleList';
import { Saving } from '../../../UserAvatar/UserAvatar';
import { SavingChart } from '../../SavingsChart/SavingChart';

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
  const { data, isError, isLoading } = useGetRouletteSaving(userId);
  const {
    data: crossOutData,
    isError: isError2,
    isLoading: isLoading2,
  } = useGetCrossOutSaving(userId);
  const isCrossOut = crossOutData?.map((el) => el.amounts.filter((el) => el.isCrossOut));
  const montlhlySumOfRouletteSaving = calculateMonthlySavings(data || []);
  const montlhlySumOfCrossOutSaving = calculateMonthlyCrossOutSavings(isCrossOut || []);
  const totalMonthlySavings = calculateTotalMonthlySavings(
    montlhlySumOfRouletteSaving,
    montlhlySumOfCrossOutSaving,
  );
  if (isLoading || isLoading2) {
    return <div> isLoading</div>;
  }
  if (isError || isError2 || !data || !crossOutData) {
    return <div> isError</div>;
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
