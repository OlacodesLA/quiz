"use client";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Next,
} from "@/components/ui/carousel";
import { Previous } from "@/components/ui/carousel";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { type CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export function ECarousel({ setSelectedAnswers, questions, setApi }: any) {
  const [selectedValues, setSelectedValues] = React.useState<{
    [key: string]: string;
  }>({});

  const handleValueChange = (questionId: string, value: string) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [questionId]: value,
    }));

    setSelectedAnswers((prevAnswers: any) => {
      const updatedAnswers = prevAnswers?.map((answer: any) => ({
        ...answer,
        selectedAnswer:
          answer.id === questionId ? value : answer.selectedAnswer,
      }));
      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    const submittedAnswers = questions.map((question: any) => ({
      id: question.id,
      text: question.text,
      options: question.options,
      correctAnswer: question.correctAnswer,
      selectedAnswer: selectedValues[question.id] || null,
    }));
    setSelectedAnswers(submittedAnswers);
    console.log("Submitted Answers:", submittedAnswers);
  };

  return (
    <Carousel setApi={setApi} className="w-full min-w-[300px]">
      <CarouselContent className="mb-3">
        {questions?.map((question: any, index: number) => {
          return (
            <CarouselItem key={question.id}>
              <Card className="">
                <CardHeader>
                  <CardTitle>Question {question.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{question.text}</p>
                </CardContent>
              </Card>
              <Card className="mt-3 pt-5">
                <CardContent>
                  <RadioGroup
                    onValueChange={(value) =>
                      handleValueChange(question.id, value)
                    }
                    value={selectedValues[question.id] || ""}
                  >
                    {question.options.map((option: any, index: number) => {
                      return (
                        <div
                          key={option}
                          className={`flex items-center relative capitalize space-x-2 rounded-md py-3 px-3 mb-1 ${
                            selectedValues[question.id] === option
                              ? "bg-gray-900"
                              : "bg-gray-100"
                          }`}
                        >
                          <RadioGroupItem
                            value={option}
                            id={option + index}
                            className={`${
                              selectedValues[question.id] === option
                                ? "bg-gray-100 text-gray-900"
                                : "bg-gray-100"
                            }`}
                          />
                          <Label
                            className={`font-normal absolute  w-full h-none translate-x-5 ${
                              selectedValues[question.id] === option
                                ? "text-gray-100 w-full"
                                : ""
                            }`}
                            htmlFor={option + index}
                          >
                            {option}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <Button onClick={handleSubmit}>Submit</Button>
      <Previous className="absolute flex items-center gap-2 w-24  h-10 bg-gray-900 rounded-md text-white">
        <p className="">Previous</p>
      </Previous>
      <Next className="absolute flex items-center gap-2 right-0 w-24 h-10 bg-gray-900 rounded-md text-white">
        <p className="">Next</p>
      </Next>
      {/* <Next /> */}
    </Carousel>
  );
}
