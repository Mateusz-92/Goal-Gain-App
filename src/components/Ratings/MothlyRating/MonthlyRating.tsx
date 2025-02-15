import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useBlocker, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { indexNum } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { useAddUserPoints, useEditMonthRate } from '../../../firebase/mutations';
import { useGetMonthlyEvaluation } from '../../../firebase/queries';
import Btn from '../../../UI/Btn/Btn';
import { TextForm } from '../../../UI/Forms/TextForm/TextForm';
import { MonthlyRatingData, MonthlyValuesRatingSchema } from '../../../validators/validators';
import Loader from '../../Loader/Loader';
import ModalApp from '../../Modal/ModalApp';

type MonthlyRating = {
  date: string;
  explanationOfRate: string;
  lessonOfLife: string;
  monthsRate: string;
  theBiggestChalange: string;
  value: string;
};
type MonthRateProps = { mode: 'add' | 'edit' };

const arrRadioLength: number = 10;
const DEAFAULT_RATING_MODEL: MonthlyRating = {
  date: '',
  explanationOfRate: '',
  lessonOfLife: '',
  monthsRate: '',
  theBiggestChalange: '',
  value: '',
};

const MonthlyRating = ({ mode }: MonthRateProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { monthId } = useParams();
  const { userId } = useAuth();
  const { data, isError, isLoading } = useGetMonthlyEvaluation(monthId || '', userId, mode);
  const editMonthRateWithId = useEditMonthRate(userId, monthId);
  const editMonthRateWithoutId = useEditMonthRate(userId);
  const { mutate: onAddUserPoints } = useAddUserPoints(userId);

  const onAddMonthRateMutation = monthId ? editMonthRateWithId : editMonthRateWithoutId;

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<MonthlyValuesRatingSchema>({
    defaultValues: DEAFAULT_RATING_MODEL,
    resolver: zodResolver(MonthlyRatingData),
  });

  const onSubmit = async (formData: MonthlyValuesRatingSchema) => {
    await onAddMonthRateMutation.mutate(formData, {
      onSuccess: () => {
        if (mode === 'add') {
          reset(DEAFAULT_RATING_MODEL);
        }
      },
    });

    onClose();
  };
  const value = watch('value');
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname,
  );
  useEffect(() => {
    if (mode === 'add') {
      reset(DEAFAULT_RATING_MODEL);
    }
    if (data) {
      setValue('date', data.date);
      setValue('explanationOfRate', data.explanationOfRate);
      setValue('lessonOfLife', data.lessonOfLife);
      setValue('monthsRate', data.monthsRate);
      setValue('theBiggestChalange', data.theBiggestChalange);
      setValue('value', data.value);
      reset(data);
    }
  }, [data, setValue, reset]);
  const handleSave = handleSubmit(() => {
    onOpen();
  });
  const handleAddDataAndPoints = () => {
    handleSubmit(onSubmit)();
    if (!monthId) onAddUserPoints({ points: 25 });
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Coś poszło nie tak</div>;
  }
  return (
    <Box className='step-12-monthly-rating'>
      <Heading mb={15} textAlign={'center'}>
        Ocena miesiąca
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Text fontWeight={'bold'} textAlign={'center'}>
            Miesiąc
          </Text>
          <TextForm
            control={control}
            isInput={true}
            placeholder='data'
            type='date'
            {...register(`date`)}
          />
        </Container>

        <Box mb={4}>
          <Text fontWeight={'bold'} textAlign={'center'}>
            Ocena miesięczna
          </Text>
          <Flex alignItems='center' direction={'column'} justifyContent='center'>
            <RadioGroup mb={5} mt={5} value={value} onChange={(value) => setValue('value', value)}>
              {[...Array(arrRadioLength)].map((_, index) => (
                <Radio
                  colorScheme='white'
                  {...register(`value`)}
                  // key={index}
                  key={`radio_${Math.random()}`}
                  mx={1}
                  value={String(index + indexNum)}
                >
                  {index + indexNum}
                </Radio>
              ))}
            </RadioGroup>
            {errors.value && <Text color={'red'}>{errors.value.message}</Text>}
          </Flex>

          <TextForm
            control={control}
            isInput={false}
            placeholder={'Uzasadnienie oceny...'}
            {...register(`monthsRate`)}
          />
        </Box>
        <Box>
          <TextForm
            control={control}
            isInput={false}
            placeholder='Opisz lekcję życia'
            label={
              'Jak oceniasz swoje postępy na kwartalnymi celami? W czym udało Ci się posunąć naprzód, a w czym nie ? Dlaczego? Oceń czy jesteś na dobrej drodze do zrealizowania swoich kwartalnych celów'
            }
            {...register(`explanationOfRate`)}
          />
        </Box>

        <TextForm
          control={control}
          isInput={false}
          label={'Co było Twoim największym wyznaniem? Jak udało Ci się z nim poradzić?'}
          placeholder='Największe wyzwanie'
          {...register(`theBiggestChalange`)}
        />

        <TextForm
          control={control}
          isInput={false}
          label={'Czego nauczył Cię ten miesiąc?'}
          placeholder='Opisz krótko najcenniejsze doświadczenpia z tego miesiąca'
          {...register(`lessonOfLife`)}
        />
        <Flex justify='center' mt={4}>
          <Btn text='Zapisz' type='button' onClick={handleSave} />
        </Flex>
        <ModalApp
          body={`Potwierdź, aby dodać dane`}
          cancelText='Anuluj'
          confirmText='Tak'
          header='Czy chcesz dodać/ edytować dane?'
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleAddDataAndPoints}
        />
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
    </Box>
  );
};

export default MonthlyRating;
