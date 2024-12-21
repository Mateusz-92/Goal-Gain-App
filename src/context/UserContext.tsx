import React, { createContext, useContext, useState } from 'react';

import { UserAvatarData } from '../components/UserAvatar/UserAvatar';
import { SavingCrossOut } from '../components/UserAvatar/UserAvatar';
import { addRouletteSavingData } from '../firebase/Api';

const initialUserData: UserAvatarData = {
  avatar: '',
  badges: [],
  name: '',
  points: 0,
  savings: {
    crossOutPuzzle: [],
    roulette: [],
  },
  totalTestCrossout: 0,
  userId: '',
};

type UserContextType = {
  addPoints: (points: number) => void;
  addRouletteSaving: (amount: number) => void;
  subtractCrossOutSaving: (saving: SavingCrossOut) => void;
  subtractPoints: (points: number) => void;
  subtractRouletteSaving: (amount: number) => void;
  totalTestCrossout: number;
  updateCrossOutSaving: (
    saving: SavingCrossOut,
    isCrossOut: boolean,

    id: string,
  ) => void;
  user: UserAvatarData;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserAvatarData>(initialUserData);
  const totalTestCrossout = 0;
  const addPoints = (points: number) => {
    setUser((prevUser) => ({ ...prevUser, points: prevUser.points + points }));
  };

  const subtractPoints = (points: number) => {
    setUser((prevUser) => ({ ...prevUser, points: prevUser.points - points }));
  };

  const addRouletteSaving = (amount: number) => {
    const newSaving = { amount, date: new Date().toISOString() };
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        savings: {
          ...prevUser.savings,
          roulette: [...prevUser.savings.roulette, newSaving],
        },
      };
      addRouletteSavingData(newSaving);
      return updatedUser;
    });
  };

  const subtractRouletteSaving = (amount: number) => {
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        savings: {
          ...prevUser.savings,
          roulette: prevUser.savings.roulette.filter((saving) => saving.amount !== amount),
        },
      };
      return updatedUser;
    });
  };

  const updateCrossOutSaving = (saving: SavingCrossOut, isCrossOut: boolean, id: string) => {
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        savings: {
          ...prevUser.savings,
          crossOutPuzzle: prevUser.savings.crossOutPuzzle.map((s) =>
            s.id === id
? { ...s, isCrossOut }
: s,
          ),
        },
      };
      return updatedUser;
    });
  };

  const subtractCrossOutSaving = (saving: SavingCrossOut) => {
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        savings: {
          ...prevUser.savings,
          crossOutPuzzle: prevUser.savings.crossOutPuzzle.filter((s) => s.id !== saving.id),
        },
      };
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider
      value={{
        // addCrossOutSaving,
        addPoints,
        addRouletteSaving,
        subtractCrossOutSaving,
        subtractPoints,
        subtractRouletteSaving,
        totalTestCrossout,
        updateCrossOutSaving,

        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
