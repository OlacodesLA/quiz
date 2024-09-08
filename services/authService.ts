"use client";
import {
  Auth,
  GoogleAuthProvider,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  IForgotValues,
  ILoginValues,
  IRegistrationValues,
  IResetValues,
} from "@/interfaces/components";
import toast from "react-hot-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookie, setCookie } from "cookies-next";
import useMounted from "@/utils";
import { getFirebaseErrorMessage } from "@/utils/errorHandler";
import { usersCollectionRef } from "@/utils/users";
import postToken from "@/lib/post-token";
import { clientAuth } from "@/lib/firebase-client";

export const registerUser = async (
  values: IRegistrationValues,
  router: AppRouterInstance,
  setIsLoading: (value: boolean) => void
) => {
  const { email, password, firstName, lastName, qualification } = values;
  setIsLoading(true);
  createUserWithEmailAndPassword(auth as Auth, email, password)
    .then(async (cred) => {
      // Attach the user id to the user document
      const userDoc = await doc(usersCollectionRef, cred.user.uid);
      // Set the user
      await setDoc(userDoc, {
        email,
        firstName,
        lastName,
        userId: cred.user.uid,
        level: qualification,
        govt: "",
        state: "",
        phone: "",
        membership: "",
        nationality: "",
        year: "",
        schools: "",
        gender: "",
        picture: "",
        certificate: "",
        membershipNumber: "",
        institute: "",
        dob: "",
        qualifications: "",
        certificateAward: "",
        acceptanceFee: false,
        foundationI: false,
        foundationII: false,
        intermediateI: false,
        intermediateII: false,
        finalI: false,
        finalII: false,
      });
      console.log(cred);
    })
    .then(() => {
      toast.success("Account created successfully");
      setIsLoading(false);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    })
    .catch((error) => {
      console.error(error.message);
      const errorMessage = getFirebaseErrorMessage(error.code);
      toast.error(errorMessage);
      setIsLoading(false);
      return error;
    });
};

export const loginUser = async (
  values: ILoginValues,
  router: AppRouterInstance,
  setIsLoading: (value: boolean) => void
) => {
  const { email, password } = values;
  setIsLoading(true);

  try {
    const cred = (await signInWithEmailAndPassword(
      auth as Auth,
      email,
      password
    )) as any;
    console.log(cred);

    if (cred) {
      await postToken(cred.user);
      toast.success("Successfully Logged In");
      setIsLoading(false);
      router.push("/");
    }

    if (!cred.user) {
      setIsLoading(false);
    }
  } catch (error: any) {
    console.error(error.message);
    console.log(error.code);
    const errorMessage = getFirebaseErrorMessage(error.code);
    toast.error(errorMessage);
    setIsLoading(false);
  }
};

export const logoutUser = async (router: AppRouterInstance) => {
  try {
    await signOut(auth);
    // deleteCookie("auth", { path: "/" });
    const handleLogout = async () => {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        router.refresh();
      }
    };

    await signOut(clientAuth);
    await handleLogout();

    router.refresh();
  } catch (error) {
    console.error(error);

    return error;
  } finally {
    toast.success("Logged Out Successfully");
  }
};

export const loginWithGoogle = async (router: AppRouterInstance) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const cred = (await signInWithPopup(auth as Auth, provider)) as any;

    if (cred.user) {
      await postToken(cred.user);
      console.log("LOGIN", cred.user);

      const userDocRef = doc(usersCollectionRef, cred.user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // If the user document doesn't exist, it's the first time logging in
        const [firstName, lastName] = cred.user.displayName.split(" ");
        await setDoc(userDocRef, {
          email: cred.user.email,
          firstName,
          lastName,
          userId: cred.user.uid,
          picture: cred.user.photoURL,
          govt: "",
          state: "",
          phone: "",
          membership: "",
          nationality: "",
          year: "",
          schools: "",
          gender: "",
          certificate: "",
          membershipNumber: "",
          institute: "",
          dob: "",
          qualifications: "",
          certificateAward: "",
          acceptanceFee: false,
        });

        console.log("First time login");
      } else {
        console.log("Returning user");
      }

      toast.success("Successfully Logged In");
    }

    console.log("GOOGLE LOG IN", cred);
  } catch (error: any) {
    console.error(error.message);
    const errorMessage = getFirebaseErrorMessage(error.code);
    toast.error(errorMessage);
    return error;
  } finally {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }
};

export const resetUserPassword = (
  values: IResetValues,
  oobCode: string,
  router: AppRouterInstance,
  setIsLoading: (value: boolean) => void
) => {
  const { newPassword } = values;
  setIsLoading(true);

  confirmPasswordReset(auth as Auth, oobCode, newPassword)
    .then((cred) => {
      console.log(cred);
      toast.success("Password has been changed you can now login");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error(error.message);
      const errorMessage = getFirebaseErrorMessage(error.code);
      toast.error(errorMessage);
      setIsLoading(false);
    });
};

export const forgotUserPassword = (
  values: IForgotValues,
  router: AppRouterInstance,
  setIsLoading: (value: boolean) => void
) => {
  const { email } = values;
  setIsLoading(true);

  sendPasswordResetEmail(auth as Auth, email, {
    url: "http://localhost:3000/auth/login",
  })
    .then((cred) => {
      console.log(cred);
      toast.success("Email sent, check yout email");
      setIsLoading(false);
    })
    .catch((error) => {
      console.error(error.message);
      const errorMessage = getFirebaseErrorMessage(error.code);
      toast.error(errorMessage);
      setIsLoading(false);
    });
};
