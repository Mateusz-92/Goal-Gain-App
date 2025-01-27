import React from 'react';
import { LinkBox, LinkOverlay } from '@chakra-ui/react';

type RedirectBoxProps = {
  href: string;
  text: string;
};

export const RedirectBox: React.FC<RedirectBoxProps> = ({ href, text }) => {
  return (
    <LinkBox
      _hover={{ opacity: 0.7 }}
      as='article'
      borderColor={'var(--dark-gray)'}
      borderRadius='md'
      borderWidth='1px'
      color='var(--dark-gray)'
      fontWeight='bold'
      p='4'
      textAlign={'center'}
    >
      <h2>
        <LinkOverlay href={href}>{text}</LinkOverlay>
      </h2>
    </LinkBox>
  );
};
