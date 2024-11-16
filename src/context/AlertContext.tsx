import React, { createContext, ReactNode,useContext, useState } from 'react';

import { AlertSuccessPoints } from '../components/Alert/AlertSuccesPoints';


type AlertContextType = {
  showAlert: (points: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alertPoints, setAlertPoints] = useState<number | null>(null);

  const showAlert = (points: number) => {
    setAlertPoints(points);
    setTimeout(() => setAlertPoints(null), 3000); 
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alertPoints !== null && <AlertSuccessPoints points={alertPoints} />}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
