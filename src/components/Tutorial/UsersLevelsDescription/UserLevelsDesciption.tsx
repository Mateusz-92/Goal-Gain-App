import { Box } from '@chakra-ui/react';

import { levelsDescription } from '../../../constants';
import { DescriptionBox } from '../DescriptionBox/DescriptionBox';

export const UserLevelsDescirption = () => {
  return (
    <Box className='step-19-user-levels'>
      <DescriptionBox
        description='Zobacz jakie poziomy możesz osiągnąć'
        details={levelsDescription}
        header='Poziomy użytkownika'
      />
    </Box>
  );
};
