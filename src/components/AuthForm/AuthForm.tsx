import React from 'react';
import { Control, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { Box, Heading, Stack } from '@chakra-ui/react';

import { useAuth } from '../../context/AuthContext';
import Btn from '../../UI/Btn/Btn';
import { TextForm } from '../../UI/Forms/TextForm/TextForm';
import { FormData } from '../../validators/validators';

type AuthFormProps = {
  changeUserPassword?: boolean;
  control: Control<FormData>;
  handleLogin: () => void;
  handleRegister: () => void;
  handleSubmit: UseFormHandleSubmit<FormData>;
  isLogin?: boolean;
  onSubmit: SubmitHandler<FormData>;
};

const getHeading = (isLogin?: boolean, changeUserPassword?: boolean) => {
  switch (true) {
    case isLogin:
      return 'Zaloguj się';
    case changeUserPassword:
      return 'Zmień hasło';
    default:
      return 'Zarejestruj się';
  }
};

const AuthForm: React.FC<AuthFormProps> = ({
  changeUserPassword,
  control,
  handleLogin,
  handleRegister,
  handleSubmit,
  isLogin,
  onSubmit,
}) => {
  const { user } = useAuth();
  const googleEmail = user?.email?.includes('@gmail.com');

  return (
    <Box
      alignItems={'center'}
      display={'flex'}
      justifyContent={'center'}
      minH={'100vh'}
      minW={'100%'}
      className={changeUserPassword ? '' : 'transparent-bg'}
    >
      <Box
        border={'solid'}
        borderColor={'black'}
        borderRadius={'25px'}
        maxW='400px'
        mx='auto'
        padding='25px'
      >
        <Heading fontSize='42px' mb='50px'>
          {getHeading(isLogin, changeUserPassword)}
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack alignItems='center' spacing='1'>
            {!changeUserPassword && (
              <TextForm
                isInput
                control={control}
                label='Email'
                name='email'
                placeholder=''
                type='email'
              />
            )}
            <TextForm
              isInput
              control={control}
              label='Hasło'
              name='password'
              placeholder=''
              type='password'
            />
            {!isLogin && (
              <TextForm
                isInput
                control={control}
                label='Powtórz hasło'
                name='confirmPassword'
                placeholder=''
                type='password'
              />
            )}

            <Box display='flex' width='100%' justifyContent={isLogin ? 'space-between' : 'center'}>
              {isLogin && <Btn text='Zaloguj' type='submit' />}
              {!isLogin && !changeUserPassword && <Btn text='Zarejestruj' type='submit' />}
              {changeUserPassword && !googleEmail && <Btn text='Zmień hasło' type='submit' />}
              {isLogin && !changeUserPassword && (
                <Btn text='Zarejestruj' type='button' onClick={handleRegister} />
              )}
            </Box>

            {isLogin && (
              <Btn
                leftIcon={<FaGoogle />}
                text='Zaloguj z Google'
                type='button'
                onClick={handleLogin}
              />
            )}
            <span>Test user</span>
            <span>user: testggapp@interia.pl</span>
            <span>password: test12345</span>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AuthForm;
