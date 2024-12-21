import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';

import { useAuth } from '../../context/AuthContext';
import { handleLogout } from '../../firebase/Api';
import { useUserAvatarData } from '../../firebase/queries';
import { AvatarIcon } from '../../UI/AvatarIcon/AvatarIcon';
import Btn from '../../UI/Btn/Btn';
import Loader from '../Loader/Loader';
import BadgeDisplay from '../UserLevel/UserLevel';

const UserAvatar: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const navigate = useNavigate();

  const {
    data: { sumOfCrossoutSaving, sumOfroulette, sumOfSavings, sumOfUserPoints },
    isError,
    isLoading,
  } = useUserAvatarData(userId);

  if (isLoading) return <Loader />;
  if (isError) return <div>Somethig went wrong</div>;
  return (
    <Box overflow='hidden'>
      <VStack align='end'>
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
              {user?.email}
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
            {`Suma oszczędności :  ${sumOfSavings || 0}`}
          </Text>
          <Text mb={1}>Ruletka: {sumOfroulette || 0} PLN</Text>
          <Text mb={2}>Wykreślanki: {sumOfCrossoutSaving || 0} PLN</Text>
          <Btn text={'Wyloguj'} type={'button'} onClick={handleLogout} />
        </Box>
      </VStack>
    </Box>
  );
};

export default UserAvatar;
