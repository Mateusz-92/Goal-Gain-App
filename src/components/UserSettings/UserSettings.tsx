import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Flex, Heading } from '@chakra-ui/react';

import { useAuth } from '../../context/AuthContext';
import { useAddAvatar } from '../../firebase/mutations';
import { ROUTES } from '../../routes';
import { AvatarIcon } from '../../UI/AvatarIcon/AvatarIcon';
import Btn from '../../UI/Btn/Btn';

export const UserSettings = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const { mutate: onAddAvatar } = useAddAvatar();

  const changePasswordNavigator = () => {
    navigate(ROUTES.updatePassword);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      onAddAvatar({ file, userId });
    }
  };

  return (
    <Container
      borderRadius={35}
      p={10}
      border={{
        base: 'none',
        md: 'solid',
      }}
    >
      <Flex alignItems='center' direction='column' gap={2}>
        <Heading mb={5}>Ustawienia</Heading>

        <input
          accept='image/*'
          ref={fileInputRef}
          style={{ display: 'none' }}
          type='file'
          onChange={handleFileChange}
        />

        <AvatarIcon avatarState={avatar} />
        <Btn text='Zmien avatar' type='button' onClick={triggerFileInput} />

        <Btn text='Zmien hasło' type='button' onClick={changePasswordNavigator} />

        <Btn text='Usuń konto' type='button' />
      </Flex>
    </Container>
  );
};
