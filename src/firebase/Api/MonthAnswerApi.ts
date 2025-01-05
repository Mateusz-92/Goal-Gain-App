import { format } from "date-fns";
import { collection, doc, getDoc, getDocs,getFirestore, query, setDoc, where } from "firebase/firestore";

import { monthAnswerData } from "../../validators/validators";
import firebaseApp from "../FirebaseConfig";

const db = getFirestore(firebaseApp);
const apiBaseCollection = collection(db, 'ApiBase');

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