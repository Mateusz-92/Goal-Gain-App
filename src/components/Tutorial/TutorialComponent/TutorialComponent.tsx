import { Heading } from '@chakra-ui/react';

import { Tour } from '../Tour/Tour';

export const TutorialComponent = () => {
  return (
    <>
      <Heading mb={15} textAlign={'center'}>
        Samoucze
      </Heading>
      <Tour />
    </>
  );
};
