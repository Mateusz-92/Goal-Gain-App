import { Step } from 'react-joyride';
import { format } from 'date-fns';

import { ammountBord, Points } from '../../types';
import {
  GoalFormValuesSchema,
  monthAnswerData,
  WeekPlannerData,
} from '../../validators/validators';
import { DayHabit, HabitFormData } from '../habits/HabitsEditor/HabitsEditor';

export const STEPS: Step[] = [
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
    target: '.step-10-circle-list',
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
// export const DUMMY_ANSWERS_DATA: monthAnswerData[] = [
//   {
//     answers: [
//       { text: 'Tak, działa idealnie.', date: '2025-01-15' },
//       { text: 'Potrzebuję więcej informacji.', date: '2025-01-16' },
//     ],
//     month: 'Styczeń',
//     questionTitle: 'Czy ta funkcja działa poprawnie?',
//     userId: 'użytkownik123',
//     id: 'id123',
//   },
//   {
//     answers: [
//       { text: 'To jest dokładnie to, czego potrzebowałem.', date: '2025-02-12' },
//       { text: 'Czy możesz podać przykłady?', date: '2025-02-14' },
//     ],
//     month: 'Luty',
//     questionTitle: 'Jak używać API?',
//     userId: 'użytkownik456',
//     id: 'id456',
//   },
//   {
//     answers: [
//       { text: 'Nie jestem pewien co do tego.', date: '2025-03-10' },
//       { text: 'Czy możesz rozwinąć szczegóły?', date: '2025-03-11' },
//     ],
//     month: 'Marzec',
//     questionTitle: 'Jakie są ograniczenia?',
//     userId: 'użytkownik789',
//     id: 'id789',
//   },
//   {
//     answers: [
//       { text: 'To wymaga dalszych testów.', date: '2025-04-05' },
//       { text: 'Odezwę się później.', date: '2025-04-07' },
//     ],
//     month: 'Kwiecień',
//     questionTitle: 'Czy są jakieś uwagi do implementacji?',
//     userId: 'użytkownik101',
//     id: 'id101',
//   },
// ];
// export const DUMMY_GOALS_LIST: GoalFormValuesSchema[] = [
//   {
//     goals: [
//       {
//         id: 'goal1',
//         explanationQuestion: 'Dlaczego chcesz osiągnąć ten cel?',
//         goalName: 'Nauka TypeScript',
//         tasks: [
//           {
//             id: 'task1',
//             finishDate: '2025-05-01',
//             isEnded: false,
//             name: 'Przeczytaj dokumentację TypeScript',
//           },
//           {
//             id: 'task2',
//             finishDate: '2025-05-15',
//             isEnded: false,
//             name: 'Zrealizuj kurs online',
//           },
//         ],
//         yourBenefits: 'Zwiększenie umiejętności programistycznych',
//         yourDisturber: 'Brak czasu',
//       },
//       {
//         id: 'goal2',
//         explanationQuestion: 'Dlaczego chcesz osiągnąć ten cel?',
//         goalName: 'Poprawa kondycji fizycznej',
//         tasks: [
//           {
//             id: 'task3',
//             finishDate: '2025-06-01',
//             isEnded: false,
//             name: 'Codzienne bieganie przez 30 minut',
//           },
//           {
//             id: 'task4',
//             finishDate: '2025-06-15',
//             isEnded: false,
//             name: 'Uczęszczanie na siłownię 3 razy w tygodniu',
//           },
//         ],
//         yourBenefits: 'Lepsze zdrowie i samopoczucie',
//         yourDisturber: 'Lenistwo',
//       },
//       {
//         id: 'goal3',
//         explanationQuestion: 'Dlaczego chcesz osiągnąć ten cel?',
//         goalName: 'Nauka gry na gitarze',
//         tasks: [
//           {
//             id: 'task5',
//             finishDate: '2025-07-01',
//             isEnded: false,
//             name: 'Codzienne ćwiczenia przez 1 godzinę',
//           },
//           {
//             id: 'task6',
//             finishDate: '2025-07-15',
//             isEnded: false,
//             name: 'Nauka 5 nowych utworów',
//           },
//         ],
//         yourBenefits: 'Rozwój umiejętności muzycznych',
//         yourDisturber: 'Brak motywacji',
//       },
//     ],
//     date: '2025-05-01',
//     id: 'id123',
//   },
// ];
// export const DUMMY_WEEKDAY_PLAN_DATA: WeekPlannerData[] = [
//   {
//     days: [
//       { id: 'day1', date: '2025-05-01', plan: 'Plan A' },
//       { id: 'day2', date: '2025-05-02', plan: 'Plan B' },
//     ],
//     explanation: 'Explanation A',
//     goal: [
//       { status: true, id: 'goal1', name: 'Goal A' },
//       { status: false, id: 'goal2', name: 'Goal B' },
//     ],
//     startDay: '2025-01-01',
//     id: 'idA',
//     rate: '8',
//   },
//   {
//     days: [
//       { id: 'day3', date: '2025-05-03', plan: 'Plan C' },
//       { id: 'day4', date: '2025-05-04', plan: 'Plan D' },
//     ],
//     explanation: 'Explanation B',
//     goal: [
//       { status: true, id: 'goal3', name: 'Goal C' },
//       { status: false, id: 'goal4', name: 'Goal D' },
//     ],
//     startDay: '2025-05-03',
//     id: 'idB',
//     rate: '9',
//   },
// ];
export const DUMMY_ANSWERS_DATA: monthAnswerData[] = [
  {
    answers: [
      { date: '2025-01-15', text: 'Tak, działa idealnie.' },
      { date: '2025-01-16', text: 'Potrzebuję więcej informacji.' },
    ],
    id: 'id123',
    month: 'Styczeń',
    questionTitle: 'Czy ta funkcja działa poprawnie?',
    userId: 'użytkownik123',
  },
  {
    answers: [
      { date: '2025-02-12', text: 'To jest dokładnie to, czego potrzebowałem.' },
      { date: '2025-02-14', text: 'Czy możesz podać przykłady?' },
    ],
    id: 'id456',
    month: 'Luty',
    questionTitle: 'Jak używać API?',
    userId: 'użytkownik456',
  },
  {
    answers: [
      { date: '2025-03-10', text: 'Nie jestem pewien co do tego.' },
      { date: '2025-03-11', text: 'Czy możesz rozwinąć szczegóły?' },
    ],
    id: 'id789',
    month: 'Marzec',
    questionTitle: 'Jakie są ograniczenia?',
    userId: 'użytkownik789',
  },
  {
    answers: [
      { date: '2025-04-05', text: 'To wymaga dalszych testów.' },
      { date: '2025-04-07', text: 'Odezwę się później.' },
    ],
    id: 'id101',
    month: 'Kwiecień',
    questionTitle: 'Czy są jakieś uwagi do implementacji?',
    userId: 'użytkownik101',
  },
];

export const DUMMY_GOALS_LIST: GoalFormValuesSchema[] = [
  {
    date: '2025-05-01',
    goals: [
      {
        explanationQuestion: 'Dlaczego chcesz osiągnąć ten cel?',
        goalName: 'Nauka TypeScript',
        id: 'goal1',
        tasks: [
          {
            finishDate: '2025-05-01',
            id: 'task1',
            isEnded: false,
            name: 'Przeczytaj dokumentację TypeScript',
          },
          {
            finishDate: '2025-05-15',
            id: 'task2',
            isEnded: false,
            name: 'Zrealizuj kurs online',
          },
        ],
        yourBenefits: 'Zwiększenie umiejętności programistycznych',
        yourDisturber: 'Brak czasu',
      },
      {
        explanationQuestion: 'Dlaczego chcesz osiągnąć ten cel?',
        goalName: 'Poprawa kondycji fizycznej',
        id: 'goal2',
        tasks: [
          {
            finishDate: '2025-06-01',
            id: 'task3',
            isEnded: false,
            name: 'Codzienne bieganie przez 30 minut',
          },
          {
            finishDate: '2025-06-15',
            id: 'task4',
            isEnded: false,
            name: 'Uczęszczanie na siłownię 3 razy w tygodniu',
          },
        ],
        yourBenefits: 'Lepsze zdrowie i samopoczucie',
        yourDisturber: 'Lenistwo',
      },
      {
        explanationQuestion: 'Dlaczego chcesz osiągnąć ten cel?',
        goalName: 'Nauka gry na gitarze',
        id: 'goal3',
        tasks: [
          {
            finishDate: '2025-07-01',
            id: 'task5',
            isEnded: false,
            name: 'Codzienne ćwiczenia przez 1 godzinę',
          },
          {
            finishDate: '2025-07-15',
            id: 'task6',
            isEnded: false,
            name: 'Nauka 5 nowych utworów',
          },
        ],
        yourBenefits: 'Rozwój umiejętności muzycznych',
        yourDisturber: 'Brak motywacji',
      },
    ],
    id: 'id123',
  },
];

export const DUMMY_WEEKDAY_PLAN_DATA: WeekPlannerData[] = [
  {
    days: [
      { date: '2025-05-01', id: 'day1', plan: 'Plan A' },
      { date: '2025-05-02', id: 'day2', plan: 'Plan B' },
    ],
    explanation: 'Explanation A',
    goal: [
      { id: 'goal1', name: 'Goal A', status: true },
      { id: 'goal2', name: 'Goal B', status: false },
    ],
    id: 'idA',
    rate: '8',
    startDay: '2025-01-01',
  },
  {
    days: [
      { date: '2025-05-03', id: 'day3', plan: 'Plan C' },
      { date: '2025-05-04', id: 'day4', plan: 'Plan D' },
    ],
    explanation: 'Explanation B',
    goal: [
      { id: 'goal3', name: 'Goal C', status: true },
      { id: 'goal4', name: 'Goal D', status: false },
    ],
    id: 'idB',
    rate: '9',
    startDay: '2025-05-03',
  },
];
// export const DUMMY_AMOUNTS_DATA: ammountBord[] = [
//   {
//     isCrossOut: true,
//     id: '20fc016d-7d5e-46e8-9049-16b336816e29',
//     date: 'Sun Dec 22 2024 13:03:51 GMT+0100 (czas środkowoeuropejski standardowy)',
//     value: 55,
//   },
//   {
//     isCrossOut: false,
//     id: '75e7f8c6-33e6-4e80-b61c-87b415a031ed',
//     value: 150,
//   },
//   {
//     value: 50,
//     isCrossOut: false,
//     id: '7ff3fbf4-4e11-4acd-844d-5caed90386d8',
//   },
//   {
//     value: 85,
//     isCrossOut: false,
//     id: '1fb2a400-0555-4826-a245-b99fb5f90937',
//   },
//   {
//     value: 90,
//     isCrossOut: false,
//     id: '8defa2a1-f1f0-44fb-b25c-9d0b92ebcfb3',
//   },
//   {
//     id: 'aa91c4c3-3dd1-4eeb-b0b7-56d8c51fcb8e',
//     isCrossOut: false,
//     value: 35,
//   },
//   {
//     value: 110,
//     isCrossOut: false,
//     id: '2052f214-32e3-4b01-b728-585bc82459e9',
//   },
//   {
//     value: 40,
//     isCrossOut: false,
//     id: 'b2091707-a988-4bf9-8c76-5f6a716fe84d',
//   },
//   {
//     id: '41bfa8b7-09cd-4908-bb90-00d3f083110f',
//     isCrossOut: false,
//     value: 100,
//   },
//   {
//     value: 160,
//     isCrossOut: false,
//     id: '3fda9390-e8fd-4da4-96d1-317f215ea6da',
//   },
//   {
//     id: '16510956-ce06-40f4-a050-9378910a337b',
//     isCrossOut: false,
//     value: 45,
//   },
//   {
//     value: 80,
//     isCrossOut: false,
//     id: '51626cf5-bc33-492a-b4cf-3eab7ea9eae7',
//   },
//   {
//     value: 45,
//     id: 'c70786e7-efd6-4322-a61b-752fd03d7353',
//     isCrossOut: false,
//   },
//   {
//     isCrossOut: false,
//     id: '0e0934f2-0b9e-4bba-93bc-9b6d51496fae',
//     value: 120,
//   },
//   {
//     id: '93b37545-8af9-4129-9c6a-9e366bb9dba9',
//     value: 55,
//     isCrossOut: false,
//   },
//   {
//     value: 90,
//     isCrossOut: false,
//     id: '9ba799c8-a8a9-41bd-a3ea-512abfda1af4',
//   },
//   {
//     isCrossOut: false,
//     id: '0a6a41c2-519c-4e08-baaf-390166d0b13c',
//     value: 120,
//   },
//   {
//     id: 'f4944273-1c80-4691-84cf-0f4f84b9006a',
//     value: 130,
//     isCrossOut: false,
//   },
//   {
//     value: 75,
//     isCrossOut: false,
//     id: '074ddcdb-8c0d-48ec-857c-f2de88c2b32b',
//   },
//   {
//     value: 85,
//     isCrossOut: false,
//     id: '68bcae33-0449-40c6-85fd-dd37d9d40c99',
//   },
//   {
//     isCrossOut: false,
//     value: 110,
//     id: 'dad0a854-064a-497e-aaf2-0138d758aa37',
//   },
//   {
//     id: '8a31b503-d719-47f8-a417-eca4bf8b558c',
//     value: 80,
//     isCrossOut: false,
//   },
//   {
//     isCrossOut: false,
//     id: '6edf77de-2626-4a19-aea4-cb1e612a4565',
//     value: 125,
//   },
//   {
//     id: 'd9c7aaaf-57d9-439a-ae1c-21dbfc7f17eb',
//     isCrossOut: false,
//     value: 55,
//   },
//   {
//     value: 140,
//     isCrossOut: false,
//     id: '34f6d0e6-502b-4d93-b709-6c8a94c8db6e',
//   },
//   {
//     isCrossOut: false,
//     id: 'b633d336-43df-42eb-8bef-5d7b2da8cf25',
//     value: 50,
//   },
//   {
//     id: 'fa68ee1f-73dd-47f0-9356-099f752e458d',
//     value: 100,
//     isCrossOut: false,
//   },
//   {
//     isCrossOut: false,
//     value: 30,
//     id: '6656cff2-a3c7-486e-8db5-c860844af9ec',
//   },
//   {
//     isCrossOut: false,
//     value: 130,
//     id: 'd07c8f0b-52b4-46d5-8620-a642a5741596',
//   },
//   {
//     value: 60,
//     isCrossOut: false,
//     id: 'a52e6b25-a7a0-4f06-a856-74fa2fc90a47',
//   },
//   {
//     id: 'ca045239-4926-461f-a11d-2306f2ad1499',
//     value: 90,
//     isCrossOut: false,
//   },
//   {
//     id: 'e3edc02b-c2a1-4408-86a0-b729e7dd6764',
//     value: 150,
//     isCrossOut: false,
//   },
//   {
//     value: 160,
//     id: '2fe3f3fa-04c0-4e6a-ab27-d93e209d228a',
//     isCrossOut: false,
//   },
// ];
export const DUMMY_AMOUNTS_DATA: ammountBord[] = [
  {
    date: 'Sun Dec 22 2024 13:03:51 GMT+0100 (czas środkowoeuropejski standardowy)',
    id: '20fc016d-7d5e-46e8-9049-16b336816e29',
    isCrossOut: true,
    value: 55,
  },
  {
    id: '75e7f8c6-33e6-4e80-b61c-87b415a031ed',
    isCrossOut: false,
    value: 150,
  },
  {
    id: '7ff3fbf4-4e11-4acd-844d-5caed90386d8',
    isCrossOut: false,
    value: 50,
  },
  {
    id: '1fb2a400-0555-4826-a245-b99fb5f90937',
    isCrossOut: false,
    value: 85,
  },
  {
    id: '8defa2a1-f1f0-44fb-b25c-9d0b92ebcfb3',
    isCrossOut: false,
    value: 90,
  },
  {
    id: 'aa91c4c3-3dd1-4eeb-b0b7-56d8c51fcb8e',
    isCrossOut: false,
    value: 35,
  },
  {
    id: '2052f214-32e3-4b01-b728-585bc82459e9',
    isCrossOut: false,
    value: 110,
  },
  {
    id: 'b2091707-a988-4bf9-8c76-5f6a716fe84d',
    isCrossOut: false,
    value: 40,
  },
  {
    id: '41bfa8b7-09cd-4908-bb90-00d3f083110f',
    isCrossOut: false,
    value: 100,
  },
  {
    id: '3fda9390-e8fd-4da4-96d1-317f215ea6da',
    isCrossOut: false,
    value: 160,
  },
  {
    id: '16510956-ce06-40f4-a050-9378910a337b',
    isCrossOut: false,
    value: 45,
  },
  {
    id: '51626cf5-bc33-492a-b4cf-3eab7ea9eae7',
    isCrossOut: false,
    value: 80,
  },
  {
    id: 'c70786e7-efd6-4322-a61b-752fd03d7353',
    isCrossOut: false,
    value: 45,
  },
  {
    id: '0e0934f2-0b9e-4bba-93bc-9b6d51496fae',
    isCrossOut: false,
    value: 120,
  },
  {
    id: '93b37545-8af9-4129-9c6a-9e366bb9dba9',
    isCrossOut: false,
    value: 55,
  },
  {
    id: '9ba799c8-a8a9-41bd-a3ea-512abfda1af4',
    isCrossOut: false,
    value: 90,
  },
  {
    id: '0a6a41c2-519c-4e08-baaf-390166d0b13c',
    isCrossOut: false,
    value: 120,
  },
  {
    id: 'f4944273-1c80-4691-84cf-0f4f84b9006a',
    isCrossOut: false,
    value: 130,
  },
  {
    id: '074ddcdb-8c0d-48ec-857c-f2de88c2b32b',
    isCrossOut: false,
    value: 75,
  },
  {
    id: '68bcae33-0449-40c6-85fd-dd37d9d40c99',
    isCrossOut: false,
    value: 85,
  },
  {
    id: 'dad0a854-064a-497e-aaf2-0138d758aa37',
    isCrossOut: false,
    value: 110,
  },
  {
    id: '8a31b503-d719-47f8-a417-eca4bf8b558c',
    isCrossOut: false,
    value: 80,
  },
  {
    id: '6edf77de-2626-4a19-aea4-cb1e612a4565',
    isCrossOut: false,
    value: 125,
  },
  {
    id: 'd9c7aaaf-57d9-439a-ae1c-21dbfc7f17eb',
    isCrossOut: false,
    value: 55,
  },
  {
    id: '34f6d0e6-502b-4d93-b709-6c8a94c8db6e',
    isCrossOut: false,
    value: 140,
  },
  {
    id: 'b633d336-43df-42eb-8bef-5d7b2da8cf25',
    isCrossOut: false,
    value: 50,
  },
  {
    id: 'fa68ee1f-73dd-47f0-9356-099f752e458d',
    isCrossOut: false,
    value: 100,
  },
  {
    id: '6656cff2-a3c7-486e-8db5-c860844af9ec',
    isCrossOut: false,
    value: 30,
  },
  {
    id: 'd07c8f0b-52b4-46d5-8620-a642a5741596',
    isCrossOut: false,
    value: 130,
  },
  {
    id: 'a52e6b25-a7a0-4f06-a856-74fa2fc90a47',
    isCrossOut: false,
    value: 60,
  },
  {
    id: 'ca045239-4926-461f-a11d-2306f2ad1499',
    isCrossOut: false,
    value: 90,
  },
  {
    id: 'e3edc02b-c2a1-4408-86a0-b729e7dd6764',
    isCrossOut: false,
    value: 150,
  },
  {
    id: '2fe3f3fa-04c0-4e6a-ab27-d93e209d228a',
    isCrossOut: false,
    value: 160,
  },
];

const currentMonth = format(new Date(), 'yyyy-MM');

export const DUMMY_HABITS_DATA: DayHabit = {
  ...Array.from({ length: 31 }, (_, i) => {
    const day = String(i + 1).padStart(2, '0');
    return {
      [`${currentMonth}-${day}`]: {
        habits: [
          { id: '1', name: 'rozciąganie ciała', status: true },
          { id: '2', name: 'czytanie artykułu - świat IT', status: true },
        ],
      },
    };
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
};
export const DUMMY_HABITS_CHART_DATA: HabitFormData = {
  date: new Date(),

  habits: DUMMY_HABITS_DATA,
  id: '1',
};
export const DUMMY_POINTS_DATA: Points[] = [
  { date: '2025-01-01', id: '1', points: 100 },
  { date: '2025-02-01', id: '2', points: 150 },
  { date: '2025-03-01', id: '3', points: 200 },
  { date: '2025-04-01', id: '4', points: 250 },
  { date: '2025-05-01', id: '5', points: 300 },
  { date: '2025-06-01', id: '6', points: 350 },
  { date: '2025-07-01', id: '7', points: 50 },
  { date: '2025-08-01', id: '8', points: 75 },
  { date: '2025-09-01', id: '9', points: 125 },
  { date: '2025-10-01', id: '10', points: 175 },
  { date: '2025-11-01', id: '11', points: 225 },
  { date: '2025-12-01', id: '12', points: 275 },
];
export const DUUMY_WEEKLY_POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 7, 3, 4, 5];
export const DUUMY_MONTHLY_POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 7];

