import { FieldArrayWithId, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Container, Input, Text, Textarea } from '@chakra-ui/react';

import { days } from '../../../constants';
import { WeekPlannerData } from '../../../validators/validators';

type WeekHeaderProps = {
  date: string;
  errors: FieldErrors<WeekPlannerData>;
  field: FieldArrayWithId<WeekPlannerData, 'days', 'id'>;
  index: number;
  register: UseFormRegister<WeekPlannerData>;
};

export const WeekHeader = ({ date, errors, field, index, register }: WeekHeaderProps) => {
  const isError = errors && errors.days && errors.days[index];
  return (
    <Container key={field.id}>
      <Text textAlign={'center'}>{days[index]}</Text>
      <Input
        readOnly
        borderColor='transparent'
        focusBorderColor='transparent'
        textAlign='center'
        value={date}
        _focus={{
          borderColor: 'transparent',
        }}
        _focusVisible={{
          outline: 'none',
        }}
        _hover={{
          borderColor: 'transparent',
        }}
        {...register(`days.${index}.date`)}
      />

      <Textarea
        bg='white'
        border='2px solid'
        borderColor={'transparent'}
        borderRadius='15px'
        textAlign={'center'}
        _focus={{
          borderColor: 'var(--dark-gray)',
        }}
        _focusVisible={{
          outline: 'none',
        }}
        {...register(`days.${index}.plan`)}
      />
      {isError
? <Text color={'red'}>{isError.plan?.message}</Text>
: null}
    </Container>
  );
};
