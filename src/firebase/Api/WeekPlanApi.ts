import { format } from 'date-fns';
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

import { WeekDayPlanData,WeekPlannerData } from '../../validators/validators';
import firebaseApp from '../FirebaseConfig';

const db = getFirestore(firebaseApp);
const apiBaseCollection = collection(db, 'ApiBase');
export const addWeekPlan = async (data: WeekPlannerData, userId: string, id?: string) => {
  try {
    let userDocRef;

    if (id) {
      userDocRef = doc(apiBaseCollection, id);
    } else {
      userDocRef = doc(apiBaseCollection);
    }

    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    const updatedWeekPlan = {
      ...(userData?.weekPlan ?? {}),

      days: id
? data.days
: [...(userData?.weekPlan?.days ?? []), ...data.days],
      explanation: data.explanation,
      goals: id
? data.goal
: [...(userData?.weekPlan?.goals ?? []), ...data.goal],
      id: userDocRef.id,
      rate: data.rate,
      startDay: data.startDay,
      userId: userId,
    };

    await setDoc(userDocRef, { weekPlan: updatedWeekPlan }, { merge: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const fetchWeekData = async (
  id: string,
  userId: string,
): Promise<WeekPlannerData | null> => {
  try {
    const q = query(
      apiBaseCollection,
      where('weekPlan.userId', '==', userId),
      where('weekPlan.id', '==', id),
    );
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    let weekPlanData: WeekPlannerData | null = null;
    docsSnap.forEach((doc) => {
      const data = doc.data();
      weekPlanData = {
        days: data.weekPlan.days,
        explanation: data.weekPlan.explanation,
        goal: data.weekPlan.goals,
        rate: data.weekPlan.rate,
        startDay: data.weekPlan.startDay,
      };
    });

    return weekPlanData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};
export const fetchWeekDay = async (userId: string): Promise<WeekDayPlanData[] | null> => {
  try {
    const q = query(apiBaseCollection, where('weekPlan.userId', '==', userId));
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    const allData: WeekPlannerData[] = [];

    docsSnap.forEach((doc) => {
      const data = doc.data();
      allData.push(data.weekPlan as WeekPlannerData);
    });

    const days: WeekDayPlanData[][] = allData.map((el: WeekPlannerData) => el.days);

    const flattenedDays: WeekDayPlanData[] = days.flat();

    const actualDay = flattenedDays.filter((el) => el.date === format(new Date(), 'yyyy-MM-dd'));
    return actualDay;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};

export const fetchWeekRateData = async (userId: string): Promise<number[] | null> => {
  try {
    const q = query(apiBaseCollection, where('weekPlan.userId', '==', userId));
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    const weekRates: number[] = [];

    docsSnap.forEach((doc) => {
      const data = doc.data();
      weekRates.push(Number(data.weekPlan.rate));
    });
    return weekRates;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};
export const fetchAllWeekData = async (userId: string): Promise<WeekPlannerData[] | null> => {
  try {
    const q = query(apiBaseCollection, where('weekPlan.userId', '==', userId));
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }
    const allData: WeekPlannerData[] = [];

    let weekPlanData: WeekPlannerData[] | null = null;
    docsSnap.forEach((doc) => {
      const data = doc.data();
      allData.push(data.weekPlan as WeekPlannerData);
      weekPlanData = allData;
    });
    return weekPlanData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};
