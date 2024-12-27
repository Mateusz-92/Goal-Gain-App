import { v4 as uuidv4 } from 'uuid';

import goalScreen2 from '../src/assets/tutorial/cel2.jpeg';
import goalScreen3 from '../src/assets/tutorial/cel3.jpeg';
import goalScreen1 from '../src/assets/tutorial/cele1.jpeg';
import menuScreen from '../src/assets/tutorial/menu_tutorial.jpeg';
import habitScreen from '../src/assets/tutorial/nawyki.jpeg';
import questionScreen from '../src/assets/tutorial/pytanie_miesiaca.jpeg';
import rouletteScreen from '../src/assets/tutorial/ruletka.jpeg';
import habitTableScreen from '../src/assets/tutorial/tabelaNawyków.jpeg';
import crossoutVariantScreen from '../src/assets/tutorial/variantOszczędności.jpeg';
import crossoutScreen from '../src/assets/tutorial/wykreślanka.jpeg';

import { TutorialProps } from './components/Tutorial/TutorialStepper/TutorialStepper';
import { ammountBord, OptionRoulette } from './types';
export const dummyAvatarIcon =
  'https://static.vecteezy.com/system/resources/previews/007/319/933/non_2x/black-avatar-person-icons-user-profile-icon-vector.jpg';

export const months = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

export const days: string[] = [
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
  'Niedziela',
];
export const indexNum: number = 1;
export const variant2000: ammountBord[] = [
  { id: uuidv4(), isCrossOut: false, value: 30 },
  { id: uuidv4(), isCrossOut: false, value: 110 },
  { id: uuidv4(), isCrossOut: false, value: 24 },
  { id: uuidv4(), isCrossOut: false, value: 47 },
  { id: uuidv4(), isCrossOut: false, value: 55 },
  { id: uuidv4(), isCrossOut: false, value: 10 },
  { id: uuidv4(), isCrossOut: false, value: 82 },
  { id: uuidv4(), isCrossOut: false, value: 25 },
  { id: uuidv4(), isCrossOut: false, value: 65 },
  { id: uuidv4(), isCrossOut: false, value: 120 },
  { id: uuidv4(), isCrossOut: false, value: 23 },
  { id: uuidv4(), isCrossOut: false, value: 53 },
  { id: uuidv4(), isCrossOut: false, value: 15 },
  { id: uuidv4(), isCrossOut: false, value: 90 },
  { id: uuidv4(), isCrossOut: false, value: 34 },
  { id: uuidv4(), isCrossOut: false, value: 61 },
  { id: uuidv4(), isCrossOut: false, value: 70 },
  { id: uuidv4(), isCrossOut: false, value: 100 },
  { id: uuidv4(), isCrossOut: false, value: 42 },
  { id: uuidv4(), isCrossOut: false, value: 50 },
  { id: uuidv4(), isCrossOut: false, value: 74 },
  { id: uuidv4(), isCrossOut: false, value: 40 },
  { id: uuidv4(), isCrossOut: false, value: 77 },
  { id: uuidv4(), isCrossOut: false, value: 20 },
  { id: uuidv4(), isCrossOut: false, value: 95 },
  { id: uuidv4(), isCrossOut: false, value: 22 },
  { id: uuidv4(), isCrossOut: false, value: 85 },
  { id: uuidv4(), isCrossOut: false, value: 12 },
  { id: uuidv4(), isCrossOut: false, value: 80 },
  { id: uuidv4(), isCrossOut: false, value: 38 },
  { id: uuidv4(), isCrossOut: false, value: 60 },
  { id: uuidv4(), isCrossOut: false, value: 91 },
  { id: uuidv4(), isCrossOut: false, value: 200 },
];

