import { useAuth } from '../../../context/AuthContext';
import { useGetCrossOutSavingDetails } from '../../../firebase/queries';
import { ROUTES } from '../../../routes';
import DataList from '../../DataList/DataList';

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
  if (isLoading) return <div>isLoading</div>;
  if (isError || !data) return <div>isError</div>;
  if (data) return <DataList data={crossOutSavingData || []} />;
};
