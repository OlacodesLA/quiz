"use client";
import React from "react";
import { makePayment } from "@/axios/endpoints/payment.endpoint";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Pricing from "./pricing";
import { userAgent } from "next/server";
import toast from "react-hot-toast";

type Props = {};

type PaymentCardProps = {
  levelName: string;
  fees: Record<string, number>;
  user: any;
};

function convertToTitleCase(str: string) {
  return (
    str
      .replace(/\b\w/g, function (char: string) {
        return char.toUpperCase();
      })
      // .replace(/I{2}/g, "II")
      // .replace(/I\b/g, "I")
      // .replace(/I$/, "")
      .replace(/Level/g, " ")
  );
}

function removeSpaces(str: string) {
  return str?.replace(/\s+/g, "");
}

const InitiatePayment = ({ user }: any) => {
  console.log("Payment User", user);
  return (
    <div className="px-6">
      <div className="max-w-screen-xl  py-8  sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
          {Object.entries(feeStructure).map(([levelName, fees]) => (
            <div
              key={levelName}
              className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm"
            >
              <PaymentCard levelName={levelName} fees={fees} user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InitiatePayment;

// Assuming this is a separate component named PaymentCard

const PaymentCard: React.FC<PaymentCardProps> = ({ levelName, fees, user }) => {
  const pay = async () => {
    // Summing up all fees for the payment
    const convertedLevel = convertToTitleCase(levelName);
    console.log("USER oo", user);
    const totalAmount = Object.values(fees).reduce((sum, fee) => sum + fee, 0);

    console.log(Number(totalAmount / 1000));

    console.log(convertedLevel, user?.level, levelName);
    if (
      convertedLevel === removeSpaces(user?.level) ||
      convertedLevel === "AcceptanceFee"
    ) {
      const response = (await makePayment({
        userId: user?.userId,
        name: user?.name ?? `${user?.firstName} ${user?.lastName}`,
        amount: Math.floor(totalAmount / 10),
        email: user?.email,
        levelName: convertedLevel,
      })) as any;
      console.log(
        `Payment initiated for ${levelName}`,
        response?.data?.data?.link
      );
      window.open(response?.data?.data?.link, "_blank");
    } else {
      // console.log(convertedLevel, user?.level, levelName);
      toast.error("Please choose your currenly level");
    }
  };

  const price = Object.values(fees).reduce((sum, fee) => sum + fee, 0);

  const hasPaid = user?.[levelName] === true;
  const isCurrentLevel =
    convertToTitleCase(levelName) === removeSpaces(user?.level);

  console.log(
    convertToTitleCase(levelName),
    removeSpaces(user?.level),
    isCurrentLevel,
    hasPaid
  );

  return (
    <div>
      <Pricing
        level={levelName}
        price={price}
        pay={pay}
        fees={fees}
        isCurrentLevel={isCurrentLevel}
        hasPaid={hasPaid}
      />
    </div>
  );
};

const feeStructure = {
  acceptanceFee: {
    acceptanceFee: 5000,
  },
  foundationI: {
    studyPackFee: 4000,
    examinationFee: 12000,
  },
  foundationII: {
    exemptionFee: 10000,
    studyPackFee: 4000,
    examinationFee: 14000,
  },
  intermediateI: {
    exemptionFee: 12500,
    studyPackFee: 4500,
    examinationFee: 16000,
  },
  intermediateII: {
    exemptionFee: 15000,
    studyPackFee: 4500,
    examinationFee: 18000,
  },
  finalI: {
    exemptionFee: 20000,
    studyPackFee: 5000,
    examinationFee: 20000,
  },
  finalII: {
    studyPackFee: 5000,
    examinationFee: 25000,
  },
};
