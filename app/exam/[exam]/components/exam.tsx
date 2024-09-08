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

type Props = {
  questions: any;
  code: string;
  userId: string;
  name: string;
};

const Exam = ({ questions, code, userId, name }: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState(questions);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [endModal, setEndModal] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);

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

  useEffect(() => {
    fetchEndTime();

    const unsubscribe = onSnapshot(examDocRef, (docSnapshot) => {
      const endTimestamp = docSnapshot.exists()
        ? docSnapshot.data()?.endTime
        : null;
      setEndTime(endTimestamp);

      // If the document doesn't exist, show the modal
      if (!docSnapshot.exists()) {
        setShowModal(true);
      }
      if (docSnapshot.exists() && remainingTime === 0 && endTime) {
        setEndModal(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [examDocRef]);

  const startExam = async () => {
    try {
      const docSnapshot = await getDoc(examDocRef);

      if (docSnapshot.exists()) {
        // Document already exists, fetch the existing end time
        const existingEndTime = docSnapshot.data()?.endTime;
        setEndTime(existingEndTime);
      } else {
        // Document doesn't exist, set a new end time
        const examDuration = 360; // 30 minutes in seconds
        const endTimestamp = Math.floor(Date.now() / 1000) + examDuration;

        await setDoc(examDocRef, { endTime: endTimestamp });
        setEndTime(endTimestamp);
      }

      // Close the modal after starting the exam
      setShowModal(false);
    } catch (error) {
      console.error("Error starting exam:", error);
    }
  };

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
      />

      {fetched && (
        <>
          <div className="flex justify-between items-start w-full px-4 md:px-6 gap-10">
            <ECarousel
              setSelectedAnswers={setSelectedAnswers}
              questions={questions}
              setApi={setApi}
            />
            <List
              selectedAnswers={selectedAnswers}
              questions={questions}
              current={current}
              api={api}
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
