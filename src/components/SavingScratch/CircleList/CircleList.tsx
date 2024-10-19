import React from 'react';
import { Box } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import { useAuth } from '../../../context/AuthContext';
import { useGetCrossOutAmounts } from '../../../firebase/queries';
import CircleItem from '../CircleItem/CircleItem';

export type ammountBord = {
  date?: string;
  id: string;
  isCrossOut: boolean;
  value: number;
};

export const testBord: ammountBord[] = [
  {
    id: uuidv4(),
    isCrossOut: false,
    value: 1,
  },
  {
    id: uuidv4(),
    isCrossOut: false,
    value: 4,
  },
  {
    id: uuidv4(),
    isCrossOut: false,
    value: 6,
  },
  {
    id: uuidv4(),
    isCrossOut: false,
    value: 7,
  },
];
export const testBord2: ammountBord[] = [
  {
    id: uuidv4(),
    isCrossOut: false,
    value: 11,
  },
  {
    id: uuidv4(),
    isCrossOut: false,
    value: 41,
  },
  {
    id: uuidv4(),
    isCrossOut: false,
    value: 61,
  },
  {
    id: uuidv4(),
    isCrossOut: false,
    value: 71,
  },
];

const tmpId = 'LAddsyU2qNe5YoxPKfib';
const CircleList: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetCrossOutAmounts(tmpId, userId);

  if (isLoading) return <div>isLoading</div>;
  if (isError) return <div>isError</div>;
  if (data)
    return (
      <Box display='flex' flexWrap='wrap'>
        {data.map((value) => (
          <CircleItem
            key={value.id}
            amounts={data}
            id={value.id}
            isCrossOut={value.isCrossOut}
            savingCrossOutId={tmpId}
            value={value.value}
          />
        ))}
      </Box>
    );
};

export default CircleList;
