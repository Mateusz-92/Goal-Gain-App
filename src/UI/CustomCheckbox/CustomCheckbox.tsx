import { UseFormRegisterReturn } from 'react-hook-form';
import { Checkbox } from '@chakra-ui/react';

type CustomCheckboxProps = {
  isChecked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  registerProps?: UseFormRegisterReturn;
};

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  isChecked,
  onChange,
  registerProps = {},
}) => {
  return (
    <Checkbox
      _hover={{ opacity: 0.8 }}
      bg='transparent'
      borderColor='var(--dark-gray)'
      color='var(--dark-gray)'
      colorScheme='transparent'
      iconColor='black'
      isChecked={isChecked}
      ml={2}
      onChange={onChange}
      {...registerProps}
    />
  );
};
