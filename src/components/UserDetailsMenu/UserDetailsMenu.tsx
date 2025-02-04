import { useState } from 'react';
import { Avatar, Box, Container, IconButton, Text } from '@chakra-ui/react';

import { useAuth } from '../../context/AuthContext';
import { handleLogout } from '../../firebase/Api/Api';
import { useUserAvatarData } from '../../firebase/queries';
import Btn from '../../UI/Btn/Btn';
import Loader from '../Loader/Loader';
import UserAvatar from '../UserAvatar/UserAvatar';
import BadgeDisplay from '../UserLevel/UserLevel';

type Props = {
  isTutorialMode?: boolean;
};
export const UserDetailsMenu: React.FC<Props> = ({ isTutorialMode }) => {
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
    <Box className='step-21-userDetails'>
      {!isTutorialMode && (
        <IconButton
          _hover={{ bgColor: 'transparent', opacity: 0.7 }}
          aria-label='Menu'
          bgColor={'transparent'}
          icon={<Avatar bg={'black'} />}
          top='10px'
          zIndex='1000'
          position={isTutorialMode
? 'static'
: 'absolute'}
          right={isTutorialMode
? '0'
: '12%'}
          onClick={toogledHandler}
        />
      )}
      {(isToogled || isTutorialMode) && (
        <Container
          alignItems={'center'}
          bg={'var(--red)'}
          border='1px solid black'
          borderRadius='25px'
          display={'flex'}
          flexDirection={'column'}
          h={'500px'}
          justifyContent={'center'}
          mt={'35'}
          right={'25px'}
          w={'300px'}
          zIndex='999'
          position={isTutorialMode
? 'static'
: 'absolute'}
        >
          <UserAvatar />
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
    </Box>
  );
};
