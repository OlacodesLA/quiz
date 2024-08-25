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
}: Props) => {
  const router = useRouter();
  const remainingTime = endTime ? Math.max(0, endTime - Date.now() / 1000) : 0;

  const onTimeout = () => {
    // Handle timeout logic if needed
    setEndModal(true);
  };

  const children = ({ remainingTime }: any) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };

  return (
    <div className="px-6 py-2 flex items-center justify-between">
      <div className="">
        <div className="text-2xl font-semibold font-fredoka">
          Course: {name}
        </div>
        <div className="text-gray-700 text-sm">
          You have 30 minutes to finish this section
        </div>
      </div>
      <StartModal show={showModal} onClick={startExam} />{" "}
      <EndModal show={endModal} onClick={() => router.push("/exam")} />{" "}
      {/* Pass the show prop to control modal visibility */}
      <div className="h-24">
        <CountdownCircleTimer
          isPlaying
          duration={remainingTime}
          size={80}
          strokeWidth={7}
          colors={["#1E293B", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={onTimeout}
        >
          {children}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default ExamHeading;
