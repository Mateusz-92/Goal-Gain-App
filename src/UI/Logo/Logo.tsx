import { Image } from '@chakra-ui/react';

import ggappLogo from '../../assets/ggapp_logo.png';

export const Logo = () => (
  <Image
    alt='Logo'
    maxHeight={['120px', '120px', '200px']}
    maxW='100%'
    objectFit='contain'
    src={ggappLogo}
    w={['150px', '150px', '200px']}
  />
);

export default Logo;
