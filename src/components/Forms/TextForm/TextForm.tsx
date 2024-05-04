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
  label,
  name,
  isInput = true,
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
          {isInput ? (
            <Input
              mt="2"
              onChange={onChange}
              placeholder={placeholder}
              textAlign="center"
              type={type}
            />
          ) : (
            <Textarea
              mt="2"
              onChange={onChange}
              placeholder={placeholder}
              textAlign="center"
            />
          )}
          <FormError error={error} />
        </Flex>
      </FormControl>
    )}
  />
);
