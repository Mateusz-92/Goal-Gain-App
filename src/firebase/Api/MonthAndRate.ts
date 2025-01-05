import { collection, doc, getDocs,getFirestore, query, setDoc, where } from 'firebase/firestore';

import { MonthlyValuesRatingSchema } from '../../validators/validators';
import firebaseApp from '../FirebaseConfig';

const db = getFirestore(firebaseApp);
const apiBaseCollection = collection(db, 'ApiBase');

export const addMonthlyEvaluation = async (
  data: MonthlyValuesRatingSchema,
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

    const updatedMonthEvaluation = {
      date: data.date,
      explanationOfRate: data.explanationOfRate,
      id: id || userDocRef.id,
      lessonOfLife: data.lessonOfLife,
      monthsRate: data.monthsRate,
      theBiggestChalange: data.theBiggestChalange,
      userId: userId,
      value: data.value,
    };

    await setDoc(userDocRef, { monthEvaluation: updatedMonthEvaluation }, { merge: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const fetchMonthlyEvaluation = async (
  id: string,
  userId: string,
): Promise<MonthlyValuesRatingSchema | null> => {
  try {
    const q = query(
      apiBaseCollection,
      where('monthEvaluation.userId', '==', userId),
      where('monthEvaluation.id', '==', id),
    );
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    let monthEvaluation: MonthlyValuesRatingSchema | null = null;
    docsSnap.forEach((doc) => {
      const data = doc.data();

      monthEvaluation = {
        date: data?.monthEvaluation.date,
        explanationOfRate: data.monthEvaluation.explanationOfRate,
        id: data.monthEvaluation.id || undefined,
        lessonOfLife: data.monthEvaluation.lessonOfLife,
        monthsRate: data.monthEvaluation.monthsRate,
        theBiggestChalange: data.monthEvaluation.theBiggestChalange,
        value: data.monthEvaluation.value,
      };
    });
    return monthEvaluation;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};
export const fetchAllMonthlyEvaluation = async (
  userId: string,
): Promise<MonthlyValuesRatingSchema[] | null> => {
  try {
    const q = query(apiBaseCollection, where('monthEvaluation.userId', '==', userId));
    const docsSnap = await getDocs(q);
    const evaulationData: MonthlyValuesRatingSchema[] = [];
    docsSnap.forEach((doc) => {
      const data = doc.data();
      evaulationData.push(data.monthEvaluation as MonthlyValuesRatingSchema);
    });
    return evaulationData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};

export type monthRateType = {
  date: string;
  rate: number;
};

export const fetchMonthRateData = async (userId: string): Promise<monthRateType[] | null> => {
  try {
    const q = query(apiBaseCollection, where('monthEvaluation.userId', '==', userId));
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    const monthsRates: monthRateType[] = [];

    docsSnap.forEach((doc) => {
      const data = doc.data();
      monthsRates.push({
        date: data.monthEvaluation.date,
        rate: Number(data.monthEvaluation.value),
      });
    });
    return monthsRates;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};
