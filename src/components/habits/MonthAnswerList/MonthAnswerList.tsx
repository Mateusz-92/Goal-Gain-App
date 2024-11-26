import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parse } from 'date-fns';

import { useAuth } from '../../../context/AuthContext';
import {} from '../../../firebase/Api';
import { useAddCurrentAnswerForMonthQuestion, useAddUserPoints } from '../../../firebase/mutations';
import { useGetCurrentMonthAnswerQuestion } from '../../../firebase/queries';
import Btn from '../../../UI/Btn/Btn';
import { monthAnswerData, monthAnswerSchema } from '../../../validators/validators';
import { TextForm } from '../../Forms/TextForm/TextForm';
import ModalApp from '../../Modal/ModalApp';
import Loader from '../../Loader/Loader';
const currentDay = format(new Date(), 'dd.MM.yyyy');

const DEFAULT_ANSWER_MODEL = {
  date: currentDay,
  id: '',
  text: '',
};

export const MonthAnswerList = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetCurrentMonthAnswerQuestion(userId);
  const answerDataId = data?.id || '';
  const editAnswerQuestionWithId = useAddCurrentAnswerForMonthQuestion(answerDataId);
  const editAnswerQuestionWithoutId = useAddCurrentAnswerForMonthQuestion();
  const { mutate: onAddUserPoints } = useAddUserPoints(userId);

  const [canUserAddAnswer, setCanUserAddAnswer] = useState(true);

  const {
    control,
    formState: { isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm<monthAnswerData>({
    defaultValues: {
      answers: [],
      id: '',
      month: format(new Date(), 'MM.yyyy'),
      questionTitle: '',
      userId: userId,
    },
    resolver: zodResolver(monthAnswerSchema),
  });
  const { append, fields, replace } = useFieldArray({ control, name: 'answers' });

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (data) {
      reset({
        answers: data.answers || [],
        month: data.month || '',
        questionTitle: data.questionTitle || '',
        userId: data.userId || '',
      });
      if (data && data.answers) {
        replace(data.answers);
      }
    }
  }, [data, reset, replace]);

  const onSubmit = async (formData: monthAnswerData) => {
    if (answerDataId) {
      editAnswerQuestionWithId.mutate(formData);
    } else {
      editAnswerQuestionWithoutId.mutate(formData);
    }
  };

  const handleAddNext = () => {
    setCanUserAddAnswer(false);
    append(DEFAULT_ANSWER_MODEL);
  };
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Somethig went wrong</div>;
  }
  const handleConfirmSubmit = () => {
    if (!data?.answers.some((answer) => answer.date === currentDay)) {
      onAddUserPoints({ points: 5 });
    }
    handleSubmit(onSubmit)();
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextForm
          control={control}
          isInput={true}
          placeholder={'Wpisz Pytanie miesiąca'}
          isDisabled={data?.questionTitle ? true : false}
          {...register(`questionTitle`)}
        />
        {fields.map((el, i) => {
          const answerDate = parse(el.date, 'dd.MM.yyyy', new Date());
          answerDate < parse(currentDay, 'dd.MM.yyyy', new Date());

          return (
            <TextForm
              key={el.id}
              control={control}
              isInput={true}
              label={data?.answers[i]?.date || ''}
              // isDisabled={isDisabled}
              placeholder={'Wpisz'}
              {...register(`answers.${i}.text`)}
            />
          );
        })}
        <Btn
          text='Dodaj odpowiedź'
          type='button'
          isDisabled={
            data?.answers.some((answer) => answer.date === currentDay) || !canUserAddAnswer
          }
          onClick={handleAddNext}
        />
        <ModalApp
          body={`Potwierdź, aby zapisać `}
          cancelText='Anuluj'
          confirmText='Tak'
          header='Czy napewno chcesz dodać dane  ?'
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleConfirmSubmit}
        />
        <Btn text='Wyślij' type='button' onClick={() => onOpen()} />
        {/* <Btn text='Wyślij' type='submit' /> */}
      </form>
      {blocker.state === 'blocked' ? (
        <ModalApp
          body={`Masz nie zapisane dane.`}
          cancelText='Nie'
          confirmText='Tak'
          header=' Czy na pewno chcesz wyjść?'
          isOpen={blocker.state === 'blocked'}
          onClose={() => blocker.reset()}
          onConfirm={() => blocker.proceed()}
        />
      ) : null}
    </>
  );
};
