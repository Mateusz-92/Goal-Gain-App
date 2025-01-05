import { Controller, FieldValues } from 'react-hook-form';
import { Flex, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

import { BaseInputProps } from '../../../../types';
import { FormError } from '../../../components/FormError/FormError';

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
      const commonProps = {
        _disabled: {
          _hover: {
            bg: 'white',
            borderColor: 'black',
            cursor: 'not-allowed',
            fontWeight: 'bold',
          },
        },
        _focus: {
          borderColor: 'var(--dark-gray)',
        },
        _focusVisible: {
          outline: 'none',
        },
        bg: 'white',
        border: '2px solid',
        borderColor: isDisabled
? 'black'
: 'transparent',

        borderRadius: '15px',

        fontWeight: isDisabled
? 'bold'
: 'normal',
        height: '52px',
        isDisabled,
        onChange,
        placeholder,
        value,
        width: '100%',
      };

      return (
        <FormControl>
          <Flex direction='column' mb='20px' align={isInput
? 'left'
: 'center'}>
            <FormLabel fontWeight='bold'>{label}</FormLabel>
            {isInput
? (
              <Input
                {...commonProps}
                fontSize={['10px', 'md', 'lg']}
                mt='0'
                textAlign='left'
                type={type}
              />
            )
: (
              <Textarea {...commonProps} mt='2' textAlign='center' />
            )}
            {error && <FormError error={error} />}
          </Flex>
        </FormControl>
      );
    }}
  />
);
