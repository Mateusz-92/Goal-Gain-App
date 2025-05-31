import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { MenuPanel } from '../../components/MenuPanel/MenuPanel';
import { UserDetailsMenu } from '../../components/UserDetailsMenu/UserDetailsMenu';
import Logo from '../../UI/Logo/Logo';
const DesktopView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const MotionBox = motion(Box);
  return (
    <div>
      <Flex>
        <Box p={15} width='35%'>
          <Flex justifyContent='end'>
            <Logo />
          </Flex>
          <VStack align='end' mt={10}>
            <MotionBox
              animate={{ opacity: 1 }}
              initial={{ opacity: 0.5 }}
              transition={{ duration: 2 }}
            >
              <MenuPanel />
            </MotionBox>
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
          <MotionBox
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Outlet />
          </MotionBox>
        </Box>
      </Flex>
    </div>
  );
};

export default DesktopView;
