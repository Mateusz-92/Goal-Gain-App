import { useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

import { BoxWrapper } from '../../../UI/BoxWrapper/BoxWrapper';
import Btn from '../../../UI/Btn/Btn';
import { HabitChartPages } from '../../Charts/PagesCharts/HabitsChartsPage/HabitsChartsPages';
import { MonthlyRateChartPage } from '../../Charts/PagesCharts/MonthlyRateChartPage/MonthlyRateChartPage';
import { PointsChartPage } from '../../Charts/PagesCharts/PointsChartPage/PointsChartPage';
import { SavingChartPage } from '../../Charts/PagesCharts/SavingsChartPage/SavingChartPage';
import { WeeklyRateChartPage } from '../../Charts/PagesCharts/WeeklyRateChartPage/WeeklyRateChartPage';
import ThreeMonthsGoalsPlanner from '../../Goals/ThreeMonthsGoals/ThreeMonthsGoalsPlanner/ThreeMonthsGoalsPlanner';
import WeekPlanner from '../../Goals/WeekPlanner/WeekPlaner';
import HabitsEditor from '../../habits/HabitsEditor/HabitsEditor';
import HabitsTracker from '../../habits/HabitsTracker/HabitsTracker';
import { MonthAnswerList } from '../../habits/MonthAnswerList/MonthAnswerList';
import GoalPlannerList from '../../ListDataEditor/GoalsPlannerList/GoalsPlannerList';
import { MonthEndedAnswerList } from '../../ListDataEditor/MonthEndedAnswerList/MonthEndedAnswerList';
import WeekPlannerDataListData from '../../ListDataEditor/WeekPlanerListData/WeekPlanerListData';
import MonthlyRating from '../../Ratings/MothlyRating/MonthlyRating';
import Roulette from '../../Roulette/Roulette';
import ChoiceVariant from '../../SavingScratch/ChoiceVariant/ChoiceVariant';
import SavingsComponent from '../../SavingScratch/SavingsComponent/SavingsComponent';

export const Tour = () => {
  const navigate = useNavigate();
  const [run, setRun] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      content:
        'W tym miejscu pracujesz nad pytaniem, na które odpowiadasz każdego dnia danego miesiąca, możesz dodać 1 odpowiedź dziennie, która jest edytowalna danego dnia. Przed dodaniem pierwszej odpowiedzi tworzysz pytanie (np. Co dziś mnie zadowoliło?) Każda odpowiedź to puntky na twoje konto :-) Aby wejść w tę podstronę wybierz w menu Pytanie miesiąca / Aktualny miesiąc',
      disableBeacon: true,
      target: '.step-1-monthAnswerList',
    },
    {
      content:
        'Przed tobą widok wszystkich utworzonych i ukonczonych list z pytaniami miesiąca, widać w niej miesiąc, którego dotyczą odpowiedzi i przycisk edycji/podglądu ( tabelę z odpowiedziami). Aby wejść w tę podstronę wybierz w menu Pytanie miesiąca / Lista odpowiedzi miesięcznych',
      target: '.step-2-monthEndedAnswerList',
    },
    {
      content:
        'Kreator celów 3 miesięcznych to miejscie gdzie wytyczasz najważniejsze dla Ciebie cele na najbliższe 3 miesiące określając przy tym zadania, które należy wykonać aby osiągnąc dany cel, określasz termin ich wykonania. Przy planowaniu celu określamy również korzyści jakie nam przyniesie oraz blokady (przeszkody), które mogą być utrudnieniem w jego realizacji.  Aby wejść w tę podstronę wybierz w menu Cele / Kreator celów 3-miesięcznych',
      target: '.step-3-threeMonthsGoalsPlanner',
    },
    {
      content:
        'Widok listy z dostępem do wszystkich kiedykolwiek utwrzonych celów 3 miesięcznych z możliwością ich podglądu i edycji. Aby wejść w tę podstronę wybierz w menu Cele / List Twoich celów 3-miesięcznych ',
      target: '.step-4-GoalsList',
    },
    {
      content:
        'Tutaj jesteś Twórcą swoich planów tygodniowych, w których wyznaczasz 3 najważniejsze cele do realizacji na dany tydzień. Możesz tutaj zapisać też rzeczy godne przypomnienia :-) Na koniec tygodnia oceniasz swój tydzień w skali 1-10 wraz z jej argumentacją.  Aby wejść w tę podstronę wybierz w menu Cele / Zaplanuj cele tygodniowe ',
      target: '.step-5-WeekPlanner',
    },
    {
      content:
        'Jak w poprzednich edytorach tutaj również mamy listę utworzonych planów tygodniowych, która jest edytowalna.  Aby wejść w tę podstronę wybierz w menu Cele / Lista planów tygodniowych',
      target: '.step-6-WeekPlannerList',
    },
    {
      content:
        'Za pomocą tego edytora, możesz utworzyć maksymalnie 4 nawyki nad którymi będziesz pracował danego miesiąca.  Aby wejść w tę podstronę wybierz w menu Nawyki / Kreator nawyków',
      target: '.step-7-habits-editor',
    },
    {
      content:
        'Jesteś w miejscu gdzie zaznaczasz wykonanie danego nawyku danego dnia. Aby wejść w tę podstronę wybierz w menu Nawyki / Nawyki',
      target: '.step-8-habits-tracker',
    },
    {
      content:
        'Goal Gain App to także miejsce gdzie zadbasz o swoje oszczędności. Wykreślnka jest jednym z proponowanych sposobów na oszczędzanie w przyjemny sposób - w tym miejscu tworzysz wykreślankę z kwotą jaką chcesz odłożyć ( każdy wariant zawiera 33 pola z kwotami) Aby wejść w tę podstronę wybierz w menu Twoje wykreślanki / Kreator wykreślanki ',
      target: '.step-9-cross-out-variant',
    },
    {
      content:
        'W tym miejscu skreślasz wybrane kwoty i odkładasz do skarbonki ( podgląd oszczędności w panelu użytkownika). Nie zapomnij odłożyć skreślonej kwoty do rzeczywistej skarbonki ;-)  Aby wejść w tę podstronę wybierz w menu Oszczędności / Twoje wykreślanki / przycisk edycji z wybranym wariantem',
      target: '.step-10-cross-out-saving',
    },
    {
      content:
        'W tej odmianie ruletki odkładasz do skarbonki wylosowaną kwotę.  Aby wejść w tę podstronę wybierz w menu Oszczędności / Ruletka',
      target: '.step-11-roulette',
    },
    {
      content:
        'Kwestonariusz oceny miesiąca ze skalą oceny miesiąca pozwala podsumować i analizować nasz postęp.  Aby wejść w tę podstronę wybierz w menu Oceny / Ocena miesięczna. Analogicznie jak w poprzednich edytorach jest lista utworzonych ocen miesięcznych -  Aby wejść w nią w menu  wybierz Oceny/ Lista ocen miesięcznych ',
      target: '.step-12-monthly-rating',
    },
    {
      content:
        'W aplikacji możesz również śledzić swoje osiągniecia w postaci wykresów. Oto pierwszy z nich - wykres wykonanych nawyków dla danego miesiąca. Aby wejść w tę podstronę wybierz w menu Wykresy / Nawyki w danym miesiącu',
      target: '.step-13-habit-chart',
    },

    {
      content:
        'Przd Tobą wykres oszczędności- to wykres pokazujący ile i w jaki sposób oszczędziłeś w danym miesiącu oraz sumę oszczędności danego miesiąca. Aby wejść w tę podstronę wybierz w menu Wykresy / Oszczędności',
      target: '.step-15-savings-chart',
    },
    {
      content:
        'Wykres pokazujący ocenę tygodnia dla danego tygodnia. Na osi x przedstawione są kolejne tygodnie roku. Aby wejść w tę podstronę wybierz w menu Wykresy / Oceny tygodniowe',
      target: '.step-16-weekly-rate-chart',
    },
    {
      content:
        'Kolejny wykres pokazuje ocene miesięczną dla każdego miesiąca w roku. Aby wejść w tę podstronę wybierz w menu Wykresy / Oceny miesięczne',
      target: '.step-17-monthly-rate-chart',
    },
    {
      content:
        'W tym miejscu pokazujemy wszystkie punkty, które zdobyłeś w danym miesiącu. Aby wejść w tę podstronę wybierz w menu Wykresy / Zdobyte punkty',
      target: '.step-18-points-chart',
    },
  ];
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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
        return <MonthEndedAnswerList />;
      case 2:
        return <ThreeMonthsGoalsPlanner mode='add' />;
      case 3:
        return <GoalPlannerList />;
      case 4:
        return <WeekPlanner mode='add' />;
      case 5:
        return <WeekPlannerDataListData />;
      case 6:
        return <HabitsEditor />;
      case 7:
        return <HabitsTracker />;
      case 8:
        return <ChoiceVariant />;
      case 9:
        return <SavingsComponent />;
      case 10:
        return <Roulette />;
      case 11:
        return <MonthlyRating mode='edit' />;
      case 12:
        return <HabitChartPages />;
      case 13:
        return <SavingChartPage />;
      case 14:
        return <WeeklyRateChartPage />;
      case 15:
        return <MonthlyRateChartPage />;
      case 16:
        return <PointsChartPage />;

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
        steps={steps}
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
