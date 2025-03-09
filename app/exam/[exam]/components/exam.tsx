"use client";
import React, { useEffect, useState } from "react";
import { ECarousel } from "./carousel";
import List from "./list";
import { CarouselApi } from "@/components/ui/carousel";
import ExamHeading from "./heading";
import DrawerList from "./drawerList";
import { Button } from "@/components/ui/button";
import { questionsCollectionRef } from "@/utils/users";
import { db } from "@/config/firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { toast } from "react-hot-toast";
import ExamTimer from "./ExamTimer";
import ExamEndingLoader from "./ExamEndingLoader";

type Props = {
  questions: any;
  code: string;
  userId: string;
  name: string;
  user: any;
};

const Exam = ({ questions, code, userId, name, user }: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState(questions);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [endModal, setEndModal] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState<boolean>(false);

  const startExam = async () => {
    const startTime = Math.floor(Date.now() / 1000);
    const examDuration = 1000; // 1 hour in seconds
    await setDoc(
      examDocRef,
      {
        startTime,
        endTime: startTime + examDuration,
        status: "in-progress",
      },
      { merge: true }
    );
    setShowModal(false);
  };

  const examDocRef = doc(db, "users", userId, "exams", code);

  const remainingTime = endTime ? Math.max(0, endTime - Date.now() / 1000) : 0;

  const fetchEndTime = async () => {
    try {
      const docSnapshot = await getDoc(examDocRef);
      const endTimestamp = docSnapshot.exists()
        ? docSnapshot.data()?.endTime
        : null;
      setEndTime(endTimestamp);
      setFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTimeUp = async () => {
    setIsAutoSubmitting(true);
    try {
      await handleSubmit();
    } finally {
      setIsAutoSubmitting(false);
      setEndModal(true);
    }
  };

  const checkExamStatus = async () => {
    try {
      const docSnapshot = await getDoc(examDocRef);
      if (docSnapshot.exists()) {
        const examData = docSnapshot.data();
        // Check if exam was previously submitted
        if (examData?.status === "submitted") {
          setIsSubmitted(true);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Error checking exam status:", error);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) {
      toast.error("This exam has already been submitted");
      return;
    }

    setIsSubmitting(true);
    try {
      const submittedAnswers = questions.map((question: any, index: number) => {
        const optionsArray =
          question.options &&
          question.options.length < 2 &&
          typeof question.options[0] === "string"
            ? parseOptions(question.options[0])
            : question.options;

        let actualCorrectAnswer = question.correctAnswer;
        if (optionsArray && optionsArray.length > 0) {
          const answerIndex =
            question.correctAnswer.toLowerCase().charCodeAt(0) - 97;
          actualCorrectAnswer =
            optionsArray[answerIndex] || question.correctAnswer;
        }

        return {
          id: index + 1,
          text: question.text
            ? question.text.replace(/\\t/g, "")
            : question.text,
          options: optionsArray,
          correctAnswer: actualCorrectAnswer,
          selectedAnswer: selectedAnswers[index]?.selectedAnswer || null,
        };
      });

      const response = await fetch("/api/submit-exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examData: submittedAnswers,
          userEmail: user?.email,
          userName: user?.firstName + " " + user?.lastName,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit exam");
      }

      if (data.success) {
        // Update exam status in Firestore
        await setDoc(
          examDocRef,
          {
            status: "submitted",
            submittedAt: Math.floor(Date.now() / 1000),
          },
          { merge: true }
        );

        setIsSubmitted(true);
        toast.success("Exam submitted successfully");
      } else {
        throw new Error(data.message || "Failed to submit exam");
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit your exam. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const parseOptions = (optionsString: string): string[] => {
    return optionsString
      ?.split(/\([a-z]\)\s+/)
      ?.filter((option) => option.trim().length > 0);
  };

  useEffect(() => {
    const initializeExam = async () => {
      const wasSubmitted = await checkExamStatus();
      if (wasSubmitted) {
        return;
      }
      fetchEndTime();
    };

    initializeExam();

    const unsubscribe = onSnapshot(examDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const examData = docSnapshot.data();
        setEndTime(examData?.endTime);
        setIsSubmitted(examData?.status === "submitted");
      } else {
        setShowModal(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [examDocRef]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  console.log("Current Slide", current);

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-blue-600">
            Exam Already Submitted
          </h1>
          <p className="text-gray-600">
            This exam has already been completed and submitted.
          </p>
          <p className="text-gray-500">
            You cannot modify your answers anymore.
          </p>
        </div>
      </div>
    );
  }

  if (isAutoSubmitting) {
    return <ExamEndingLoader />;
  }

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600">Exam Ended</h1>
          <p className="text-gray-600">
            The time allocated for this exam has expired.
          </p>
          <p className="text-gray-500">
            Your answers have been automatically submitted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ExamHeading
        code={code}
        userId={userId}
        name={name}
        selectedAnswers={selectedAnswers}
        showModal={showModal}
        endModal={endModal}
        startExam={startExam}
        setEndModal={setEndModal}
        endTime={endTime}
      >
        {endTime && !showModal && !endModal && (
          <ExamTimer endTime={endTime} onTimeUp={handleTimeUp} />
        )}
      </ExamHeading>

      {fetched && (
        <>
          <div className="flex justify-between items-start w-full px-4 md:px-6 gap-10">
            <ECarousel
              setSelectedAnswers={setSelectedAnswers}
              questions={questions}
              setApi={setApi}
              user={user}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
            <List
              selectedAnswers={selectedAnswers}
              questions={questions}
              current={current}
              api={api}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="">
            <DrawerList questions={questions} current={current} api={api} />
          </div>
        </>
      )}

      {!fetched && <div className="text-center">Loading</div>}
    </div>
  );
};

export default Exam;

// questionData.js
