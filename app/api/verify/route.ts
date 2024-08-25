import axios from "axios";
import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Redirect } from "next";
import { db } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { reference, userId, levelName } = body;

  if (!reference) {
    return new NextResponse("Reference is required", { status: 401 });
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

    console.log(response.data?.data?.message);

    console.log("userId", userId);

    const paymentDocRef = doc(db, "users", userId, "payments", levelName);
    const LevelDoc = doc(db, "users", userId);
    const dynamicObject = {} as any;
    dynamicObject[levelName] = true;
    await setDoc(paymentDocRef, { level: levelName, verified: true });
    await setDoc(LevelDoc, dynamicObject);

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      data: response?.data?.data, // Include the ID in the response
    });
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
