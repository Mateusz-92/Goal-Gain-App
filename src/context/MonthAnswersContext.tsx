import React, { createContext, ReactNode, useContext, useState } from "react";

export type MonthAnswersContextType = {
  addAnswer: (answer: string) => void;
  answers: string[];
  inputText: string;
  setInputText: (text: string) => void;
};

const MonthAnswersContext = createContext<MonthAnswersContextType | undefined>(
  undefined
);

export const MonthAnswersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");

  const addAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    setInputText("");
  };

  return (
    <MonthAnswersContext.Provider
      value={{ addAnswer, answers, inputText, setInputText }}
    >
      {children}
    </MonthAnswersContext.Provider>
  );
};

export const useMonthAnswers = (): MonthAnswersContextType => {
  const context = useContext(MonthAnswersContext);
  if (!context) {
    throw new Error(
      "useMonthAnswers must be used within a MonthAnswersProvider"
    );
  }
  return context;
};
