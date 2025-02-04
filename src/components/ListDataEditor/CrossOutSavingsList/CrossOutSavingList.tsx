import { Heading } from '@chakra-ui/react';

import { ROUTES } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { useGetCrossOutSavingDetails } from '../../../firebase/queries';
import DataList from '../../DataList/DataList';
import Loader from '../../Loader/Loader';
import { RedirectBox } from '../../RedirectBox/RedirectBox';

export const CrossOutSavingList = () => {
  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetCrossOutSavingDetails(userId);
  const crossOutSavingData = data?.map((el) => ({
    date: el.date,
    id: el.id,
    routes: ROUTES.savingCrossOut,
    title: el.variantName || '',
  }));
  if (isLoading) return <Loader />;
  if (isError) return <div>coś poszło nie tak</div>;
  if (!data)
    return (
      <RedirectBox
        href={ROUTES.savingCrossOutCreator}
        text='Nie masz jeszcze utworzonych wykreślanek oszczędności, przejdź do kreatora wykreślanki aby je utworzyć'
      />
    );
  return (
    <>
      <Heading textAlign={'center'}>Oszczędności - Wykreślanka</Heading>
      <DataList data={crossOutSavingData || []} />
    </>
  );
};
