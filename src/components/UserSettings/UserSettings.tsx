import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';

import { ROUTES } from '../../constants';
import { useAlert } from '../../context/AlertContext';
import { useAuth } from '../../context/AuthContext';
import { deleteAccount } from '../../firebase/Api/Api';
import { useAddAvatar } from '../../firebase/mutations';
import { AvatarIcon } from '../../UI/AvatarIcon/AvatarIcon';
import Btn from '../../UI/Btn/Btn';
import ModalApp from '../Modal/ModalApp';

export const UserSettings = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { showAlert } = useAlert();
  const { userId } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

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
      if (file.size / 1024 / 1024 < 1) {
        setError(null);
        const imageUrl = URL.createObjectURL(file);
        setAvatar(imageUrl);
        onAddAvatar({ file, userId });
      } else {
        setError('Wgraj zdjęcie o rozmiarze mniejszym niż 5 MB');
      }
    }
  };
  const removeSelectedAvatar = () => {
    onAddAvatar({ file: null, userId });
    setAvatar('');
  };
  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(user!);
      showAlert({
        description: 'Twoje konto usunięto pomyślnie',
        status: 'success',
        title: 'Usunięto konto',
      });
    } catch (error) {
      showAlert({
        description: 'Wystąpił problem podczas usuwania konta',
        status: 'error',
        title: 'Błąd usunięcia konta',
      });
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
        {error && (
          <Text color='red.500' fontSize='sm'>
            {error}
          </Text>
        )}
        <Btn text='Zmien avatar' type='button' onClick={triggerFileInput} />
        <Btn text='Usuń avatar' type='button' onClick={removeSelectedAvatar} />

        {!user?.email?.includes('@gmail.com') && (
          <Btn text='Zmien hasło' type='button' onClick={changePasswordNavigator} />
        )}
        <Btn text='Usuń konto' type='button' onClick={onOpen} />
        <ModalApp
          body={`Potwierdź, aby usunąć konto i wszsytkie powiązane dane`}
          cancelText='Anuluj'
          confirmText='Tak'
          header='Czy na pewno chcesz bezpowrotnie usunąć konto?'
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleDeleteAccount}
        />
      </Flex>
    </Container>
  );
};
