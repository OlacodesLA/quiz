"use client";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ref, get, set, onValue } from "firebase/database";
import { database } from "@/config/firebase";
import { Button } from "@/components/ui/button";

type Props = {
  code: string;
  userId: string;
};

const ExamHeading = ({ code, userId }: Props) => {
  console.log(userId);

  const endTimeRef = ref(database, `/${userId}/${code}/endTime`);

  const [endTime, setEndTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(endTimeRef);
        const endTimestamp = snapshot.val();
        setEndTime(endTimestamp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Set up a listener to keep the end time updated in real-time
    const listener = onValue(endTimeRef, (snapshot) => {
      const endTimestamp = snapshot.val();
      setEndTime(endTimestamp);
    });

    // Clean up listener on component unmount
    return () => {
      // Unsubscribe from real-time updates
      listener();
    };
  }, [endTimeRef]);

  const startExam = () => {
    // Replace 1800 with the duration of your exam in seconds (30 minutes in this case)
    const examDuration = 1800;
    const endTimestamp = Math.floor(Date.now() / 1000) + examDuration;

    // Set the end time in Firebase Realtime Database
    set(endTimeRef, endTimestamp);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     startExam();
  //   }, 500);
  // }, []);

  const onTimeout = () => {
    // Handle timeout logic if needed
  };

  const remainingTime = endTime ? Math.max(0, endTime - Date.now() / 1000) : 0;

  const children = ({ remainingTime }: any) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };

  return (
    <div className="px-6 py-2 flex items-center justify-between">
      <div className="">
        <div className="text-2xl font-semibold font-fredoka">
          Course: Fundraising Management
        </div>
        <div className="text-gray-700 text-sm">
          You have 30 minutes to finish this section
        </div>
      </div>

      <div className="h-24">
        <CountdownCircleTimer
          isPlaying
          duration={remainingTime}
          size={80}
          strokeWidth={7}
          colors={["#1E293B", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
        >
          {children}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default ExamHeading;
