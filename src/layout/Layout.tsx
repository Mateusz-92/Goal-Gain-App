import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex, Heading, VStack } from '@chakra-ui/react';

import { MenuPanel } from '../components/MenuPanel/MenuPanel';
import UserAvatar from '../components/UserAvatar/UserAvatar';
import StaticSlider from '../UI/Btn/StaticSlider/StaticSlider';

const Layout: React.FC = () => {
  return (
    <div>
      <Flex>
        <Box p={15} width='35%'>
          <Heading textAlign={'left'}>Goal Gain App</Heading>
          <VStack align='end' mt={10}>
            <MenuPanel />
            <UserAvatar />
          </VStack>
        </Box>
        <Box bg='var(--yellow)' minHeight='100vh' p={25} width='100%'>
          <Outlet />
        </Box>
        <StaticSlider />
      </Flex>
    </div>
  );
};

export default Layout;
