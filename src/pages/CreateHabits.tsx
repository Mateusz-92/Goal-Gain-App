import { useTranslation } from 'react-i18next';
import { SunIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';

import HabitsEditor from '../components/habits/HabitsEditor/HabitsEditor';

export const CreateHabits = () => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <Text textAlign='center'>{t('createHabits.describe')}</Text>
      <Text textAlign='center' />
      <Text textAlign='center'>
        <SunIcon color={'yellow.300'} mr={2} />
        {t('createHabits.tip')}
      </Text>

      <HabitsEditor />
    </>
  );
};
