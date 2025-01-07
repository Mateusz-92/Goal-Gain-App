import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from '../firebase/FirebaseConfig';

interface AuthContextType {
  loading: boolean;
  user: User | null;
  userId: string;
}

const AuthContext = createContext<AuthContextType>({
  loading: true,
  user: null,
  userId: '',
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null,
  );
  const [loading, setLoading] = useState(user === null);

  const userId = user?.uid || '';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ loading, user, userId }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
