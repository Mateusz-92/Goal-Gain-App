import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { Box, Container, VStack } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import Btn from '../../../../UI/Btn/Btn';
import { CustomCheckbox } from '../../../../UI/Forms/CustomCheckbox/CustomCheckbox';
import { TextForm } from '../../../../UI/Forms/TextForm/TextForm';

export const DEFAULT_TASK_MODEL = {
  finishDate: '',
  id: uuidv4(),
  isEnded: false,
  name: '',
};

const ThreeMonthsTasks: React.FC<{
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  control: Control<any>;
  isDisplay?: boolean;
  nestedTaskName: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  register: any;
}> = ({ control, isDisplay, nestedTaskName, register }) => {
  const { append, fields, remove } = useFieldArray({
    control,
    name: nestedTaskName,
  });
  const countValue: number = 1;

  return (
    <Box>
      {fields.map((task, i) => (
        <Container
          key={task.id}
          alignItems={'center'}
          display='flex'
          flexDirection={'column'}
          justifyContent='center'
          padding={'0px'}
        >
          <Container padding={'0px'}>
            <TextForm
              control={control}
              isInput={true}
              label={`Zadanie ${i + countValue}`}
              placeholder={'Wpisz zadanie'}
              {...register(`${nestedTaskName}.${i}.name`)}
            />
            <Container display='flex' justifyContent='space-between' padding={'0px'} width={'100%'}>
              <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                <TextForm
                  control={control}
                  isInput={true}
                  type='Date'
                  {...register(`${nestedTaskName}.${i}.finishDate`)}
                />
                {isDisplay && (
                  <CustomCheckbox
                    control={control}
                    {...register(`${nestedTaskName}.${i}.isEnded`)}
                    text='Zaznacz jeśli ukończyłeś'
                  />
                )}
              </Box>
            </Container>
          </Container>
          <Btn text={`Usuń zadanie  ${i + 1}`} type='button' onClick={() => remove(i)} />
        </Container>
      ))}

      <VStack alignItems='center' mt={'10px'}>
        <Btn text='Dodaj zadanie' type='button' onClick={() => append({ ...DEFAULT_TASK_MODEL })} />
      </VStack>
    </Box>
  );
};

export default ThreeMonthsTasks;
