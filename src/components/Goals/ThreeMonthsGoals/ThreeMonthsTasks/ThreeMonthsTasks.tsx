import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { MinusIcon } from '@chakra-ui/icons';
import { Box, Checkbox, Container, IconButton, VStack } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import Btn from '../../../../UI/Btn/Btn';
import { TextForm } from '../../../Forms/TextForm/TextForm';

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
              <TextForm
                control={control}
                isInput={true}
                type='Date'
                {...register(`${nestedTaskName}.${i}.finishDate`)}
              />
              {isDisplay && (
                <Checkbox
                  _hover={{ opacity: 0.8 }}
                  alignSelf={'center'}
                  bg={'transparent'}
                  borderColor='var(--dark-gray)'
                  color='var(--dark-gray)'
                  colorScheme='transparent'
                  iconColor='black'
                  justifyItems={'end'}
                  ml='5px'
                  {...register(`${nestedTaskName}.${i}.isEnded`)}
                />
              )}
            </Container>
          </Container>
          <IconButton
            alignItems={'center'}
            aria-label='MinusIcon'
            bg='black'
            borderColor='black'
            borderRadius='15px'
            borderWidth='1px'
            color='var(--light-gray)'
            icon={<MinusIcon />}
            size='lg'
            width={'25%'}
            _hover={{
              bg: 'transparent',
              borderColor: 'black',
              borderWidth: '1px',
              color: 'black',
            }}
            onClick={() => remove(i)}
          />
        </Container>
      ))}

      <VStack alignItems='center' mt={'10px'}>
        <Btn text='Dodaj zadanie' type='button' onClick={() => append({ ...DEFAULT_TASK_MODEL })} />
      </VStack>
    </Box>
  );
};

export default ThreeMonthsTasks;
