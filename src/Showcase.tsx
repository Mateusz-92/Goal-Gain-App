import ThreeMonthsGoalsPlanner from "./components/Goals/ThreeMonthsGoals/ThreeMonthsGoalsPlanner/ThreeMonthsGoalsPlanner";
import {
  TaskItem,
} from "./components/Goals/ThreeMonthsGoals/ThreeMonthsTasks/ThreeMonthsTasks";
export type ThreeMonthsGoals = {
  allTasks: TaskItem[];
  explanationText: string;
  goalImportanceText: string | undefined;
  goalNumber: number | null;
  goalText: string;
};
// const testGoals: ThreeMonthsGoals[] = [
//   {
//     allTasks: [
//       { id: "1", text: "Przygotować prezentację", date: "2024-04-15" },
//       { id: "2", text: "Zrobić zakupy", date: "2024-04-16" },
//       { id: "3", text: "Napisać raport", date: "2024-04-17" },
//     ],
//     goalNumber: 1,
//     explanationText: "Oto moje cele na najbliższe trzy miesiące:",
//     goalText: "Ukończenie wszystkich zaplanowanych zadań",
//     goalImportanceText: "Cele na pierwszy miesiąc",
//   },
//   {
//     allTasks: [
//       { id: "4", text: "Zorganizować spotkanie", date: "2024-04-18" },
//       { id: "5", text: "Przeczytać książkę", date: "2024-04-19" },
//     ],
//     goalNumber: 2,
//     explanationText: "Kontynuacja celów z poprzedniego miesiąca:",
//     goalText: "Zrealizowanie pozostałych zadań i dodanie nowych",
//     goalImportanceText: "Cele na drugi miesiąc",
//   },
// ];
export const Showcase = () => {
 
  return (
    <>
    
      <ThreeMonthsGoalsPlanner />
    </>
  );
};
