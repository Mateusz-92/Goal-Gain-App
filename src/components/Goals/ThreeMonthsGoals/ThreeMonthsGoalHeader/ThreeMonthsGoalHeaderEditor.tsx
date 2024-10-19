import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Text, Textarea } from '@chakra-ui/react';

type ThreeMonthsGoalHeaderType = {
  explanationText?: string;
  goalNumber?: number | null;
  goalText?: string;
};

const ThreeMonthsGoalHeaderEditor: React.FC<ThreeMonthsGoalHeaderType> = ({
  explanationText,
  goalNumber,
  goalText,
}) => {
  const { t } = useTranslation(['common']);

  const [editedGoalText, setEditedGoalText] = useState<string | undefined>(goalText);
  const [editedExplanationText, setEditedExplanationText] = useState<string | undefined>(
    explanationText,
  );

  const handleGoalTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedGoalText(e.target.value);
  };

  const handleExplanationTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedExplanationText(e.target.value);
  };

  return (
    <Box>
      <Container>
        <Text>
          {t('goalHeader.title')} {goalNumber}
        </Text>

        <Textarea value={editedGoalText} onChange={handleGoalTextChange} />
      </Container>
      <Text>{t('goalHeader.explanationQuestion')}</Text>

      <Textarea value={editedExplanationText} onChange={handleExplanationTextChange} />
    </Box>
  );
};

export default ThreeMonthsGoalHeaderEditor;
