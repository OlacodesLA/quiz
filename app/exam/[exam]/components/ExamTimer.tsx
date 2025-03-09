"use client";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface ExamTimerProps {
  endTime: number | null;
  onTimeUp: () => void;
}

const ExamTimer = ({ endTime, onTimeUp }: ExamTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!endTime) return;

    const now = Math.floor(Date.now() / 1000);
    const remaining = Math.max(0, endTime - now);

    // Check if exam has already expired
    if (remaining === 0) {
      setIsExpired(true);
      onTimeUp();
      return;
    }

    setTimeLeft(remaining);
    setKey((prev) => prev + 1);
  }, [endTime, onTimeUp]);

  const formatTime = ({ remainingTime }: { remainingTime: number }) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return (
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold">
          {`${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
        </div>
        <div className="text-sm text-gray-500 mt-1">Remaining</div>
      </div>
    );
  };

  if (isExpired) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Exam Ended</h2>
          <p className="text-gray-600">
            The time allocated for this exam has expired.
          </p>
        </div>
      </div>
    );
  }

  if (!endTime || timeLeft === 0) return null;

  return (
    <div className="flex items-center justify-center">
      <CountdownCircleTimer
        key={key}
        isPlaying
        duration={timeLeft}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[timeLeft, timeLeft / 2, timeLeft / 4, 0]}
        size={120}
        strokeWidth={6}
        onComplete={() => {
          setIsExpired(true);
          onTimeUp();
        }}
      >
        {formatTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default ExamTimer;
