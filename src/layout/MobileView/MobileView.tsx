import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex, VStack } from '@chakra-ui/react';

import { MenuPanel } from '../../components/MenuPanel/MenuPanel';
import { UserDetailsMenu } from '../../components/UserDetailsMenu/UserDetailsMenu';
import Btn from '../../UI/Btn/Btn';
import Logo from '../../UI/Logo/Logo';

const MobileView: React.FC = () => {
  const [isToggled, setIsToggled] = useState(true);

  const toggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <Box bg='var(--yellow)' minHeight='100vh' p={25} width='100vw'>
      <Flex direction='column' justifyContent={'center'}>
        <Box width='100%'>
          <Flex justifyContent='center'>
            <Logo />
            <UserDetailsMenu />
          </Flex>
          <VStack align='center' mb={15} mt={10}>
            <Btn type='button' text={isToggled
? 'Zwiń Panel'
: 'Otwórz Panel'} onClick={toggle} />
            {isToggled && (
              <>
                <MenuPanel />
              </>
            )}
          </VStack>

          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default MobileView;
