import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { useAuth } from '../../../context/AuthContext';
import { useGetCrossOutAmounts } from '../../../firebase/queries';
import CircleItem from '../CircleItem/CircleItem';
import Loader from '../../Loader/Loader';

const CircleList: React.FC = () => {
  const { crossOutSavingId } = useParams();
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetCrossOutAmounts(crossOutSavingId || '', userId);

  if (isLoading) return <Loader />;
  if (isError) return <div>Somethig went wrong</div>;
  if (data)
    return (
      <Box
        display='grid'
        gap='10px'
        padding='10px'
        gridTemplateColumns={{
          base: 'repeat(auto-fit, minmax(50px, 1fr))',
          md: 'repeat(7, 1fr)',
        }}
        gridTemplateRows={{
          md: 'repeat(3, auto)',
        }}
      >
        {data.map((value) => (
          <CircleItem
            key={value.id}
            amounts={data}
            id={value.id}
            isCrossOut={value.isCrossOut}
            savingCrossOutId={crossOutSavingId}
            value={value.value}
          />
        ))}
      </Box>
    );
};

export default CircleList;
