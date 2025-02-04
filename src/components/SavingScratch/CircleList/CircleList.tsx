import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { useAuth } from '../../../context/AuthContext';
import { useGetCrossOutAmounts } from '../../../firebase/queries';
import Loader from '../../Loader/Loader';
import { DUMMY_AMOUNTS_DATA } from '../../Tour/helpers';
import CircleItem from '../CircleItem/CircleItem';
interface CircleListProps {
  isTutorialMode?: boolean;
}
const CircleList: React.FC<CircleListProps> = ({ isTutorialMode }) => {
  const { crossOutSavingId } = useParams();
  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetCrossOutAmounts(crossOutSavingId || '', userId);
  const circleListData = isTutorialMode
? DUMMY_AMOUNTS_DATA
: data;
  if (isLoading) return <Loader />;
  if (isError || !circleListData) return <div>Coś poszło nie tak</div>;
  if (data || circleListData)
    return (
      <Box className='step-10-circle-list'>
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
          {circleListData?.map((value) => (
            <CircleItem
              key={value.id}
              amounts={data || circleListData}
              id={value.id}
              isCrossOut={value.isCrossOut}
              savingCrossOutId={crossOutSavingId}
              value={value.value}
            />
          ))}
        </Box>
      </Box>
    );
};

export default CircleList;
