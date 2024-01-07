"use client";
import React from "react";

type Props = {
  questions: any;
  current: number;
  api: any;
  selectedAnswers: any;
};

const List = ({ selectedAnswers, questions, current, api }: Props) => {
  const setSlide = (number: number) => {
    api.scrollTo(number);
  };
  console.log(selectedAnswers);

  return (
    <div className="hidden lg:flex  bg-white p-5 mt-1 border  shadow-sm border-slate-200 rounded-lg">
      <div className="grid grid-cols-5 gap-4  rounded-lg ">
        {questions.map((question: any, index: number) => (
          <div
            key={index}
            onClick={() => setSlide(index)}
            className={`flex hover:bg-slate-800 border-2 border-gray-800 group ${
              current === index + 1 && "bg-slate-800"
            }
            
            ${
              selectedAnswers?.some(
                (answer: { id: string; selectedAnswer: string }) =>
                  answer.id === question.id &&
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
    </div>
  );
};

export default List;
