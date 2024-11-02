import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Heading, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePassword } from 'firebase/auth';

import { useAuth } from '../../context/AuthContext';
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from '../../firebase/Api';
import { ROUTES } from '../../routes';
import Btn from '../../UI/Btn/Btn';
import {
  changePasswordSchema,
  FormData,
  loginSchema,
  registerSchema,
} from '../../validators/validators';
import { TextForm } from '../Forms/TextForm/TextForm';

type AuthFormProps = {
  changeUserPassword?: boolean;
  isLogin?: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ changeUserPassword = false, isLogin = false }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(
      changeUserPassword
? changePasswordSchema
: isLogin
? loginSchema
: registerSchema,
    ),
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (isLogin) {
        await loginWithEmailAndPassword(data.email, data.password);
        navigate('/');
      } else if (changeUserPassword) {
        if (user) {
          await updatePassword(user, data.password)
            .then(() => {
              setShowAlert(true);
              setAlertMessage('Hasło zostało pomyślnie zmienione');
            })
            .catch((error) => {
              setShowAlert(true);
              setAlertMessage('Wystąpił błąd podczas zmiany hasła: ' + error.message);
            });
        }
      } else {
        await registerWithEmailAndPassword(data.email, data.password);
        navigate('/login');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Box maxW='400px' mx='auto' padding={'25px'}>
      {showAlert && (
        <Alert
          borderRadius={10}
          mb={4}
          colorScheme={alertMessage.includes('błąd')
? 'red'
: 'teal'}
          status={alertMessage.includes('błąd')
? 'error'
: 'success'}
          onClick={() => {
            setShowAlert(false);
          }}
        >
          {alertMessage}
        </Alert>
      )}
      <Heading fontSize='42px' mb='50px'>
        {isLogin && 'Zaloguj się'}
        {!isLogin && !changeUserPassword && 'Zarejestruj się'}
        {changeUserPassword && 'Zmień hasło'}
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing='1'>
          {!changeUserPassword && (
            <TextForm
              control={control}
              isInput={true}
              label='Email'
              name='email'
              placeholder=''
              type='email'
            />
          )}

          <TextForm
            control={control}
            isInput={true}
            label='Hasło'
            name='password'
            placeholder=''
            type='password'
          />

          {!isLogin && (
            <TextForm
              control={control}
              isInput={true}
              label='Powtórz hasło'
              name='confirmPassword'
              placeholder=''
              type='password'
            />
          )}

          <Box display='flex' width='100%' justifyContent={isLogin
? 'space-between'
: 'center'}>
            {isLogin && <Btn text={'Zaloguj'} type='submit' />}
            {!isLogin && !changeUserPassword && <Btn text={'Zarejestruj'} type='submit' />}
            {changeUserPassword && <Btn text={'Zmień hasło'} type='submit' />}
            {isLogin && !changeUserPassword && (
              <Button
                as={Link}
                bg='transparent'
                borderColor='black'
                borderRadius='15px'
                borderWidth='1px'
                color='black'
                size='lg'
                textTransform='uppercase'
                to={ROUTES.register}
                width='150px'
                _hover={{
                  bg: 'black',
                  borderColor: 'black',
                  borderWidth: '1px',
                  color: 'var(--light-gray)',
                }}
              >
                Zarejstruj
              </Button>
            )}
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default AuthForm;
