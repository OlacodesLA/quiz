import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { StartModal } from "./start";
import { EndModal } from "./end"; // Import your modal component
import { useRouter } from "next/navigation";

type Props = {
  code: string;
  userId: string;
  name: string;
  selectedAnswers: any;
  showModal: boolean;
  endModal: boolean;
  startExam: any;
  setEndModal: any;
  endTime: any;
  children: any;
};

const ExamHeading = ({
  code,
  userId,
  name,
  selectedAnswers,
  showModal,
  endModal,
  startExam,
  setEndModal,
  endTime,
  children,
}: Props) => {
  const router = useRouter();
  const remainingTime = endTime ? Math.max(0, endTime - Date.now() / 1000) : 0;

  const onTimeout = () => {
    // Handle timeout logic if needed
    setEndModal(true);
  };

  // const children = ({ remainingTime }: any) => {
  //   const minutes = Math.floor(remainingTime / 60);
  //   const seconds = remainingTime % 60;

  //   return `${minutes}:${seconds}`;
  // };

  return (
    <div className="flex items-center justify-between p-4 md:p-6 border-b">
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-gray-500">Exam Code: {code}</p>
      </div>

      {/* Timer container with fixed width */}
      <div className="w-32">{children}</div>

      <StartModal show={showModal} onClick={startExam} />
      <EndModal show={endModal} onClick={() => setEndModal(false)} />
    </div>
  );
};

export default ExamHeading;
