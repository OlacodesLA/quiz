"use client";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

type Props = {
  heading: string;
};

const ExamHeading = ({ heading }: Props) => {
  const onTimeout = () => {};

  const children = ({ remainingTime }: any) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };

  return (
    <div className="py-2 flex items-center justify-between">
      <div className="">
        <div className="text-2xl font-semibold font-fredoka">{heading}</div>
      </div>
    </div>
  );
};

export default ExamHeading;
