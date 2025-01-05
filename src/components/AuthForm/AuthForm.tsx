import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePassword } from 'firebase/auth';

import { useAlert } from '../../context/AlertContext';
import { useAuth } from '../../context/AuthContext';
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
  registerWithEmailAndPassword,
} from '../../firebase/Api/Api';
import { ROUTES } from '../../routes';
import Btn from '../../UI/Btn/Btn';
import { TextForm } from '../../UI/Forms/TextForm/TextForm';
import {
  changePasswordSchema,
  FormData,
  loginSchema,
  registerSchema,
} from '../../validators/validators';

type AuthFormProps = {
  changeUserPassword?: boolean;
  isLogin?: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ changeUserPassword = false, isLogin = false }) => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
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
  const handleRegister = () => {
    navigate(ROUTES.register);
  };
  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      alert('Failed to log in with Google');
    }
  };
  const onSubmit = async (data: FormData) => {
    try {
      if (isLogin) {
        await loginWithEmailAndPassword(data.email, data.password);
        navigate('/');
      } else if (changeUserPassword) {
        if (user) {
          await updatePassword(user, data.password)
            .then(() => {
              showAlert({ status: 'success', title: 'Hasło zostało pomyślnie' });
            })
            .catch((error) => {
              showAlert({ status: 'error', title: 'Wystąpił błąd' });
              // eslint-disable-next-line no-console
              console.log(error);
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
      <Heading fontSize='42px' mb='50px'>
        {isLogin && 'Zaloguj się'}
        {!isLogin && !changeUserPassword && 'Zarejestruj się'}
        {changeUserPassword && 'Zmień hasło'}
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems={'center'} spacing='1'>
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
              <Btn text='Zarejstruj' type='button' onClick={handleRegister} />
            )}
          </Box>
          {isLogin && <Btn text='Zaloguj przez google' type='button' onClick={handleLogin} />}
        </Stack>
      </form>
    </Box>
  );
};

export default AuthForm;
