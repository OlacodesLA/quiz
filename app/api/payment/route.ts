import axios from "axios";
import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Redirect } from "next";
import { db } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { name, amount, email, userId, levelName } = body;

  const reference = `payment-${new Date().getTime()}-${Math.floor(
    Math.random() * 1000000
  )}`;

  if (!name) {
    return new NextResponse("Name is required", { status: 401 });
  }
  if (!amount) {
    return new NextResponse("Amount is required", { status: 401 });
  }
  if (!email) {
    return new NextResponse("Email is required", { status: 401 });
  }
  if (!levelName) {
    return new NextResponse("Level Name is required", { status: 401 });
  }

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        name,
        reference,
        amount,
        email,
        callback_url:
          process.env.NEXT_PUBLIC_NODE_ENV === "development"
            ? `${process.env.NEXT_PUBLIC_LOCAL}/verify?reference=${reference}&level=${levelName}`
            : `${process.env.NEXT_PUBLIC_PRODUCTION}/verify?reference=${reference}&level=${levelName}`,
      },
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

    const paymentDocRef = doc(db, "payments", reference);

    // Use setDoc to create the document in the payments collection
    await setDoc(paymentDocRef, {
      userId,
      levelName,
      name,
      amount,
      email,
      verified: false,
      link: response?.data?.data?.authorization_url,
      createdAt: new Date(),
    });

    const data = {
      levelName,
      name,
      amount,
      link: response?.data?.data?.authorization_url,
    };

    return NextResponse.json({
      success: true,
      message: "Payment Initiated successfully",
      data: data, // Include the ID in the response
    });
  } catch (error: any) {
    console.error(error);
    if (error.response.data.status === false) {
      console.log(error.response.data?.message);
    }
    return new NextResponse(
      "An error occurred while processing the transaction",
      { status: 500 }
    );
  }
}
