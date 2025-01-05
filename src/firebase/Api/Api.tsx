import { format, getMonth } from 'date-fns';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
  UploadResult,
} from 'firebase/storage';

import { ammountBord, Points, Saving, SavingCrossOut } from '../../types';
import {
  answerForMonthData,
  questionForMonthData,
} from '../../validators/validators';
import firebaseApp from '../FirebaseConfig';
import { auth } from '../FirebaseConfig';

const db = getFirestore(firebaseApp);
const apiBaseCollection = collection(db, 'ApiBase');
const storage = getStorage();


export const addRouletteSavingData = async (data: Saving, userId: string, id?: string) => {
  try {
    let userDocRef;

    if (id) {
      userDocRef = doc(apiBaseCollection, id);
    } else {
      userDocRef = doc(apiBaseCollection);
    }

    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    const updatedrouletteSaving = {
      ...(userData?.roulette ?? {}),

      amount: data.amount,
      date: data.date,
      id: userDocRef.id,
      userId: userId,
    };

    await setDoc(userDocRef, { roulette: updatedrouletteSaving }, { merge: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const registerWithEmailAndPassword = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const addCrossoutSaving = async (
  userId: string,
  amounts: ammountBord[],
  variantName?: string,
  id?: string,
) => {
  try {
    let userDocRef;

    if (id) {
      userDocRef = doc(apiBaseCollection, id);
    } else {
      userDocRef = doc(apiBaseCollection);
    }

    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    const updatedCrossOutSaving = {
      ...(userData?.crossOutSaving ?? {}),
      amounts: amounts,
      date: userData?.crossOutSaving.date || format(new Date(), 'yyyy-MM-dd'),
      id: userDocRef.id,
      isCrossOut: false,
      userId: userId,
      variantName: userData?.crossOutSaving.variantName || variantName,
    };
    await setDoc(userDocRef, { crossOutSaving: updatedCrossOutSaving }, { merge: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const fetchCrossOutAmounts = async (
  id: string,
  userId: string,
): Promise<ammountBord[] | null> => {
  try {
    const q = query(
      apiBaseCollection,
      where('crossOutSaving.userId', '==', userId),
      where('crossOutSaving.id', '==', id),
    );
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    let amounts: ammountBord | null = null;
    docsSnap.forEach((doc) => {
      const data = doc.data();

      amounts = data.crossOutSaving.amounts;
    });
    return amounts;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};
export const fetchAllCrossOutAmountsInSaving = async (
  userId: string,
): Promise<SavingCrossOut[] | null> => {
  try {
    const q = query(apiBaseCollection, where('crossOutSaving.userId', '==', userId));
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    const savingAmounts: SavingCrossOut[] = [];
    docsSnap.forEach((doc) => {
      const data = doc.data();
      if (data.crossOutSaving.isCrossOut === false) {
        savingAmounts.push(data.crossOutSaving as SavingCrossOut);
      } else savingAmounts.push(data.crossOutSaving as SavingCrossOut);
    });

    return savingAmounts;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};
export const fetchAllRouletteInSaving = async (userId: string): Promise<Saving[] | null> => {
  try {
    const q = query(apiBaseCollection, where('roulette.userId', '==', userId));
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    const savingRoulette: Saving[] = [];
    docsSnap.forEach((doc) => {
      const data = doc.data();
      // console.log("data", data);

      savingRoulette.push(data.roulette as Saving);
    });
    return savingRoulette;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};

export const addMonthAnswerData = async (
  data: answerForMonthData | questionForMonthData,
  userId: string,
  id?: string,
) => {
  try {
    let userDocRef;

    if (id) {
      userDocRef = doc(apiBaseCollection, id);
    } else {
      userDocRef = doc(apiBaseCollection);
    }

    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    const updatedMonthAnswer = {
      ...(userData?.monthAnswer ?? {}),
      answer: data.answer,
      date: data.date,
      id: data.id || userDocRef.id,
      question: data.question,
      userId: userId,
    };

    await setDoc(userDocRef, { monthAnswer: updatedMonthAnswer }, { merge: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const fetchMonthAnswerData = async (
  userId: string,
): Promise<answerForMonthData[] | null> => {
  try {
    const q = query(apiBaseCollection, where('monthAnswer.userId', '==', userId));
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    const parsedData: answerForMonthData[] = [];

    docsSnap.forEach((doc) => {
      const data = doc.data();
      parsedData.push(data.monthAnswer as answerForMonthData);
    });
    // TODO
    // improve comparing, (specific month in year)
    const currentMonthAnswers = parsedData.filter((answer) => {
      if (answer.date) {
        const answerMonth = parseInt(answer.date.split('-')[1], 10);

        const currentMonth = getMonth(new Date()) + 1;

        return answerMonth === currentMonth;
      }
      return false;
    });
    return currentMonthAnswers;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};
export const addUserPointsData = async (points: number, userId: string): Promise<Points | null> => {
  try {
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const userDocRef = doc(apiBaseCollection);
    const docId = userDocRef.id;

    const pointsData: Points = {
      date: currentDate,
      id: docId,
      points,
    };

    const userPointsData = {
      userPoints: {
        date: currentDate,
        id: docId,
        points,
        userId: userId,
      },
    };

    await setDoc(userDocRef, userPointsData);

    return pointsData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};
export const fetchUserPoints = async (userId: string): Promise<Points[] | null> => {
  try {
    const q = query(apiBaseCollection, where('userPoints.userId', '==', userId));
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    const userPointsData: Points[] = [];
    docsSnap.forEach((doc) => {
      const data = doc.data();
      userPointsData.push({
        date: data.userPoints.date,
        id: data.userPoints.id,
        points: data.userPoints.points,
      });
    });
    return userPointsData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};
export const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const uploadAvatarToFirebase = async (
  file: File,
  userId: string,
): Promise<string | null> => {
  if (!file) return null;

  try {
    const timestamp = Date.now();
    const avatarRef = ref(storage, `avatars/${userId}/avatar_${timestamp}.jpg`);

    const snapshot: UploadResult = await uploadBytes(avatarRef, file);

    const downloadURL: string = await getDownloadURL(snapshot.ref);
    // eslint-disable-next-line no-console
    console.log('File available at:', downloadURL);

    return downloadURL;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const fetchUserAvatar = async (userId: string): Promise<string | null> => {
  try {
    const folderRef = ref(storage, `avatars/${userId}`);
    const list = await listAll(folderRef);

    const sortedItems = list.items.sort((a, b) => {
      const aTimestamp = parseInt(a.name.split('_')[1].split('.')[0]);
      const bTimestamp = parseInt(b.name.split('_')[1].split('.')[0]);
      return bTimestamp - aTimestamp;
    });

    if (sortedItems.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('No avatar found for user:', userId);
      return null;
    }

    const downloadURL = await getDownloadURL(sortedItems[0]);
    return downloadURL;
  } catch (error) {
    if ((error as any).code === 'storage/object-not-found') {
      // eslint-disable-next-line no-console
      console.warn('Avatar not found for user:', userId);
      return null;
    } else {
      // eslint-disable-next-line no-console
      console.error('Error fetching avatar:', error);
      throw error;
    }
  }
};
export const fetchCrossOutSavingName = async (
  userId: string,
  id: string,
): Promise<string | null> => {
  try {
    const q = query(
      apiBaseCollection,
      where('crossOutSaving.userId', '==', userId),
      where('crossOutSaving.id', '==', id),
    );
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    let name: string | null = null;
    docsSnap.forEach((doc) => {
      const data = doc.data();
      name = data.crossOutSaving.variantName;
    });

    return name;
  } catch (error) {
    return null;
  }
};
export const fetchCrossOutSavingDetails = async (
  userId: string,
): Promise<SavingCrossOut[] | null> => {
  try {
    const q = query(apiBaseCollection, where('crossOutSaving.userId', '==', userId));
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    const savingDetails: SavingCrossOut[] = [];
    docsSnap.forEach((doc) => {
      const data = doc.data().crossOutSaving;
      savingDetails.push({
        amounts: data.amounts,
        date: data.date,
        id: data.id,
        isCrossOut: data.isCrossOut,
        variantName: data.variantName,
      });
    });
    return savingDetails;
  } catch (error) {
    return null;
  }
};

const provider = new GoogleAuthProvider();
export const loginWithGoogle = async (): Promise<void> => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error, 'error');
  }
};
