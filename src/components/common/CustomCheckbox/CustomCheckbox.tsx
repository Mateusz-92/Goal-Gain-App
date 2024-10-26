import { Checkbox } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

type CustomCheckboxProps = {
  registerProps?: UseFormRegisterReturn;
  isChecked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  registerProps = {},
  isChecked,
  onChange,
}) => {
  return (
    <Checkbox
      _hover={{ opacity: 0.8 }}
      bg='transparent'
      borderColor='var(--dark-gray)'
      color='var(--dark-gray)'
      colorScheme='transparent'
      iconColor='black'
      ml={2}
      isChecked={isChecked}
      onChange={onChange}
      {...registerProps}
    />
  );
};
