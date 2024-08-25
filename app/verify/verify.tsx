"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { verifyPayment } from "@/axios/endpoints/verify.endpoint";
import getUser from "@/lib/get-user";

type Props = {};

const VerifyPayment = ({ me }: any) => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(null);

  const searchParams = useSearchParams();

  const reference = searchParams.get("reference");
  const level = searchParams.get("level");

  useEffect(() => {
    const verify = async () => {
      setLoading(true);

      const response = await verifyPayment({
        reference: reference,
        levelName: level,
        userId: me?.userId,
      });

      setLoading(false);

      console.log(response);
    };

    verify();
  }, [reference]);

  if (!reference) {
    return null;
  }

  return (
    <div>
      <h1 className="text-center">Verifying Payment...</h1>
    </div>
  );
};

export default VerifyPayment;
