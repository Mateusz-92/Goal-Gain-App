import React from 'react';
import { Box, Button, ButtonProps } from '@chakra-ui/react';

type BtnProps = ButtonProps & {
  icon?: React.ReactElement;
  isDisabled?: boolean;
  onClick?: () => void;
  text: string;
  type: 'button' | 'submit';
};

const Btn: React.FC<BtnProps> = ({ icon, isDisabled, onClick, text, type, ...props }) => {
  return (
    <Box m={2}>
      <Button
        bg='black'
        borderColor='black'
        borderRadius='15px'
        borderWidth='1px'
        color='var(--light-gray)'
        isDisabled={isDisabled}
        leftIcon={icon}
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
        {...props}
      >
        {text}
      </Button>
    </Box>
  );
};

export default Btn;
