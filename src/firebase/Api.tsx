import { format, getMonth } from 'date-fns';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
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
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
  UploadResult,
} from 'firebase/storage';

import { DayHabit, Habit, HabitFormData } from '../components/habits/HabitsEditor/HabitsEditor';
import { getDaysInMonth } from '../components/habits/HabitsForm/HabitsForm';
import { ammountBord, Points, Saving, SavingCrossOut } from '../types';
import {
  answerForMonthData,
  GoalFormValuesSchema,
  monthAnswerData,
  MonthlyValuesRatingSchema,
  questionForMonthData,
  SingleGoalValuesSchema,
  WeekDayPlanData,
  WeekPlannerData,
} from '../validators/validators';

import firebaseApp from './FirebaseConfig';
import { auth } from './FirebaseConfig';

const db = getFirestore(firebaseApp);
const apiBaseCollection = collection(db, 'ApiBase');
const storage = getStorage();

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

export const FetchAllHabits = async (userId: string): Promise<HabitFormData[] | null> => {
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

    if (habitData.length > 0) {
      const firstHabitData = habitData[0];

      const matchingDateKey = Object.keys(firstHabitData).find((key) => {
        if (key !== 'userId' && key !== 'id') {
          const dateParts = key.split('-');
          const yearAndMonth = `${dateParts[0]}-${dateParts[1]}`;
          return yearAndMonth === monthAndYear;
        }
        return false;
      });

      if (matchingDateKey) {
        const habitsForMatchingDate = firstHabitData[matchingDateKey].habits;
        const allNames = habitsForMatchingDate.map((habit: Habit) => habit.name);

        return allNames;
      }
    }

    return [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};

export const addGoals = async (data: GoalFormValuesSchema, userId: string, id?: string) => {
  try {
    let userDocRef;

    if (id) {
      userDocRef = doc(apiBaseCollection, id);
    } else {
      userDocRef = doc(apiBaseCollection);
    }

    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    const updatedGoals = {
      ...(userData?.C ?? {}),
      date: userData?.threeMonthsGoals.date
        ? userData.threeMonthsGoals.date
        : format(new Date(), 'yyyy-MM-dd'),
      goals: id
? data.goals
: [...(userData?.threeMonthsGoals?.goals ?? []), ...data.goals],
      id: userDocRef.id,
      userId: userId,
    };

    await setDoc(userDocRef, { threeMonthsGoals: updatedGoals }, { merge: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

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

export const FetchMonthlyEvaluation = async (
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
export const FetchAllMonthlyEvaluation = async (
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

export const fetchGoalsData = async (
  id: string,
  userId: string,
): Promise<SingleGoalValuesSchema[]> => {
  try {
    const q = query(
      apiBaseCollection,
      where('threeMonthsGoals.userId', '==', userId),
      where('threeMonthsGoals.id', '==', id),
    );
    const docsSnap = await getDocs(q);

    const parsedData: SingleGoalValuesSchema[] = [];
    docsSnap.forEach((doc) => {
      const data = doc.data();
      parsedData.push(data.threeMonthsGoals.goals as SingleGoalValuesSchema);
    });
    return parsedData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return [];
};
export const fetchAllGoalsData = async (userId: string): Promise<GoalFormValuesSchema[]> => {
  try {
    const q = query(apiBaseCollection, where('threeMonthsGoals.userId', '==', userId));
    const docsSnap = await getDocs(q);

    const parsedData: GoalFormValuesSchema[] = [];
    docsSnap.forEach((doc) => {
      const data = doc.data();
      parsedData.push(data.threeMonthsGoals as GoalFormValuesSchema);
    });
    return parsedData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return [];
};

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

export const FetchCrossOutAmounts = async (
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
export const FetchAllCrossOutAmountsInSaving = async (
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
export const FetchAllRouletteInSaving = async (userId: string): Promise<Saving[] | null> => {
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

export const addMonthAnswerQuestion = async (data: monthAnswerData, id?: string) => {
  try {
    let userDocRef;

    if (id) {
      userDocRef = doc(apiBaseCollection, id);
    } else {
      userDocRef = doc(apiBaseCollection);
    }

    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    const updatedAnswers = {
      ...(userData?.monthAnswer ?? {}),
      answers: id
? data.answers
: [...(userData?.monthAnswer?.answers ?? []), ...data.answers],

      id: data.id || userDocRef.id,
      month: userData?.monthAnswer.month
? userData.monthAnswer.month
: data.month,
      questionTitle: userData?.monthAnswer.questionTitle
        ? userData.monthAnswer.questionTitle
        : data.questionTitle,
      userId: data.userId,
    };

    await setDoc(userDocRef, { monthAnswer: updatedAnswers }, { merge: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};

export const fetchMonthCurrentAnswerQuestion = async (
  userId: string,
  id?: string,
): Promise<monthAnswerData | null> => {
  try {
    let q = query(apiBaseCollection, where('monthAnswer.userId', '==', userId));

    if (id) {
      q = query(q, where('monthAnswer.id', '==', id));
    } else {
      q = query(q, where('monthAnswer.month', '==', format(new Date(), 'MM.yyyy')));
    }

    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    let parsedData: monthAnswerData | null = null;

    docsSnap.forEach((doc) => {
      const data = doc.data();
      parsedData = data.monthAnswer as monthAnswerData;
    });

    return parsedData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
};

export const fetchAllMonthAnswerQuestion = async (
  userId: string,
): Promise<monthAnswerData[] | null> => {
  try {
    const q = query(apiBaseCollection, where('monthAnswer.userId', '==', userId));
    const docsSnap = await getDocs(q);

    if (docsSnap.empty) {
      return null;
    }

    const answersDetails: monthAnswerData[] = [];
    docsSnap.forEach((doc) => {
      const data = doc.data().monthAnswer;
      answersDetails.push({
        answers: data.amounts,
        id: data.id,
        month: data.month,
        questionTitle: data.questionTitle,
        userId: data.userId,
      });
    });
    return answersDetails;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
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
