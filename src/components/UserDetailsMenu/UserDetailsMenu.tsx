import { useState } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Container, IconButton, Text } from '@chakra-ui/react';

import { useAuth } from '../../context/AuthContext';
import { handleLogout } from '../../firebase/Api/Api';
import { useUserAvatarData } from '../../firebase/queries';
import Btn from '../../UI/Btn/Btn';
import Loader from '../Loader/Loader';
import BadgeDisplay from '../UserLevel/UserLevel';

export const UserDetailsMenu = () => {
  const { userId } = useAuth();
  const [isToogled, setIsToogled] = useState<boolean>(false);
  const toogledHandler = () => setIsToogled(!isToogled);
  const {
    data: { sumOfCrossoutSaving, sumOfroulette, sumOfSavings, sumOfUserPoints },
    isError,
    isLoading,
  } = useUserAvatarData(userId);

  if (isError) return <div>Somethig went wrong</div>;
  if (isLoading) return <Loader />;

  return (
    <>
      <IconButton
        _hover={{ bgColor: 'var(--red)', opacity: 0.7 }}
        aria-label='Menu'
        bgColor={'var(--red)'}
        icon={<HamburgerIcon />}
        position='absolute'
        right={'12%'}
        top='10px'
        transform={'translateX(40%)'}
        zIndex='1000'
        onClick={toogledHandler}
      />
      {isToogled && (
        <Container
          alignItems={'center'}
          bg={'var(--red)'}
          border='1px solid black'
          borderRadius='25px'
          display={'flex'}
          flexDirection={'column'}
          h={'400px'}
          justifyContent={'center'}
          mt={'5'}
          position='absolute'
          right={['50%', '30%', '20%']}
          top='50px'
          transform={['translateX(50%)', 'translateX(40%)', 'translateX(40%)']}
          w={'300px'}
          zIndex='999'
        >
          <Box>
            <BadgeDisplay points={sumOfUserPoints} />
          </Box>
          <Box textAlign={'center'}>
            <Text fontSize='lg' fontWeight='bold' mb={2}>
              {`Suma oszczędności :  ${sumOfSavings || 0}`}
            </Text>
            <Text mb={1}>Ruletka: {sumOfroulette || 0} PLN</Text>
            <Text mb={2}>Wykreślanki: {sumOfCrossoutSaving || 0} PLN</Text>
            <Btn text={'Wyloguj'} type={'button'} onClick={handleLogout} />
          </Box>
        </Container>
      )}
    </>
  );
};
