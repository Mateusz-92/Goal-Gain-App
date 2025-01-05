import { format } from "date-fns";
import { collection, doc, getDoc, getDocs,getFirestore, query, setDoc, where } from "firebase/firestore";

import { GoalFormValuesSchema, SingleGoalValuesSchema } from "../../validators/validators";
import firebaseApp from "../FirebaseConfig";

const db = getFirestore(firebaseApp);
const apiBaseCollection = collection(db, 'ApiBase');


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