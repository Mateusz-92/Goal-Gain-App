import { Flex } from '@chakra-ui/react';

import { TutorialComponent } from './components/Tutorial/TutorialComponent/TutorialComponent';

export const Showcase = () => {
  return (
    <>
      <Flex alignItems='center' direction='column'>
        <div>Showcase page</div>
        <TutorialComponent />
        {/* <MobileView /> */}
        {/* <MonthEndedAnswerList /> */}
        {/* <MonthAnswerList /> */}
        {/* <Loader /> */}
        {/* <RedirectBox href='/' text='Nie masz utworzonych nawyków w tym miesiącu ' /> */}
        {/* <TutorialSlider /> */}
      </Flex>
    </>
  );
};
