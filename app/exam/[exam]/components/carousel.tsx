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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export function ECarousel({
  setSelectedAnswers,
  questions,
  setApi,
  user,
  handleSubmit,
  isSubmitting,
}: any) {
  const [selectedValues, setSelectedValues] = React.useState<{
    [key: number]: string;
  }>({});

  const handleValueChange = (index: number, value: string) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));

    setSelectedAnswers((prevAnswers: any) => {
      const updatedAnswers = prevAnswers?.map((answer: any, idx: number) => ({
        ...answer,
        selectedAnswer: idx === index ? value : answer.selectedAnswer,
      }));
      return updatedAnswers;
    });
  };

  const parseOptions = (optionsString: string): string[] => {
    // Split by pattern "(x) " where x is any letter and extract the text after it
    // console.log("optionsString", optionsString);
    return optionsString
      ?.split(/\([a-z]\)\s+/)
      ?.filter((option) => option.trim().length > 0);
  };

  return (
    <Carousel setApi={setApi} className="w-full min-w-[300px]">
      <CarouselContent className="mb-3">
        {questions?.map((question: any, index: number) => {
          const optionsArray =
            question.options &&
            question.options.length < 2 &&
            typeof question.options[0] === "string"
              ? parseOptions(question.options[0])
              : question.options;

          return (
            <CarouselItem key={index}>
              <Card className="">
                <CardHeader>
                  {!question.options ? (
                    <CardTitle>Theory {index + 1}</CardTitle>
                  ) : (
                    <CardTitle>Question {index + 1}</CardTitle>
                  )}
                </CardHeader>
                <CardContent>
                  <p>{question.text}</p>
                </CardContent>
              </Card>
              <Card className="mt-3 pt-5">
                <CardContent>
                  {optionsArray && optionsArray.length > 0 ? (
                    <RadioGroup
                      onValueChange={(value) => handleValueChange(index, value)}
                      value={selectedValues[index] || ""}
                    >
                      {optionsArray.map((option: any, optionIndex: number) => (
                        <div
                          key={`${index}-${optionIndex}`}
                          className={`flex items-center relative capitalize space-x-2 rounded-md py-3 px-3 mb-1 ${
                            selectedValues[index] === option
                              ? "bg-gray-900"
                              : "bg-gray-100"
                          }`}
                        >
                          <RadioGroupItem
                            value={option}
                            id={`${index}-${optionIndex}`}
                            className={`${
                              selectedValues[index] === option
                                ? "bg-gray-100 text-gray-900"
                                : "bg-gray-100"
                            }`}
                          />
                          <Label
                            className={`font-normal absolute w-full h-none translate-x-5 ${
                              selectedValues[index] === option
                                ? "text-gray-100 w-full"
                                : ""
                            }`}
                            htmlFor={`${index}-${optionIndex}`}
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor={`answer-${index}`}>Your Answer:</Label>
                      <Textarea
                        id={`answer-${index}`}
                        value={selectedValues[index] || ""}
                        onChange={(e) =>
                          handleValueChange(index, e.target.value)
                        }
                        placeholder="Type your answer here..."
                        className="w-full min-h-36"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      {/* <Button onClick={handleSubmit} disabled={isSubmitting} className="mt-4">
        {isSubmitting ? "Submitting..." : "Submit Exam"}
      </Button> */}
      <Previous className="absolute flex items-center gap-2 w-24 h-10 bg-gray-900 rounded-md text-white">
        <p>Previous</p>
      </Previous>
      <Next className="absolute flex items-center gap-2 right-0 w-24 h-10 bg-gray-900 rounded-md text-white">
        <p>Next</p>
      </Next>
      {/* <Next /> */}
    </Carousel>
  );
}
