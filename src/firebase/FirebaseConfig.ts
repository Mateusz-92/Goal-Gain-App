import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  appId: import.meta.env.VITE_APP_ID,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
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
