import { Box } from '@chakra-ui/react';

import { pointsDescription } from '../../constants';
import { DescriptionBox } from '../Tutorial/DescriptionBox/DescriptionBox';

export const UsersPointsDescription = () => {
  return (
    <Box className='step-20-users-points'>
      <DescriptionBox description={pointsDescription} header={'Opis punktacji'} />
    </Box>
  );
};
