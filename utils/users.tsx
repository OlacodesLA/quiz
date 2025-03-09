import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const usersCollectionRef = collection(db, "users");
export const questionsCollectionRef = collection(db, "questions");

export async function getUserPaymentStatus(userId: string, level: string) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    return userData.paidFees?.[level] || {};
  }
  return {};
}

export async function updateUserPaymentStatus(
  userId: string,
  level: string,
  feeName: string
) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    [`paidFees.${level}.${feeName}`]: true,
  });
}
