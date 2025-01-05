import { useAuth } from '../../../context/AuthContext';
import { useGetCrossOutSavingDetails } from '../../../firebase/queries';
import { ROUTES } from '../../../routes';
import DataList from '../../DataList/DataList';
import Loader from '../../Loader/Loader';

export const CrossOutSavingList = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetCrossOutSavingDetails(userId);
  const crossOutSavingData = data?.map((el) => ({
    date: el.date,
    id: el.id,
    routes: ROUTES.savingCrossOut,
    title: el.variantName || '',
  }));
  if (isLoading) return <Loader />;
  if (isError || !data) return <div>coś poszło nie tak</div>;
  return <DataList data={crossOutSavingData || []} />;
};
