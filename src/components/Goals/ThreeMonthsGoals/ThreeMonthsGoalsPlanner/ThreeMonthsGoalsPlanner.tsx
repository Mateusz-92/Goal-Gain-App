import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Container, Flex, Heading, useDisclosure, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';

import { useAuth } from '../../../../context/AuthContext';
import { useUser } from '../../../../context/UserContext';
import { useEditGoals } from '../../../../firebase/mutations';
import { useGetGoals } from '../../../../firebase/queries';
import Btn from '../../../../UI/Btn/Btn';
import {
  GoalFormValuesSchema,
  goalSchema,
  SingleGoalValuesSchema,
} from '../../../../validators/validators';
import { TextForm } from '../../../Forms/TextForm/TextForm';
import ModalApp from '../../../Modal/ModalApp';
import ThreeMonthsTasks, { DEFAULT_TASK_MODEL } from '../ThreeMonthsTasks/ThreeMonthsTasks';

const DEAFAULT_GOAL_MODEL: SingleGoalValuesSchema = {
  explanationQuestion: '',
  goalName: '',
  id: uuidv4(),
  tasks: [DEFAULT_TASK_MODEL],
  yourBenefits: '',
  yourDisturber: '',
};
const countValue: number = 1;

const ThreeMonthsGoalsPlanner: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { goalId } = useParams();

  const pointsValue: number = 500;
  const { t } = useTranslation(['common']);
  const { data, isError, isLoading } = useGetGoals(goalId || '', userId);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const editGoalsWithId = useEditGoals(userId, goalId);
  const editGoalsWithoutId = useEditGoals(userId);
  const onAddGoalsMutation = goalId
? editGoalsWithId
: editGoalsWithoutId;
  const { addPoints } = useUser();
  const { control, handleSubmit, register, setValue } = useForm<GoalFormValuesSchema>({
    defaultValues: {
      goals: [DEAFAULT_GOAL_MODEL],
    },
    resolver: zodResolver(goalSchema),
  });

  useEffect(() => {
    if (data) {
       
      setValue('goals', data[0]);
    }
  }, [data, setValue]);

  const { append, fields, remove } = useFieldArray({ control, name: 'goals' });

  const onSubmit = (data: GoalFormValuesSchema) => {
    onAddGoalsMutation.mutate(data);

    onClose();
  };

  const handleSave = handleSubmit(() => {
    onOpen();
  });

  const handleAddPointsandData = () => {
    handleSubmit(onSubmit)();
    if (!goalId) addPoints(pointsValue);
  };

  if (isLoading) {
    return <div>is Loading...</div>;
  }
  if (isError) {
    return <div>wystąpił błąd</div>;
  }

  return (
    <Box>
      <form>
        {fields.map((el, i) => (
          // comment index in eslint
          <Box key={el.id}>
            <Container>
              <Heading fontSize={'20px'} textAlign='center'>
                {t('goalHeader.title')} {i + countValue}{' '}
              </Heading>

              <TextForm
                control={control}
                isInput={false}
                placeholder={'Nazwa celu'}
                {...register(`goals.${i}.goalName`)}
              />
            </Container>
            <TextForm
              control={control}
              isInput={false}
              label={t('goalHeader.explanationQuestion')}
              placeholder={''}
              {...register(`goals.${i}.explanationQuestion`)}
            />
            <ThreeMonthsTasks
              control={control}
              nestedTaskName={`goals.${i}.tasks`}
              register={register}
              isDisplay={data
? true
: false}
            />
            <TextForm
              control={control}
              isInput={false}
              label={'Korzyści'}
              placeholder={''}
              {...register(`goals.${i}.yourBenefits`)}
            />
            <TextForm
              control={control}
              isInput={false}
              label={'Blokady'}
              placeholder={''}
              {...register(`goals.${i}.yourDisturber`)}
            />
            <VStack alignItems={'center'} mb={'5px'}>
              <Btn text='Usuń cel' type='button' onClick={() => remove(i)} />
            </VStack>
          </Box>
        ))}

        <>
          <Flex gap='15px' justifyContent='center'>
            <Btn text='Dodaj cel' type='button' onClick={() => append(DEAFAULT_GOAL_MODEL)} />

            <Btn text='Zapisz' type='button' onClick={handleSave} />
          </Flex>

          <ModalApp
            body={`Potwierdź, aby dodać dane`}
            cancelText='Anuluj'
            confirmText='Tak'
            header='Czy chcesz dodać/ edytować dane?'
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleAddPointsandData}
          />
        </>
      </form>
    </Box>
  );
};

export default ThreeMonthsGoalsPlanner;
