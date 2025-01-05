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
