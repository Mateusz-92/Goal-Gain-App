import { Controller, FieldValues } from "react-hook-form";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

import { FormError } from "../FormError/FormError";
import { BaseInputProps } from "../types";

type InputQuestionProps<T extends FieldValues> = {
  isDisabled?: boolean;
  isInput?: boolean;
  placeholder: string;
  type?: "text" | "date" | "email" | "password";
  value?: string;
} & BaseInputProps<T>;

export const TextForm = <T extends FieldValues>({
  control,
  isInput = true,
  label,
  name,
  placeholder,
  type,
}: InputQuestionProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value }, fieldState: { error } }) => {
      return (
        <FormControl>
          <Flex align="center" direction="column" mb="20px">
            <FormLabel fontWeight="bold">{label}</FormLabel>
            {isInput
? (
              <Input
                mt="2"
                placeholder={placeholder}
                textAlign="center"
                type={type}
                value={value}
                onChange={onChange}
              />
            )
: (
              <Textarea
                mt="2"
                placeholder={placeholder}
                textAlign="center"
                value={value}
                onChange={onChange}
              />
            )}
            <FormError error={error} />
          </Flex>
        </FormControl>
      );
    }}
  />
);
