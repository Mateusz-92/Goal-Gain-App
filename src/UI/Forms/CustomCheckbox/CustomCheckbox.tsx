import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Checkbox } from '@chakra-ui/react';

type CustomCheckboxProps<T extends FieldValues> = {
  control?: Control<T>;
  isChecked?: boolean;
  name?: Path<T>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  text?: string;
};

export const CustomCheckbox = <T extends FieldValues>({
  control,
  isChecked,
  name,
  onChange,
  text,
}: CustomCheckboxProps<T>) => {
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Checkbox
            _hover={{ opacity: 0.8 }}
            bg='transparent'
            borderColor='var(--dark-gray)'
            color='var(--dark-gray)'
            colorScheme='transparent'
            display={'flex'}
            flexDirection={'column-reverse'}
            fontWeight={'bold'}
            iconColor='black'
            isChecked={field.value}
            ml={2}
            onChange={
              onChange
                ? (e) => {
                    onChange(e);
                    field.onChange(e);
                  }
                : field.onChange
            }
          >
            {text}
          </Checkbox>
        )}
      />
    );
  }

  return (
    <Checkbox
      _hover={{ opacity: 0.8 }}
      bg='transparent'
      borderColor='var(--dark-gray)'
      color='var(--dark-gray)'
      colorScheme='transparent'
      display={'flex'}
      flexDirection={'column-reverse'}
      iconColor='black'
      isChecked={isChecked}
      ml={2}
      onChange={onChange}
    >
      {text}
    </Checkbox>
  );
};
