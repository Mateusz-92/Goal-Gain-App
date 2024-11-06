import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

import { useAuth } from '../../../context/AuthContext';
import { useGetCrossOutSavingName } from '../../../firebase/queries';
import CircleList from '../CircleList/CircleList';

const SavingsComponent: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { crossOutSavingId } = useParams();

  const { data, isError, isLoading } = useGetCrossOutSavingName(userId, crossOutSavingId || '');
  if (isLoading) return <div>isLoading</div>;
  if (isError || !data) return <div>isError</div>;
  return (
    <Box>
      {data && (
        <Text fontSize={20} fontWeight={'bold'} textAlign={'center'}>
          Skreśl 33 kwoty i uzbieraj {data}
        </Text>
      )}
      <CircleList />
    </Box>
  );
};

export default SavingsComponent;
