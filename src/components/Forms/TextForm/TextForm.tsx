import { Controller, FieldValues } from 'react-hook-form';
import { Flex, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

import { FormError } from '../FormError/FormError';
import { BaseInputProps } from '../types';

type InputQuestionProps<T extends FieldValues> = {
  isDisabled?: boolean;
  isInput?: boolean;
  placeholder: string;
  type?: 'text' | 'date' | 'email' | 'password' | 'month';
  value?: string;
} & BaseInputProps<T>;

export const TextForm = <T extends FieldValues>({
  control,
  isDisabled,
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
          <Flex direction='column' mb='20px' align={isInput ? 'left' : 'center'}>
            <FormLabel fontWeight='bold'>{label}</FormLabel>
            {isInput ? (
              <Input
                bg='white'
                border='2px solid'
                borderRadius='15px'
                height='52px'
                isDisabled={isDisabled}
                mt='0'
                placeholder={placeholder}
                textAlign='left'
                type={type}
                value={value}
                width='100%'
                _disabled={{
                  _hover: {
                    bg: 'white',
                    borderColor: 'black',
                    cursor: 'not-allowed',
                    fontWeight: 'bold',
                  },
                }}
                _focus={{
                  borderColor: 'var(--dark-gray)',
                }}
                _focusVisible={{
                  outline: 'none',
                }}
                borderColor={isDisabled ? 'black' : 'transparent'}
                fontWeight={isDisabled ? 'bold' : 'normal'}
                onChange={onChange}
                fontSize={['10px', 'md', 'lg']}
              />
            ) : (
              <Textarea
                bg='white'
                border='2px solid'
                borderRadius='15px'
                height='52px'
                isDisabled={isDisabled}
                mt='2'
                placeholder={placeholder}
                textAlign='center'
                value={value}
                width='100%'
                _disabled={{
                  _hover: {
                    bg: 'white',
                    borderColor: 'black',
                    cursor: 'not-allowed',
                    fontWeight: 'bold',
                  },
                }}
                _focus={{
                  borderColor: 'var(--dark-gray)',
                }}
                _focusVisible={{
                  outline: 'none',
                }}
                borderColor={isDisabled ? 'black' : 'transparent'}
                fontWeight={isDisabled ? 'bold' : 'normal'}
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
