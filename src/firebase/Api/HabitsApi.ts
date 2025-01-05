import { format } from 'date-fns';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import { DayHabit, HabitFormData } from '../../components/habits/HabitsEditor/HabitsEditor';
import { getDaysInMonth } from '../../helpers';
import firebaseApp from '../FirebaseConfig';

const db = getFirestore(firebaseApp);
const apiBaseCollection = collection(db, 'ApiBase');


export const addHabits = async (newHabits: DayHabit, monthYear: Date, userId: string) => {
  try {
    const userDocRef = doc(apiBaseCollection);
    const daysInMonth = getDaysInMonth(monthYear.toString());

    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    const monthYearString = monthYear.toISOString().split('T')[0].slice(0, 7);

    const updatedHabits = userData?.habitsListForMonth ?? {};

    const newHabitsForMonth = newHabits[Object.keys(newHabits)[0]].habits || [];

    Array.from({ length: daysInMonth.length }, (_, i) => i + 1).forEach((day) => {
      const dayString = `${monthYearString}-${String(day).padStart(2, '0')}`;
      const existingHabitsForDay = updatedHabits[dayString]?.habits || [];
      updatedHabits[dayString] = {
        habits: [...existingHabitsForDay, ...newHabitsForMonth],
      };
    });

    (updatedHabits.userId = userId),
      (updatedHabits.date = userData?.habitsListForMonth?.date
        ? userData.habitsListForMonth.date
        : format(new Date(), 'yyyy-MM-dd')),
      (updatedHabits.id = userDocRef.id),
      await setDoc(userDocRef, { habitsListForMonth: updatedHabits }, { merge: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const updateHabitStatus = async (
  date: string,
  habitId: number,
  newStatus: boolean,
  id: string,
) => {
  try {
    const userDocRef = doc(apiBaseCollection, id);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    if (!userData) {
      throw new Error('User data not found');
    }

    const existingHabits = userData.habitsListForMonth?.[date]?.habits || [];

    const updatedHabitsForDate = existingHabits.map((habit: any) =>
      habit.id === habitId
? { ...habit, status: newStatus }
: habit,
    );

    const updatedHabits = {
      ...(userData.habitsListForMonth ?? {}),
      [date]: {
        habits: updatedHabitsForDate,
      },
    };

    await setDoc(userDocRef, { habitsListForMonth: updatedHabits }, { merge: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const fetchLatestHabitForMonth = async (
  userId: string,
  id?: string,
): Promise<DayHabit | null> => {
  try {
    let q = query(apiBaseCollection, orderBy('habitsListForMonth', 'asc'));
    if (id) {
      q = query(q, where('habitsListForMonth.id', '==', id));
    }

    const querySnapshot = await getDocs(q);

    let latestHabitForMonth: HabitFormData | null = null;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.habitsListForMonth && data.habitsListForMonth.userId === userId) {
        latestHabitForMonth = {
          ...data.habitsListForMonth,
        };
      }
    });

    return latestHabitForMonth;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};

export const fetchAllHabits = async (userId: string): Promise<HabitFormData[] | null> => {
  try {
    const q = query(apiBaseCollection, where('habitsListForMonth.userId', '==', userId));
    const docsSnap = await getDocs(q);
    const habitData: HabitFormData[] = [];
    docsSnap.forEach((doc) => {
      const data = doc.data();
      habitData.push(data.habitsListForMonth as HabitFormData);
    });
    return habitData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};

export const fetchHabitsPerMonth = async (monthAndYear: string, userId: string) => {
  try {
    const q = query(apiBaseCollection, where('habitsListForMonth.userId', '==', userId));
    const docsSnap = await getDocs(q);
    const habitData: HabitFormData[] = [];

    docsSnap.forEach((doc) => {
      const data = doc.data();
      if (data && data.habitsListForMonth) {
        habitData.push(data.habitsListForMonth as HabitFormData);
      }
    });
    const monthArrIndex = habitData.findIndex((arr, index) => {
      const dateParts = Object.entries(arr)[index][0].split('-');
      const yearAndMonth = `${dateParts[0]}-${dateParts[1]}`;
      return yearAndMonth === monthAndYear;
    });
    if (monthArrIndex !== -1) {
      return habitData[monthArrIndex];
    }
    return {} as HabitFormData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return {} as HabitFormData;
  }
};
