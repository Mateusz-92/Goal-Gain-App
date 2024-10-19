import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginWithEmailAndPassword, registerWithEmailAndPassword } from '../../firebase/Api';
import { ROUTES } from '../../routes';
import Btn from '../../UI/Btn/Btn';
import { FormData, loginSchema, registerSchema } from '../../validators/validators';
import { TextForm } from '../Forms/TextForm/TextForm';

type AuthFormProps = {
  isLogin?: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ isLogin = false }) => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(isLogin
? loginSchema
: registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (isLogin) {
        await loginWithEmailAndPassword(data.email, data.password);
        navigate('/');
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
        {isLogin
? 'Zaloguj się'
: 'Zarejestruj się'}
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing='1'>
          <TextForm
            control={control}
            isInput={true}
            label='Email'
            name='email'
            placeholder=''
            type='email'
          />

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
            <Btn type='submit' text={isLogin
? 'Zaloguj'
: 'Zarejestruj'} />
            {isLogin && (
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
