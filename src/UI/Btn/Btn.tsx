import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

type BtnProps = ButtonProps & {
  onClick?: () => void;
  text: string;
  type: 'button' | 'submit';
};

const Btn: React.FC<BtnProps> = ({ onClick, text, type }) => {
  return (
    <Button
      bg='black'
      borderColor='black'
      borderRadius='15px'
      borderWidth='1px'
      color='var(--light-gray)'
      size='lg'
      textTransform='uppercase'
      type={type}
      _hover={{
        bg: 'transparent',
        borderColor: 'black',
        borderWidth: '1px',
        color: 'black',
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default Btn;
