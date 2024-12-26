import { useState } from 'react';
import { Input } from '@chakra-ui/react';

type HabitInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};
export const DateHabitInput = ({ onChange, value }: HabitInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Input
      bg='white'
      border='2px solid'
      borderRadius='15px'
      height='52px'
      mb={'25px'}
      mt='0'
      textAlign='left'
      type='month'
      value={value}
      width='100%'
      _focus={{
        borderColor: 'var(--dark-gray)',
      }}
      _focusVisible={{
        outline: 'none',
      }}
      borderColor={isFocused ? 'black' : 'transparent'}
      fontWeight={isFocused ? 'bold' : 'normal'}
      onBlur={() => setIsFocused(false)}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
    />
  );
};
