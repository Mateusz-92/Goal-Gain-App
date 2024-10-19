import { Flex } from '@chakra-ui/react';

import { MonthAnswerList } from './components/habits/MonthAnswerList/MonthAnswerList';

export const Showcase = () => {
  return (
    <>
      <Flex alignItems='center' direction='column'>
        <div>Showcase page</div>

        <MonthAnswerList />
      </Flex>
    </>
  );
};
