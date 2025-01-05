import { getMonth } from "date-fns";
import { Saving, ammountBord } from "./types";

export const calculateMonthlySavings = (savings: Saving[]): number[] => {
    const monthlySums: number[] = new Array(12).fill(0);
  
    savings.forEach((saving) => {
      const month = getMonth(new Date(saving.date)); //
      monthlySums[month] += saving.amount;
    });
  
    return monthlySums;
  };
  
 export const calculateMonthlyCrossOutSavings = (savings: ammountBord[][]): number[] => {
    const monthlySums: number[] = new Array(12).fill(0); //
  
    savings.forEach((savingCrossOut) => {
      savingCrossOut.forEach((saving) => {
        if (saving.date) {
          const month = getMonth(new Date(saving.date));
          monthlySums[month] += saving.value;
        }
      });
    });
    return monthlySums;
  };
  
 export const calculateTotalMonthlySavings = (
    rouletteSavings: number[],
    crossOutSavings: number[],
  ): number[] => {
    return rouletteSavings.map((roulette, index) => roulette + crossOutSavings[index]);
  };