// Poprawione variant3000 z sumą równą 3000
export const variant3000: ammountBord[] = [
  { id: uuidv4(), isCrossOut: false, value: 55 },
  { id: uuidv4(), isCrossOut: false, value: 150 },
  { id: uuidv4(), isCrossOut: false, value: 50 },
  { id: uuidv4(), isCrossOut: false, value: 85 },
  { id: uuidv4(), isCrossOut: false, value: 90 },
  { id: uuidv4(), isCrossOut: false, value: 35 },
  { id: uuidv4(), isCrossOut: false, value: 110 },
  { id: uuidv4(), isCrossOut: false, value: 40 },
  { id: uuidv4(), isCrossOut: false, value: 100 },
  { id: uuidv4(), isCrossOut: false, value: 160 },
  { id: uuidv4(), isCrossOut: false, value: 45 },
  { id: uuidv4(), isCrossOut: false, value: 80 },
  { id: uuidv4(), isCrossOut: false, value: 45 },
  { id: uuidv4(), isCrossOut: false, value: 120 },
  { id: uuidv4(), isCrossOut: false, value: 55 },
  { id: uuidv4(), isCrossOut: false, value: 90 },
  { id: uuidv4(), isCrossOut: false, value: 120 },
  { id: uuidv4(), isCrossOut: false, value: 130 },
  { id: uuidv4(), isCrossOut: false, value: 75 },
  { id: uuidv4(), isCrossOut: false, value: 85 },
  { id: uuidv4(), isCrossOut: false, value: 110 },
  { id: uuidv4(), isCrossOut: false, value: 80 },
  { id: uuidv4(), isCrossOut: false, value: 125 },
  { id: uuidv4(), isCrossOut: false, value: 55 },
  { id: uuidv4(), isCrossOut: false, value: 140 },
  { id: uuidv4(), isCrossOut: false, value: 50 },
  { id: uuidv4(), isCrossOut: false, value: 100 },
  { id: uuidv4(), isCrossOut: false, value: 30 },
  { id: uuidv4(), isCrossOut: false, value: 130 },
  { id: uuidv4(), isCrossOut: false, value: 60 },
  { id: uuidv4(), isCrossOut: false, value: 90 },
  { id: uuidv4(), isCrossOut: false, value: 150 },
  { id: uuidv4(), isCrossOut: false, value: 160 },
];

// Poprawione variant4000 z sumą równą 4000
export const variant4000: ammountBord[] = [
  { id: uuidv4(), isCrossOut: false, value: 100 },
  { id: uuidv4(), isCrossOut: false, value: 160 },
  { id: uuidv4(), isCrossOut: false, value: 50 },
  { id: uuidv4(), isCrossOut: false, value: 100 },
  { id: uuidv4(), isCrossOut: false, value: 125 },
  { id: uuidv4(), isCrossOut: false, value: 50 },
  { id: uuidv4(), isCrossOut: false, value: 140 },
  { id: uuidv4(), isCrossOut: false, value: 100 },
  { id: uuidv4(), isCrossOut: false, value: 120 },
  { id: uuidv4(), isCrossOut: false, value: 200 },
  { id: uuidv4(), isCrossOut: false, value: 100 },
  { id: uuidv4(), isCrossOut: false, value: 90 },
  { id: uuidv4(), isCrossOut: false, value: 100 },
  { id: uuidv4(), isCrossOut: false, value: 150 },
  { id: uuidv4(), isCrossOut: false, value: 75 },
  { id: uuidv4(), isCrossOut: false, value: 140 },
  { id: uuidv4(), isCrossOut: false, value: 160 },
  { id: uuidv4(), isCrossOut: false, value: 180 },
  { id: uuidv4(), isCrossOut: false, value: 90 },
  { id: uuidv4(), isCrossOut: false, value: 110 },
  { id: uuidv4(), isCrossOut: false, value: 150 },
  { id: uuidv4(), isCrossOut: false, value: 80 },
  { id: uuidv4(), isCrossOut: false, value: 160 },
  { id: uuidv4(), isCrossOut: false, value: 50 },
  { id: uuidv4(), isCrossOut: false, value: 170 },
  { id: uuidv4(), isCrossOut: false, value: 50 },
  { id: uuidv4(), isCrossOut: false, value: 130 },
  { id: uuidv4(), isCrossOut: false, value: 85 },
  { id: uuidv4(), isCrossOut: false, value: 150 },
  { id: uuidv4(), isCrossOut: false, value: 85 },
  { id: uuidv4(), isCrossOut: false, value: 150 },
  { id: uuidv4(), isCrossOut: false, value: 200 },
  { id: uuidv4(), isCrossOut: false, value: 200 },
];

export const rouletteAmount: OptionRoulette[] = [
  { option: '1' },
  { option: '2' },
  { option: '5' },
  { option: '10' },
  { option: '15' },
  { option: '20' },
  { option: '30' },
  { option: '50' },
  { option: '100' },
];

