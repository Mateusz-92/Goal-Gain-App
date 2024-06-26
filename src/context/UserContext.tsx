import React, { createContext, useContext, useState } from "react";

import { UserAvatarData } from "../components/UserAvatar/UserAvatar";

const initialUserData: UserAvatarData = {
  avatar: "",
  badges: [],
  name: "",
  points: 0,
  savings: {
    crossOutPuzzle: [],
    roulette: [],
  },
  userId: "",
};

type UserContextType = {
  addCrossOutSaving: (amount: number) => void;
  addPoints: (points: number) => void;
  addRouletteSaving: (amount: number) => void;
  subtractCrossOutSaving: (amount: number) => void;
  subtractPoints: (points: number) => void;
  subtractRouletteSaving: (amount: number) => void;
  user: UserAvatarData;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserAvatarData>(initialUserData);

  const addPoints = (points: number) => {
    setUser((prevUser) => ({ ...prevUser, points: prevUser.points + points }));
  };

  const subtractPoints = (points: number) => {
    setUser((prevUser) => ({ ...prevUser, points: prevUser.points - points }));
  };

  const addRouletteSaving = (amount: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      savings: {
        ...prevUser.savings,
        roulette: [
          ...prevUser.savings.roulette,
          { amount, date: new Date().toISOString() },
        ],
      },
    }));
  };

  const subtractRouletteSaving = (amount: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      savings: {
        ...prevUser.savings,
        roulette: prevUser.savings.roulette.filter(
          (saving) => saving.amount !== amount
        ),
      },
    }));
  };

  const addCrossOutSaving = (amount: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      savings: {
        ...prevUser.savings,
        crossOutPuzzle: [
          ...prevUser.savings.crossOutPuzzle,
          { amount, date: new Date().toISOString() },
        ],
      },
    }));
  };

  const subtractCrossOutSaving = (amount: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      savings: {
        ...prevUser.savings,
        crossOutPuzzle: prevUser.savings.crossOutPuzzle.filter(
          (saving) => saving.amount !== amount
        ),
      },
    }));
  };

  return (
    <UserContext.Provider
      value={{
        addCrossOutSaving,
        addPoints,
        addRouletteSaving,
        subtractCrossOutSaving,
        subtractPoints,
        subtractRouletteSaving,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
