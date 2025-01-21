import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useBlocker, useParams } from 'react-router-dom';
import { Box, Container, Flex, Heading, useDisclosure, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';

import { useAuth } from '../../../../context/AuthContext';
import { useAddUserPoints, useEditGoals } from '../../../../firebase/mutations';
import { useGetGoals } from '../../../../firebase/queries';
import Btn from '../../../../UI/Btn/Btn';
import { TextForm } from '../../../../UI/Forms/TextForm/TextForm';
import {
  GoalFormValuesSchema,
  goalSchema,
  SingleGoalValuesSchema,
} from '../../../../validators/validators';
import Loader from '../../../Loader/Loader';
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

type ThreeMonthsGoalsPlannerProps = { mode: 'add' | 'edit' };

const ThreeMonthsGoalsPlanner = ({ mode }: ThreeMonthsGoalsPlannerProps) => {
  const { userId } = useAuth();
  const { goalId } = useParams();
  const { mutate: onAddUserPoints } = useAddUserPoints(userId);

  const { t } = useTranslation(['common']);
  const { data, isError, isLoading } = useGetGoals(goalId || '', userId, mode);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const editGoalsWithId = useEditGoals(userId, goalId);
  const editGoalsWithoutId = useEditGoals(userId);
  const onAddGoalsMutation = goalId
? editGoalsWithId
: editGoalsWithoutId;

  const {
    control,
    formState: { isDirty },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<GoalFormValuesSchema>({
    defaultValues: {
      goals: [DEAFAULT_GOAL_MODEL],
    },
    resolver: zodResolver(goalSchema),
  });

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (mode === 'add') {
      reset({ goals: [DEAFAULT_GOAL_MODEL] });
    }
    if (data) {
      //@ts-expect-error Type ingore error
      reset({ goals: data[0] });
    }
  }, [data, setValue]);

  const { append, fields, remove } = useFieldArray({ control, name: 'goals' });

  const onSubmit = (formData: GoalFormValuesSchema) => {
    onAddGoalsMutation.mutate(formData, {
      onSuccess: () => {
        if (mode === 'add') {
          reset({ goals: [DEAFAULT_GOAL_MODEL] });
        }
      },
    });

    if (goalId) {
      let pointsChange = 0;
      formData.goals.forEach((goal, goalIndex) => {
        const previousGoal = data
? data[goalIndex]
: undefined;

        if (previousGoal) {
          goal.tasks.forEach((task, taskIndex) => {
            const previousTask = previousGoal.tasks[taskIndex];
            if (previousTask && task.isEnded !== previousTask.isEnded) {
              pointsChange += task.isEnded
? 25
: -25;
            }
          });
        }
      });
      onAddUserPoints({ points: pointsChange });
    }
    onClose();
  };

  const handleSave = handleSubmit(() => {
    onOpen();
  });

  const handleAddData = () => {
    handleSubmit(onSubmit)();
    if (!goalId) onAddUserPoints({ points: 25 });
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>coś poszło nie tak</div>;
  }

  return (
    <Box className='step-3-threeMonthsGoalsPlanner'>
      <Heading mb={15} textAlign={'center'}>
        Plany 3-miesięczne
      </Heading>

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
              <TextForm
                control={control}
                isInput={false}
                label={t('goalHeader.explanationQuestion')}
                placeholder={''}
                {...register(`goals.${i}.explanationQuestion`)}
              />
            </Container>
            <Container>
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
                <Btn text={`Usuń cel ${i + 1}`} type='button' onClick={() => remove(i)} />
              </VStack>
            </Container>
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
            onConfirm={handleAddData}
          />
        </>
      </form>
      {blocker.state === 'blocked'
? (
        <ModalApp
          body={`Masz nie zapisane dane.`}
          cancelText='Nie'
          confirmText='Tak'
          header=' Czy na pewno chcesz wyjść?'
          isOpen={blocker.state === 'blocked'}
          onClose={() => blocker.reset()}
          onConfirm={() => blocker.proceed()}
        />
      )
: null}
    </Box>
  );
};

export default ThreeMonthsGoalsPlanner;