// TODO change to translations
const menuDescirption =
  'Menu aplikacji składa się z 7 przycisków widocznych na zdjęciu. Każdy z nich ma swoją określoną rolę w aplikacji GoalGainApp.';
const questionDescirption =
  ' W tym miejscu określasz pytanie, na które będziesz odpowiadał każdego dnia w danym miesiącu ( np. Jaką drobną rzecz zrobiłem dziś dla siebie ?). Odnośnik aktualny miesiąc przenosi Cię do miejsca gdzie tworzysz pytanie i na nie odpowiadasz, odnośnik lista odpowiedzi miesięcznych przenosi Cię do całej historii wszystkich stworzonych odpowiedzi z poprzednich miesięcy.';
const goalDescirption =
  'Cele zawierają 4 odnośniki ( kreator celów-3 miesięcznych, lista twoich celów 3-miesięcznych, zaplanuj cele tygodniowe, lista planów tygdoniowych. Mamy więc tutaj 2 kreatory i 2 listy do śledzenia historii celów, planów.';
const habitDescirption =
  'Nawyki( składają sie z kreatora nawyków, gdzie może utworzyć maksymalnie 4 nawyki oraz z tablicą nawyków ( jako przycisk z nazwą nawyki) na której zaznaczamy czy danego dnia wykonaliśmy nawyk, który chcemy wypracować.';
const savingsDescription =
  ' Oszczędności, w tej zakładce mamy 2 odnośniki ( kreator wykreślanki, twoja wykreślanka oraz ruletka). W kreatorze wybieramy wariant kwoty do wykreślenia, w odnośniku Twoja wykreślanka przenosimy się do miejsca gdzie zaznaczamy wybrane kwoty, natomiast w ruletce losujemy kwotę, którą odłożymy. Podgląd odłożonych kwot widzimy w panelu użytkownika poniżej Menu.';
const mainDescripion =
  'W tym samoczuczku postaram się w prosty sposób przeprowadzić Cię przez możliwości jakie daje aplikacja GoalGainApp, dzięki której będziesz mieć możliwość realizować swoje cele (osobiste, rozwojowe, finansowe) mając przy tym wgląd na swoje osiągnięcia.';
const levelsDescription = `
  Poziomy użytkownika:
  Brązowy Nowicjusz - do 100 punktów,
  Srebrny Entuzjasta - od 100 do 250 punktów,
  Złoty Odkrywca - od 250 do 500 punktów,
  Platynowy Wyzwaniec - od 500 do 750 punktów,
  Diamentowy Mistrz - od 750 do 1000 punktów,
  Boski Arcymistrz - od 1500 punktów.
 `;
const pointsDescription = ` Opis punktacji :
  utworzenie pytania miesiąca - 5 punktów,
  odpowiedź na pytanie miesiąca - 5 punktów,
  utworzenie celów 3-miesięcznych - 25 punktów,
  utworzenie celów tygodniowych - 25 punktów,
  realizacja celu tygodniowego - 10 punktów,
  wykonanie nawyku - 2 punkty`;
const endDescription =
  'Myślę, że ten krótki samouczek uświadomił Ci funkcje aplikacji GoalGainApp Jestem przekonany, że to narzędzie pozwoli Ci na uporządkowanie Twojego działania w określonym kierunku :-).';
export const tutorialData: TutorialProps = {
  dataTutorial: [
    {
      description: mainDescripion,
      src: '',
    },
    {
      description: menuDescirption,
      src: menuScreen,
    },
    {
      description: questionDescirption,
      src: questionScreen,
    },
    {
      description: goalDescirption,
      src: goalScreen1,
    },
    {
      description: goalDescirption,
      src: goalScreen2,
    },
    {
      description: goalDescirption,
      src: goalScreen3,
    },
    {
      description: habitDescirption,
      src: habitScreen,
    },
    {
      description: habitDescirption,
      src: habitTableScreen,
    },

    {
      description: savingsDescription,
      src: crossoutVariantScreen,
    },
    {
      description: savingsDescription,
      src: crossoutScreen,
    },
    {
      description: savingsDescription,
      src: rouletteScreen,
    },
    {
      description: levelsDescription,
      src: '',
    },
    {
      description: pointsDescription,
      src: '',
    },
    {
      description: endDescription,
      src: '',
    },
  ],
};
