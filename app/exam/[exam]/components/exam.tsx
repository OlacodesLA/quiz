"use client";
import React, { useEffect } from "react";
import { ECarousel } from "./carousel";
import List from "./list";
import { CarouselApi } from "@/components/ui/carousel";
import ExamHeading from "./heading";
import DrawerList from "./drawerList";
import { Button } from "@/components/ui/button";
import { questionsCollectionRef } from "@/utils/users";
import { setDoc, doc } from "firebase/firestore";

type Props = {
  questions: any;
  code: string;
  userId: string;
};

const Exam = ({ questions, code, userId }: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState(questions);

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

  const updateData = async (data: any) => {
    try {
      const questionDoc = doc(questionsCollectionRef, "F1-002");
      await setDoc(questionDoc, { questions: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ExamHeading code={code} userId={userId} />
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
      <Button
        type="button"
        onClick={() => updateData(officeOrganisationQuestions)}
      >
        Update Data
      </Button>
    </div>
  );
};

export default Exam;

// questionData.js
export const officeOrganisationQuestions = [
  {
    id: 1,
    text: "Office Organisation is a process of _______ and ________ of office activities into main heads of functions",
    options: [
      "defining and mapping",
      "defining and grouping",
      "mapping and grouping",
    ],
    correctAnswer: "",
  },
  {
    id: 2,
    text: "The Office Organisation is based on  _______ and procedures and ________",
    options: [
      "continuous flow of work and planning routine",
      "organized routine and continuous flow of work",
      "planning routine and continuous flow of work",
    ],
    correctAnswer: "",
  },
  {
    id: 3,
    text: "The very purpose of any office organisation is to avoid ______ and ________",
    options: [
      "waste of energy and duplication of work",
      "waste of time and duplication of work",
      "waste of effort and duplication of work",
    ],
    correctAnswer: "",
  },
  {
    id: 4,
    text: "The activities of the office should be divided according to __________ and assigned to persons according to their  _________",
    options: [
      "duties, job description",
      "functions, specialization",
      "job description, specialization",
    ],
    correctAnswer: "",
  },
  {
    id: 5,
    text: "The way your office environment is designed affects __________ and _________and facilitates interaction",
    options: [
      "work flow and service quality",
      "organisation and workflow",
      "company operations and service quality",
    ],
    correctAnswer: "",
  },
  {
    id: 6,
    text: "An open office environment encourages the exchange of _______ and _________",
    options: [
      "Understand and information",
      "Information and Ideas",
      "operations and information",
    ],
    correctAnswer: "",
  },
  {
    id: 7,
    text: "Organisation and _________________________ often go hand-in-hand",
    options: [
      "effective time control",
      "effective time management",
      "effective time analysis",
    ],
    correctAnswer: "",
  },
  {
    id: 8,
    text: "An Organisational Structure is also known as _____________________",
    options: [
      "Org Mapping",
      "Organogram Structure or Org Structure",
      "Organogram chart",
    ],
    correctAnswer: "",
  },
  {
    id: 9,
    text: "Office Administration is the system of arranging  ______, organizing and ________",
    options: [
      "planning and controlling office exercises",
      "sorting out and controlling office exercises",
      "sorting out and planning office exercises",
    ],
    correctAnswer: "",
  },
  {
    id: 10,
    text: "Productivity and adequacy are catch phrases in _______________",
    options: ["Management", "Administration", "Organisation"],
    correctAnswer: "",
  },
  {
    id: 11,
    text: "Office expenses must be decreased under the direction and control of __________",
    options: [
      "productive administration",
      "productive administrator",
      "operations administrator",
    ],
    correctAnswer: "",
  },
  {
    id: 12,
    text: "Administrator helps in keeping up _____________ in an office",
    options: ["operations", "productivity", "responsibility"],
    correctAnswer: "",
  },
  {
    id: 13,
    text: "Communication is the essence of  ________________",
    options: ["Development", "Management", "Production"],
    correctAnswer: "",
  },
  {
    id: 14,
    text: "The basic functions of Management cannot be performed well without_________",
    options: [
      "effective communication",
      "effective understanding",
      "effective planning",
    ],
    correctAnswer: "",
  },
  {
    id: 15,
    text: "Business Communication involves constant ____________________",
    options: ["flow of information", "flow of ideas", "flow of decision"],
    correctAnswer: "",
  },
  {
    id: 16,
    text: "Business Communication is regulated by certain __________ and ___________",
    options: ["rules and norms", "ideas and norms", "rules and regulation"],
    correctAnswer: "",
  },
  {
    id: 17,
    text: "Effective Business Communication helps in building __________ of an organisation",
    options: ["goodwill", "free will", "freedom of choice"],
    correctAnswer: "",
  },
  {
    id: 18,
    text: "The church administration sets up ______________ and ______________ to help the church operate to its maximum potential",
    options: [
      "regulations and norms",
      "rules and regulations",
      "rules and norms",
    ],
    correctAnswer: "",
  },
  {
    id: 19,
    text: "The logistical side of operating the church is one reason why we need __________",
    options: ["Administration", "Officer", "Entrepreneur"],
    correctAnswer: "",
  },
  {
    id: 20,
    text: "Church Communication Management is about _____________ in a proactive way to keep employee, ______________ and members informed and _______________",
    options: [
      "sharing information, volunteers, engaged",
      "volunteerism, engagement and information",
    ],
    correctAnswer: "",
  },
];
