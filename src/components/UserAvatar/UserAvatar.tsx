import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsIcon } from '@chakra-ui/icons';
import { Badge, Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';

import { useAuth } from '../../context/AuthContext';
import { handleLogout } from '../../firebase/Api';
import { useUserAvatarData } from '../../firebase/queries';
import { AvatarIcon } from '../../UI/AvatarIcon/AvatarIcon';
import Btn from '../../UI/Btn/Btn';
import { ammountBord } from '../SavingScratch/CircleList/CircleList';
import BadgeDisplay from '../UserLevel/UserLevel';

export type Badge = {
  id: string;
  imgUrl: string;
  name: string;
};

export type Saving = {
  amount: number;
  date: string;
};
export type SavingCrossOut = {
  // amount: number;
  amounts: ammountBord[];
  colId?: number;
  date: string;
  id: string;
  isActive?: boolean;
  isCrossOut: boolean;
  variantName?: string;
};
export type Points = {
  date: string;
  id?: string;
  points: number;
};

export type UserAvatarData = {
  avatar: string;
  badges: Badge[];
  name: string;
  points: Points[];
  savings: {
    crossOutPuzzle: SavingCrossOut[];
    // crossOutPuzzle: Saving[];
    roulette: Saving[];
  };
  totalTestCrossout: number;
  userId: string;
};

const UserAvatar: React.FC = () => {
  const { user: userAvatar } = useAuth();
  const userId = userAvatar?.uid || '';
  const navigate = useNavigate();

  const {
    data: { roulette, sumOfCrossoutSaving, sumOfroulette, sumOfSavings, sumOfUserPoints },
    isError,
    isLoading,
  } = useUserAvatarData(userId);

  if (isLoading) return <div>isLoading</div>;
  if (isError) return <div>isError</div>;
  if (roulette)
    return (
      <Box overflow='hidden'>
        <VStack>
          <HStack>
            <VStack>
              <AvatarIcon />
              <IconButton
                _hover={'transparent'}
                aria-label='Settings'
                bg={'transparent'}
                onClick={() => {
                  navigate('/userSettings');
                }}
              >
                <SettingsIcon color={'black'} />
              </IconButton>
              <Text fontSize='sm' fontWeight='bold'>
                {userAvatar?.email}
              </Text>
            </VStack>
          </HStack>
          <Box>
            <HStack spacing={2}>
              <BadgeDisplay points={sumOfUserPoints} />
            </HStack>
          </Box>
          <Box textAlign={'center'}>
            <Text fontSize='lg' fontWeight='bold' mb={2}>
              {`Suma oszczędności :  ${sumOfSavings}`}
            </Text>
            <Text mb={1}>Ruletka: {sumOfroulette} PLN</Text>
            <Text mb={2}>Wykreślanka: {sumOfCrossoutSaving} PLN</Text>
            <Btn text={'Wyloguj'} type={'button'} onClick={handleLogout} />
          </Box>
        </VStack>
      </Box>
    );
};

export default UserAvatar;
