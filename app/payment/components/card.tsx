"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { makePayment } from "@/axios/endpoints/payment.endpoint";
import { getUserPaymentStatus, updateUserPaymentStatus } from "@/utils/users";
import axios from "axios";
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

function removeSpacesAndLowercaseFirst(str: string) {
  const noSpaces = str.replace(/\s+/g, "");
  return noSpaces.charAt(0).toLowerCase() + noSpaces.slice(1);
}

const formatFeeName = (feeName: string) => {
  return feeName.replace(/([A-Z])/g, " $1").trim();
};

const PaymentCard: React.FC<PaymentCardProps> = ({ user }) => {
  const currentLevel = user?.level;
  const [paidFees, setPaidFees] = useState<Record<string, boolean>>({});
  const currentLevelKey = removeSpacesAndLowercaseFirst(currentLevel);
  console.log("user", user);

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

  const isFeePaid = (feeName: string) => {
    const feePaidProperty = `${currentLevelKey}_${feeName}`;
    return Boolean(user[feePaidProperty]);
  };

  const verifyPayment = async (
    reference: string,
    userId: string,
    levelName: string,
    feeName: string
  ) => {
    try {
      const response = await axios.post("/api/verify", {
        reference,
        userId,
        levelName,
      });
      if (response.data.success) {
        await updateUserPaymentStatus(
          userId,
          removeSpacesAndLowercaseFirst(levelName),
          feeName
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Payment verification failed:", error);
      return false;
    }
  };

  const pay = async (feeName: string, amount: number) => {
    try {
      const response = await makePayment({
        userId: user?.userId,
        name: user?.name ?? `${user?.firstName} ${user?.lastName}`,
        amount: amount,
        email: user?.email,
        levelName: `${convertToTitleCase(currentLevel)}_${feeName}`,
      });

      // Open payment link in a new window
      const paymentWindow = window.open(response?.data?.data?.link, "_blank");

      // Check payment status periodically
      const checkPaymentStatus = setInterval(async () => {
        if (paymentWindow?.closed) {
          clearInterval(checkPaymentStatus);
          // Verify payment status with your backend
          const paymentVerified = await verifyPayment(
            response?.data?.data?.reference,
            user.userId,
            currentLevel,
            feeName
          );
          if (paymentVerified) {
            setPaidFees((prev) => ({ ...prev, [feeName]: true }));
            toast.success("Payment successful!");
          } else {
            toast.error("Payment verification failed. Please contact support.");
          }
        }
      }, 1000);
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

  const currentLevelFees =
    feeStructure[removeSpacesAndLowercaseFirst(currentLevel)] || {};

  return (
    <div className="max-w-2xl px-2 sm:px-6">
      <div className="p-6 sm:px-8 border rounded-lg shadow-sm mb-4">
        <h2 className="text-lg font-semibold capitalize text-gray-900">
          {convertToTitleCase(currentLevel)}
          <span className="sr-only">Level</span>
        </h2>

        <p className="mt-2 text-gray-700">
          Make payments for your current level fees.
        </p>

        <div className="mt-6 space-y-4">
          {Object.entries(currentLevelFees).map(([feeName, amount]) => (
            <div key={feeName} className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700 capitalize">
                    {formatFeeName(feeName)}: {formatAmount(amount)}
                  </span>
                </div>
                {isFeePaid(feeName) ? (
                  <span className="text-green-600 font-medium">Paid</span>
                ) : (
                  <button
                    className="rounded border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-slate-900 focus:outline-none focus:ring active:text-slate-900"
                    onClick={() => pay(feeName, amount)}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
