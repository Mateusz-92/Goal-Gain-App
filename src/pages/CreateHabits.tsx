import { useTranslation } from 'react-i18next';
import { SunIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';

import HabitsEditor from '../components/habits/HabitsEditor/HabitsEditor';

export const CreateHabits = () => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <Box mb={6} mt={2} textAlign='center'>
        <Text>{t('createHabits.describe')}</Text>
        <Text>
          <SunIcon color={'yellow.300'} mr={2} />
          {t('createHabits.tip')}
        </Text>
      </Box>
     
        <HabitsEditor />
      
    </>
  );
};
