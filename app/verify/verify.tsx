"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { verifyPayment } from "@/axios/endpoints/verify.endpoint";

const VerifyPayment = ({ me }: any) => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");

  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const level = searchParams.get("level");

  console.log("User Verification", me);

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      try {
        const response = await verifyPayment({
          reference: reference,
          levelName: level,
          userId: me?.userId,
        });

        setVerified(true);
        setMessage("Payment verified successfully!");
        console.log(response);
      } catch (error: any) {
        setVerified(false);
        setMessage("Payment verification failed. Please try again.");
        console.error("Verification error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (reference) {
      verify();
    }
  }, [reference, level, me?.userId]);

  if (!reference) {
    return null;
  }

  return (
    <div className="text-center text-xl">
      {loading ? (
        <h1>Verifying Payment...</h1>
      ) : verified ? (
        <h1 className="text-green-500">{message}</h1>
      ) : (
        <h1 className="text-red-500">{message}</h1>
      )}
    </div>
  );
};

export default VerifyPayment;
