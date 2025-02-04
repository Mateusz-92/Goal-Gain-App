import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, VStack } from '@chakra-ui/react';

import { MenuPanel } from '../../components/MenuPanel/MenuPanel';
import { UserDetailsMenu } from '../../components/UserDetailsMenu/UserDetailsMenu';
import Logo from '../../UI/Logo/Logo';
const DesktopView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div>
      <Flex>
        <Box p={15} width='35%'>
          <Flex justifyContent='end'>
            <Logo />
          </Flex>
          <VStack align='end' mt={10}>
            <MenuPanel />
          </VStack>
        </Box>
        <Box bg='var(--yellow)' minHeight='100vh' p={25} width='100%'>
          <UserDetailsMenu />
          {!isHomePage && (
            <IconButton
              _active='transparent'
              _focus='transparent'
              _hover='transparent'
              aria-label='ArrowBackIcon'
              bg='transparent'
              m={5}
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowBackIcon _hover={{ opacity: 0.7 }} fontSize={50} />
            </IconButton>
          )}

          <Outlet />
        </Box>
      </Flex>
    </div>
  );
};

export default DesktopView;
