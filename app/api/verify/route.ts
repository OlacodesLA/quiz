import axios from "axios";
import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Redirect } from "next";
import { db } from "@/config/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { reference, userId, levelName } = body;

  if (!reference) {
    return new NextResponse("Reference is required", { status: 401 });
  }
  if (!userId) {
    return new NextResponse("User is required", { status: 401 });
  }

  if (!levelName) {
    return new NextResponse("Level Name is required", { status: 401 });
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization:
            "Bearer sk_test_dfd3420d808dfbdfdd37deb7460a9a7362b476e5",
        },
      }
    );

    // console.log("PAYMENT_INITIATED", response.data);

    console.log("Payment", response?.data);
    const paymentStatus = response?.data?.status;
    const paymentMessage = response?.data?.message;
    const authorizationUrl = response?.data?.authorization_url;

    console.log("userId", userId);

    if (paymentStatus) {
      // Reference to the top-level "payments" collection
      const paymentDocRef = doc(db, "payments", reference);

      // Update the document to mark the payment as verified
      await setDoc(
        paymentDocRef,
        {
          levelName,
          userId,
          verified: true,
          verificationMessage: paymentMessage,
          verifiedAt: new Date(),
        },
        { merge: true }
      ); // merge: true ensures that existing data is not overwritten
      // Reference to the user's document
      const userDocRef = doc(db, "users", userId);

      // Update the user document to set the acceptanceFee field to true
      await updateDoc(userDocRef, {
        //@ts-ignore
        [toLowerFirstLetter(levelName)]: true,
      });

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        data: response?.data?.data,
      });
    } else {
      return new NextResponse("Payment verification failed", { status: 400 });
    }
  } catch (error: any) {
    console.error(error);
    if (error.response.data.status === false) {
      console.log(error.response.data?.message);
    }
    return new NextResponse(
      "An error occurred while verifying the transaction",
      { status: 500 }
    );
  }
}

function toLowerFirstLetter(str?: string) {
  if (!str) return str; // Return if empty string or undefined
  return str.charAt(0).toLowerCase() + str.slice(1);
}
