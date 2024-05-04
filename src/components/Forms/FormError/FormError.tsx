import { FieldError } from "react-hook-form";
import { FormHelperText } from "@chakra-ui/react";

type FormErrorProps = {
  error?: FieldError;
};

export const FormError = ({ error }: FormErrorProps) => {
  if (!error) {
    return null;
  }
  return <FormHelperText color="red.500">{error.message}</FormHelperText>;
};
