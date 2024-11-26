import { Image } from '@chakra-ui/react';

import ggappLogo from '../../assets/ggapp_logo.png';

export const Logo = () => (
  <Image
    alt='Logo'
    maxHeight={['20px', '30px', '200px']}
    maxW='100%'
    objectFit='contain'
    src={ggappLogo}
    w={['50px', '75px', '200px']} // Adjust width for different screen sizes
  />
);

export default Logo;
