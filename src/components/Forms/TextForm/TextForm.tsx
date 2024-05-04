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
  isInput?: boolean;
  placeholder: string;
  type?: "text" | "date";
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
    render={({ field: { onChange }, fieldState: { error } }) => (
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
              onChange={onChange}
            />
          )
: (
            <Textarea
              mt="2"
              placeholder={placeholder}
              textAlign="center"
              onChange={onChange}
            />
          )}
          <FormError error={error} />
        </Flex>
      </FormControl>
    )}
  />
);
