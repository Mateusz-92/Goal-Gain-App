export type ammountBord = {
  date?: string;
  id: string;
  isCrossOut: boolean;
  value: number;
};
export type OptionRoulette = {
  option: string;
};
export type Badge = {
  id: string;
  imgUrl: string;
  name: string;
};

export type Saving = {
  amount: number;
  date: string;
};
export type SavingCrossOut = {
  amounts: ammountBord[];
  colId?: number;
  date: string;
  id: string;
  isActive?: boolean;
  isCrossOut: boolean;
  variantName?: string;
};
export type Points = {
  date: string;
  id?: string;
  points: number;
};
