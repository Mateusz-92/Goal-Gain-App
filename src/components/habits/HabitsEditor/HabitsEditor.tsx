export type Habit = {
  id: string;
  name: string;
  status: boolean;
};

export type DayHabitIds = {
  id?: string;
  userId?: string;
};

export type DayHabit = {
  [key: string]: {
    habits: Habit[];
  };
} & DayHabitIds;

export type HabitFormData = {
  date: Date;
  habits: DayHabit;
  id?: string;
};

import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';
import { Box, Container, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import { useAuth } from '../../../context/AuthContext';
import { useAddUserPoints, useEditHabits } from '../../../firebase/mutations';
import { useGetUserHabitNamesForMonth } from '../../../firebase/queries';
import Btn from '../../../UI/Btn/Btn';
import { TextForm } from '../../../UI/Forms/TextForm/TextForm';
import { HabitFormValues, habitValidationSchema } from '../../../validators/validators';
import Loader from '../../Loader/Loader';
import ModalApp from '../../Modal/ModalApp';

const DEFAULT_HABIT_DATA = {
  date: new Date().toISOString().split('T')[0].toString(),
  habits: [] as Habit[],
};
interface HabitsEditorProps {
  isTutorial?: boolean;
}
const HabitsEditor: React.FC<HabitsEditorProps> = ({ isTutorial }) => {
  const { userId } = useAuth();

  const { mutate: onAddUserPoints } = useAddUserPoints(userId);
  const currentMonthYear = format(new Date(), 'yyyy-MM');
  const {
    data: dataHabits,
    isError,
    isLoading,
  } = useGetUserHabitNamesForMonth(currentMonthYear, userId);
  const editHabitsWithId = useEditHabits(userId, dataHabits?.id);
  const editHabitsWithOutId = useEditHabits(userId);
  const onAddHabitsMutation = dataHabits?.id
? editHabitsWithId
: editHabitsWithOutId;
  const [isExistHabits, setIsExistHabits] = useState(false);

  useEffect(() => {
    if (dataHabits) {
      setIsExistHabits(Object.keys(dataHabits).length !== 0);
    }
  }, [dataHabits]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    control,
    formState: { isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm<HabitFormValues>({
    defaultValues: DEFAULT_HABIT_DATA,
    resolver: zodResolver(habitValidationSchema),
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'habits',
  });

  const onSubmit = (data: HabitFormValues) => {
    const dayHabits: DayHabit = {
      [data.date.toString()]: {
        habits: data.habits.map((habit) => ({
          ...habit,
          id: habit.id || '',
        })),
      },
    };

    const formattedData: HabitFormData = {
      date: new Date(data.date),
      habits: dayHabits,
    };

    onAddHabitsMutation.mutate(formattedData);
    if (!dataHabits) {
      onAddUserPoints({ points: 50 });
    }

    reset();

    onClose();
  };

  const addHabit = () => {
    append({ id: Date.now().toString(), name: '', status: false });
  };
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname,
  );
  if (isLoading) return <Loader />;
  if (isError || !dataHabits) return <div>coś poszło nie tak</div>;

  return (
    <Box className='step-7-habits-editor'>
      <Heading mb={15} textAlign={'center'}>
        Kreator nawyków
      </Heading>

      {isExistHabits && !isTutorial
? (
        <Box
          alignItems={'center'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
        >
          Masz już utworzone nawyki w tym miesiącu, aby je podejrzeć przejdz do zakładki nawyki lub
          utwórz nowy zestaw na ten miesiąc tracąc dostęp do aktualnego.
          <Btn text='Nowe nawyki' type='button' onClick={onOpen} />
          <ModalApp
            body='Za chwilę przejdziesz do kreatora nawyków, jeśli utworzysz i zapiszesz nowe nawyki, utracisz dostęp do obecnie utworzonych'
            cancelText='Anuluj'
            confirmText='Tworzę nowe'
            header='Uwaga !'
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={() => {
              setIsExistHabits(false);
              onClose();
            }}
          />
        </Box>
      )
: (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
              <TextForm
                control={control}
                isInput={true}
                placeholder='data'
                type='date'
                {...register(`date`)}
              />
              {fields.map((habit, i) => (
                <Box key={habit.id} alignItems='center' display='flex' mb={2}>
                  <TextForm
                    control={control}
                    isInput={true}
                    placeholder='Wpisz nawyk'
                    type='text'
                    {...register(`habits.${i}.name`)}
                  />
                  <Btn text='Usuń' type='button' onClick={() => remove(i)} />
                </Box>
              ))}
              <Flex alignItems='center' gap={4} justifyContent='center' mt={4}>
                {fields.length < 4 && <Btn text='Dodaj nawyk' type='button' onClick={addHabit} />}
                <Btn text='Zapisz' type='button' onClick={onOpen} />
              </Flex>
            </Container>
          </form>
          <ModalApp
            body='Potwierdź, aby zapisać nawyki ! Zapisane nawyki zobaczysz w zakładce Nawyki'
            cancelText='Anuluj'
            confirmText='Zatwierdź'
            header='Gratulacje, tworzysz nawyki :-)'
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleSubmit(onSubmit)}
          />
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
      )}
    </Box>
  );
};

export default HabitsEditor;
