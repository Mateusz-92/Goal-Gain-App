import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../../firebase/Api";
import {
  FormData,
  loginSchema,
  registerSchema,
} from "../../validators/validators";
import { TextForm } from "../Forms/TextForm/TextForm";

type AuthFormProps = {
  isLogin?: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ isLogin = false }) => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(isLogin
? loginSchema
: registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (isLogin) {
        await loginWithEmailAndPassword(data.email, data.password);
      } else {
        await registerWithEmailAndPassword(data.email, data.password);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Box
      backgroundColor={"azure"}
      border={"solid 1px teal"}
      maxW="400px"
      mt="8"
      mx="auto"
      padding={"25px"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="1">
          <TextForm
            control={control}
            isInput={true}
            label="Email"
            name="email"
            placeholder="Email"
            type="email"
          />

          <TextForm
            control={control}
            isInput={true}
            label="Hasło"
            name="password"
            placeholder="Hasło"
            type="password"
          />

          {!isLogin && (
            <TextForm
              control={control}
              isInput={true}
              label="Powtórz hasło"
              name="confirmPassword"
              placeholder="Potwierdź hasło"
              type="password"
            />
          )}

          <Button colorScheme="teal" type="submit">
            {isLogin
? "Zaloguj"
: "Zarejestruj"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AuthForm;
