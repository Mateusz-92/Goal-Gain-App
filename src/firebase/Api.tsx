import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
} from "firebase/firestore";

import {
  DayHabit,
  HabitFormData,
} from "../components/habits/HabitsEditor/HabitsEditor";
import {
  GoalFormValuesSchema,
  MonthlyValuesRatingSchema,
  SingleGoalValuesSchema,
  WeekPlannerData,
} from "../validators/validators";

import firebaseApp from "./FirebaseConfig";
import { auth } from "./FirebaseConfig";

const db = getFirestore(firebaseApp);
const apiBaseCollection = collection(db, "ApiBase");

const loggedUserId = "HGqix4VjeKgPxYwjjfUdLks6eNk2";

export const addHabits = async (newHabits: DayHabit, monthYear: Date) => {
  try {
    const userDocRef = doc(apiBaseCollection);

    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();
    // eslint-disable-next-line no-magic-numbers
    const monthYearString = monthYear.toISOString().split("T")[0];
    const existingHabits =
      userData?.habitsListForMonth?.[monthYearString]?.habits || [];

    const updatedHabits = {
      ...(userData?.habitsListForMonth ?? {}),
      id: userDocRef.id,
      [monthYearString]: {
        habits: [
          ...existingHabits,
          ...(newHabits[monthYearString]?.habits || []),
        ],
      },
      userId: loggedUserId,
    };

    await setDoc(
      userDocRef,
      { habitsListForMonth: updatedHabits },
      { merge: true }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
export const updateHabitStatus = async (
  date: string,
  habitId: string,
  newStatus: boolean
) => {
  try {
    const userDocRef = doc(apiBaseCollection);

    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    const existingHabits = userData?.habitsListForMonth?.[date]?.habits || [];

    const updatedHabitsForDate = existingHabits.map((habit: DayHabit) =>
      habit.id === habitId
? { ...habit, status: newStatus }
: habit
    );

    const updatedHabits = {
      ...(userData?.habitsListForMonth ?? {}),

      [date]: {
        habits: updatedHabitsForDate,
      },
      id: userDocRef.id,
      userId: loggedUserId,
    };
    await setDoc(
      userDocRef,
      { habitsListForMonth: updatedHabits },
      { merge: true }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error updating habit status: ", error);
  }
};

export const fetchLatestHabitForMonth = async (): Promise<DayHabit | null> => {
  try {
    const q = query(
      collection(db, "ApiBase"),
      // where("habitsListForMonth.userId", "==", loggedUserId),
      orderBy("habitsListForMonth", "asc")
    );
    const querySnapshot = await getDocs(q);

    let latestHabitForMonth: HabitFormData | null = null;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (
        data.habitsListForMonth &&
        data.habitsListForMonth.userId === loggedUserId
      ) {
        latestHabitForMonth = {
          ...data.habitsListForMonth,
        };
      }
    });

    // console.log(latestHabitForMonth);
    return latestHabitForMonth;
  } catch (error) {
    return null;
  }
};

export const addGoals = async (data: GoalFormValuesSchema, id?: string) => {
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
      ...(userData?.threeMonthsGoals ?? {}),
      goals: id
        ? data.goals
        : [...(userData?.threeMonthsGoals?.goals ?? []), ...data.goals],
      id: userDocRef.id,
      userId: loggedUserId,
    };

    await setDoc(
      userDocRef,
      { threeMonthsGoals: updatedGoals },
      { merge: true }
    );
  } catch (error) {
    // console.error("Error adding/editing goals: ", error);
  }
};

export const addMonthlyEvaluation = async (
  data: MonthlyValuesRatingSchema,
  id?: string
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
      userId: loggedUserId,
      value: data.value,
    };

    await setDoc(
      userDocRef,
      { monthEvaluation: updatedMonthEvaluation },
      { merge: true }
    );
  } catch (error) {
    // console.error("Error adding monthly evaluation: ", error);
  }
};

export const FetchMonthlyEvaluation = async (
  id: string
): Promise<MonthlyValuesRatingSchema | null> => {
  try {
    const q = query(
      apiBaseCollection,
      where("monthEvaluation.userId", "==", loggedUserId),
      where("monthEvaluation.id", "==", id)
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
    // console.log(error);
    return null;
  }
};
export const fetchGoalsData = async (
  id: string
): Promise<SingleGoalValuesSchema[]> => {
  try {
    const q = query(
      apiBaseCollection,
      where("threeMonthsGoals.userId", "==", loggedUserId),
      where("threeMonthsGoals.id", "==", id)
    );
    const docsSnap = await getDocs(q);

    const parsedData: SingleGoalValuesSchema[] = [];
    docsSnap.forEach((doc) => {
      const data = doc.data();
      parsedData.push(data.threeMonthsGoals.goals as SingleGoalValuesSchema);
    });
    return parsedData;
  } catch (error) {
    // console.error("Error fetching goals data:", error);
  }
  return [];
};

export const addWeekPlan = async (data: WeekPlannerData, id?: string) => {
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
      userId: loggedUserId,
    };

    await setDoc(userDocRef, { weekPlan: updatedWeekPlan }, { merge: true });
  } catch (error) {
    // console.error("Error adding/editing week plan: ", error);
  }
};

export const fetchWeekData = async (
  id: string
): Promise<WeekPlannerData | null> => {
  try {
    const q = query(
      apiBaseCollection,
      where("weekPlan.userId", "==", loggedUserId),
      where("weekPlan.id", "==", id)
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
    return null;
  }
};

export const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};
