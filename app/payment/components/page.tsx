"use client";

import type React from "react";
import { makePayment } from "@/axios/endpoints/payment.endpoint";
import toast from "react-hot-toast";

type PaymentCardProps = {
  user: any;
};

function convertToTitleCase(str: string) {
  return str
    .replace(/\b\w/g, (char: string) => char.toUpperCase())
    .replace(/Level/g, " ")
    .trim();
}

function removeSpaces(str: string) {
  return str?.replace(/\s+/g, "");
}

const PaymentCard: React.FC<PaymentCardProps> = ({ user }) => {
  const currentLevel = user?.level;
  const acceptanceFee = 5000;

  const feeStructure: Record<string, Record<string, number>> = {
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

  const currentLevelFees = feeStructure[removeSpaces(currentLevel)] || {};
  const totalAmount = Object.values(currentLevelFees).reduce(
    (sum, fee) => sum + fee,
    0
  );

  const pay = async (isAcceptanceFee: boolean) => {
    const amount = isAcceptanceFee ? acceptanceFee : totalAmount;
    const levelName = isAcceptanceFee
      ? "AcceptanceFee"
      : convertToTitleCase(currentLevel);

    try {
      const response = await makePayment({
        userId: user?.userId,
        name: user?.name ?? `${user?.firstName} ${user?.lastName}`,
        amount: Math.floor(amount / 10),
        email: user?.email,
        levelName,
      });

      window.open(response?.data?.data?.link, "_blank");
    } catch (error) {
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

      {!user?.acceptanceFee && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Acceptance Fee</h3>
          <p className="text-lg mb-2">{formatAmount(acceptanceFee)}</p>
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            onClick={() => pay(true)}
          >
            Pay Acceptance Fee
          </button>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-2">
          Current Level: {convertToTitleCase(currentLevel)}
        </h3>
        <ul className="mb-4">
          {Object.entries(currentLevelFees).map(([feeName, amount]) => (
            <li key={feeName} className="flex justify-between mb-2">
              <span>{feeName}:</span>
              <span>{formatAmount(amount)}</span>
            </li>
          ))}
        </ul>
        <p className="text-lg font-bold mb-2">
          Total: {formatAmount(totalAmount)}
        </p>
        <button
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          onClick={() => pay(false)}
        >
          Pay Level Fees
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
