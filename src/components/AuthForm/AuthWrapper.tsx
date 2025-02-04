import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePassword } from 'firebase/auth';

import { ROUTES } from '../../constants';
import { useAlert } from '../../context/AlertContext';
import { useAuth } from '../../context/AuthContext';
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
  registerWithEmailAndPassword,
} from '../../firebase/Api/Api';
import {
  changePasswordSchema,
  FormData,
  loginSchema,
  registerSchema,
} from '../../validators/validators';

import AuthForm from './AuthForm';

type AuthFormWrapperProps = {
  changeUserPassword?: boolean;
  isLogin?: boolean;
};

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  changeUserPassword = false,
  isLogin = false,
}) => {
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

  const handleRegister = () => navigate(ROUTES.register);

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
        try {
          await loginWithEmailAndPassword(data.email, data.password);
          navigate('/');
        } catch (error) {
          showAlert({ status: 'error', title: 'Błędne hasło lub email' });
        }
      } else if (changeUserPassword) {
        if (user) {
          await updatePassword(user, data.password)
            .then(() => showAlert({ status: 'success', title: 'Hasło zostało zmienione' }))
            .catch(() => showAlert({ status: 'error', title: 'Wystąpił błąd' }));
        }
      } else {
        await registerWithEmailAndPassword(data.email, data.password);
        navigate('/login');
      }
    } catch (error) {
      showAlert({ status: 'error', title: 'Wystąpił błąd' });
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <AuthForm
      changeUserPassword={changeUserPassword}
      control={control}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
      handleSubmit={handleSubmit}
      isLogin={isLogin}
      onSubmit={onSubmit}
    />
  );
};

export default AuthFormWrapper;
