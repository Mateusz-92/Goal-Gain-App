import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyDYfXSoxQJ3g51KO_AueRgydnWqrDvBTaE',
  appId: '1:1002223361472:web:df7d6a090d44ca8dd0fc25',
  authDomain: 'goal-gain-app.firebaseapp.com',
  measurementId: 'G-7SSW53KWTB',
  messagingSenderId: '1002223361472',
  projectId: 'goal-gain-app',
  storageBucket: 'goal-gain-app.appspot.com',
};
const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);

export default firebaseApp;
export const getUserId = (): string | null => {
  const currentUser = auth.currentUser;
  return currentUser
? currentUser.uid
: null;
};
