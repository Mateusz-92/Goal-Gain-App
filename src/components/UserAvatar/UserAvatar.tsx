import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';

import { useAuth } from '../../context/AuthContext';
import { AvatarIcon } from '../../UI/AvatarIcon/AvatarIcon';

const UserAvatar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
      </VStack>
    </Box>
  );
};

export default UserAvatar;
