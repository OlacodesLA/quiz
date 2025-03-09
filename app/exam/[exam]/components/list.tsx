"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  questions: any;
  current: number;
  api: any;
  selectedAnswers: any;
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isSubmitting: boolean;
};

const List = ({
  selectedAnswers,
  questions,
  current,
  api,
  handleSubmit,
  isSubmitting,
}: Props) => {
  console.log("Current", current);
  return (
    <div className="hidden lg:flex flex-col bg-white p-5 mt-1 border shadow-sm border-slate-200 rounded-lg">
      <div className="grid grid-cols-5 gap-4 rounded-lg">
        {questions.map((question: any, index: number) => (
          <div
            key={index}
            onClick={() => api.scrollTo(index)}
            className={`flex hover:bg-slate-800 border-2 border-gray-800 group ${
              current === index + 1 && "bg-slate-800"
            }
            ${
              selectedAnswers?.some(
                (answer: { id: number; selectedAnswer: string }) =>
                  answer.id === index + 1 &&
                  answer.selectedAnswer !== null &&
                  answer.selectedAnswer
              ) && "bg-gray-300"
            }  
            rounded-md transition-all items-center justify-center py-2 px-[22px] cursor-pointer`}
          >
            <span
              className={`text-lg text-gray-800 group-hover:text-white ${
                current === index + 1 && "text-white"
              } font-semibold`}
            >
              {index + 1}
            </span>
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="mt-4 w-full"
        variant="default"
      >
        {isSubmitting ? "Submitting..." : "Submit Exam"}
      </Button>
    </div>
  );
};

export default List;
