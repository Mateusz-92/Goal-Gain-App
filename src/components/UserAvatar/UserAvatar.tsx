import React from 'react';
import { Avatar, Badge, Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { handleLogout } from '../../firebase/Api';
import { useUserAvatarData } from '../../firebase/queries';
import { ammountBord } from '../SavingScratch/CircleList/CircleList';

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
  const { user } = useUser();
  const { user: userAvatar } = useAuth();
  const userId = userAvatar?.uid || '';

  const {
    data: { roulette, sumOfCrossoutSaving, sumOfroulette, sumOfSavings, sumOfUserPoints },
    isError,
    isLoading,
  } = useUserAvatarData(userId);

  if (isLoading) return <div>isLoading</div>;
  if (isError) return <div>isError</div>;
  if (roulette)
    return (
      <Box overflow='hidden' p={5}>
        <VStack>
          <HStack>
            <Avatar size='xl' src={'user.avatar'} />
            <VStack>
              <Text fontSize='2xl' fontWeight='bold'>
                {user.name}
              </Text>
              <Text color='gray.500' fontSize='md'>
                Points: {sumOfUserPoints}
              </Text>
            </VStack>
          </HStack>
          <Box>
            <Text fontSize='lg' fontWeight='bold'>
              Badges:
            </Text>
            <HStack spacing={2}>
              {user.badges.map((badge) => (
                <Badge key={badge.id} borderRadius='full' colorScheme='teal' px='2'>
                  <Image alt={badge.name} boxSize='30px' src={badge.imgUrl} />
                  {badge.name}
                </Badge>
              ))}
            </HStack>
          </Box>
          <Box>
            <Text fontSize='lg' fontWeight='bold'>
              {`Savings (łącznie ${sumOfSavings})`}
            </Text>
            <Text>Roulette: {sumOfroulette} PLN</Text>
            <Text>Cross Out Puzzle: {sumOfCrossoutSaving} PLN</Text>
            <Button onClick={() => handleLogout()}>LOGOUT </Button>
          </Box>
        </VStack>
      </Box>
    );
};

export default UserAvatar;
