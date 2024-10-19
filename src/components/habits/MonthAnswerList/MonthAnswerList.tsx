import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parse } from 'date-fns';

import { useAuth } from '../../../context/AuthContext';
import {} from // fetchMonthAnswerQuestionData,
'../../../firebase/Api';
import { useAddCurrentAnswerForMonthQuestion } from '../../../firebase/mutations';
import { useGetCurrentMonthAnswerQuestion } from '../../../firebase/queries';
import { monthAnswerData, monthAnswerSchema } from '../../../validators/validators';
import { TextForm } from '../../Forms/TextForm/TextForm';
const currentDay = format(new Date(), 'dd.MM.yyyy');

const DEFAULT_ANSWER_MODEL = {
  date: currentDay,
  // id: "",
  text: '',
  // date: new Date().toISOString().split("T")[0],
};

// type FormData = {
//   answers: (typeof DEFAULT_ANSWER_MODEL)[];
//   month: string;
//   questionTitle: string;
//   userId: string;
// };

export const MonthAnswerList = () => {
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { data, isError, isLoading } = useGetCurrentMonthAnswerQuestion(userId);
  const answerDataId = data?.id || '';
  const editAnswerQuestionWithId = useAddCurrentAnswerForMonthQuestion(answerDataId);
  const editAnswerQuestionWithoutId = useAddCurrentAnswerForMonthQuestion();
  const [canUserAddAnswer, setCanUserAddAnswer] = useState(true);

  const { control, handleSubmit, register, setValue } = useForm<monthAnswerData>({
    defaultValues: {
      answers: [],
      id: '',
      month: format(new Date(), 'MM.yyyy'),
      questionTitle: '',
      userId: userId,
    },
    resolver: zodResolver(monthAnswerSchema),
  });
  useEffect(() => {
    if (data) {
      setValue('questionTitle', data.questionTitle);
      setValue('month', data.month);
      setValue('answers', data.answers);
      setValue('userId', data.userId);
    }
  }, [data, setValue]);
  const onSubmit = async (formData: monthAnswerData) => {
    if (answerDataId) {
      editAnswerQuestionWithId.mutate(formData);
    } else {
      editAnswerQuestionWithoutId.mutate(formData);
    }
  };
  const { append, fields } = useFieldArray({ control, name: 'answers' });

  const handleAddNext = () => {
    setCanUserAddAnswer(false);
    append(DEFAULT_ANSWER_MODEL);
  };
  if (isLoading) {
    return <div>isLoading</div>;
  }
  if (isError) {
    return <div>isError</div>;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextForm
        control={control}
        isInput={true}
        placeholder={'Wpisz Pytanie miesiąca'}
        isDisabled={data?.questionTitle
? true
: false}
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
      <Button
        isDisabled={data?.answers.some((answer) => answer.date === currentDay) || !canUserAddAnswer}
        type='button'
        onClick={handleAddNext}
      >
        Dodaj odpowiedź
      </Button>
      <Button type='submit'>Wyślij </Button>
    </form>
  );
};
