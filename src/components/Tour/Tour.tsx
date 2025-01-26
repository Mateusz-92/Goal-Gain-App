import { useState } from 'react';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

import { BoxWrapper } from '../../UI/BoxWrapper/BoxWrapper';
import Btn from '../../UI/Btn/Btn';
import { MonthlyChart } from '../Charts/MonthlyChart/MonthlyChart';
import { PointsChartPage } from '../Charts/PagesCharts/PointsChartPage/PointsChartPage';
import { SavingChart } from '../Charts/SavingsChart/SavingChart';
import { WeeklyRateChart } from '../Charts/WeeklyRateChart/WeeklyRateChart';
import ThreeMonthsGoalsPlanner from '../Goals/ThreeMonthsGoals/ThreeMonthsGoalsPlanner/ThreeMonthsGoalsPlanner';
import WeekPlanner from '../Goals/WeekPlanner/WeekPlaner';
import HabitsEditor from '../habits/HabitsEditor/HabitsEditor';
import { MonthAnswerList } from '../habits/MonthAnswerList/MonthAnswerList';
import GoalPlannerList from '../ListDataEditor/GoalsPlannerList/GoalsPlannerList';
import { MonthEndedAnswerList } from '../ListDataEditor/MonthEndedAnswerList/MonthEndedAnswerList';
import WeekPlannerDataListData from '../ListDataEditor/WeekPlanerListData/WeekPlanerListData';
import MonthlyRating from '../Ratings/MothlyRating/MonthlyRating';
import Roulette from '../Roulette/Roulette';
import ChoiceVariant from '../SavingScratch/ChoiceVariant/ChoiceVariant';
import CircleList from '../SavingScratch/CircleList/CircleList';
import { TutorialHabitChart } from '../Tutorial/TutorialHabitChart/TutorialHabitChart';
import { TutorialHabitTracker } from '../Tutorial/TutorialHabitTracker/TutorialHabitTracker';

import { DUUMY_MONTHLY_POINTS, DUUMY_WEEKLY_POINTS, STEPS } from './helpers';

export const Tour = () => {
  const navigate = useNavigate();
  const [run, setRun] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
    if (action === 'next') {
      handleNext();
    }
    if (action === 'prev') {
      handlePrev();
    }
  };

  const renderCurrentComponent = () => {
    switch (currentStep) {
      case 0:
        return <MonthAnswerList />;

      case 1:
        return <MonthEndedAnswerList isTutorialMode={true} />;
      // podstawic dummy komponent
      case 2:
        return <ThreeMonthsGoalsPlanner mode='add' />;
      case 3:
        return <GoalPlannerList isTutorialMode={true} />;
      // podstawic dummy komponent

      case 4:
        return <WeekPlanner mode='add' />;
      case 5:
        return <WeekPlannerDataListData isTutorialMode={true} />;
      // podstawic dummy komponent

      case 6:
        return <HabitsEditor isTutorial={true} />;
      case 7:
        return <TutorialHabitTracker />;
      // podstawic dummy komponent

      case 8:
        return <ChoiceVariant />;
      case 9:
        return <CircleList isTutorialMode={true} />;
      // podstawic dummy komponent

      case 10:
        return <Roulette />;
      case 11:
        return <MonthlyRating mode='edit' />;
      case 12:
        return <TutorialHabitChart />;

      case 13:
        return (
          <SavingChart
            crossOutSavings={[100, 200, 400]}
            rouletteSavings={[10, 50, 50]}
            totalSavings={[110, 250, 450]}
          />
        );

      case 14:
        return <WeeklyRateChart data={DUUMY_WEEKLY_POINTS} />;

      case 15:
        return <MonthlyChart data={DUUMY_MONTHLY_POINTS} />;

      case 16:
        return <PointsChartPage isTutorial={true} />;

      default:
        return null;
    }
  };

  return (
    <Box
      alignItems='center'
      className='transparent-bg'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      minH={'100vh'}
      p={2}
    >
      <Flex alignItems='center' gap={2} justify={'center'} mb={4}>
        <Btn
          type='button'
          text={currentStep === 0
? 'Zaczynamy!'
: 'Opis kroku'}
          onClick={() => setRun(true)}
        />
        <Btn text='Strona główna' type='button' onClick={() => navigate('/')} />
      </Flex>

      <BoxWrapper>{renderCurrentComponent()}</BoxWrapper>
      <Flex mt={4} />
      <Joyride
        continuous
        callback={handleJoyrideCallback}
        run={run}
        showSkipButton={false}
        steps={STEPS}
        styles={{
          options: {
            arrowColor: 'var(--orange)',
            primaryColor: 'var(--orange)',
            zIndex: 10000,
          },
        }}
      />
    </Box>
  );
};
