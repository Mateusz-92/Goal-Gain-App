import React, { createContext, ReactNode, useContext, useState } from 'react';
import { AlertBox } from '../components/Alert/AlertBox';

type AlertOptions = {
  description?: string;
  duration?: number;
  points?: number;
  status: 'success' | 'warning' | 'info' | 'error';
  title: string; // Duration in milliseconds
};

type AlertContextType = {
  showAlert: (options: AlertOptions) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alertOptions, setAlertOptions] = useState<AlertOptions | null>(null);

  const showAlert = (options: AlertOptions) => {
    setAlertOptions(options);
    setTimeout(() => setAlertOptions(null), 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alertOptions && <AlertBox {...alertOptions} />}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
