"use client";
import React, { useEffect } from "react";
import List from "./list";
import { CarouselApi } from "@/components/ui/carousel";
import ExamHeading from "./heading";
import { object } from "yup";
import clsx from "clsx";
import Levels from "./levels";
import { Button } from "@/components/ui/button";
import { questionsCollectionRef } from "@/utils/users";
import { db } from "@/config/firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { Separator } from "@/components/ui/separator";

type Course = {
  name: string;
  code: string;
};

type CourseCategory = {
  code: string;
  courses: Course[];
};

type CoursesObject = {
  [key: string]: CourseCategory;
};

type CategorizedCourses = {
  currentLevel: CoursesObject;
  upcomingLevels: CoursesObject;
  completedLevels: CoursesObject;
};

type Props = {
  user: any;
};

const Exam: React.FC<Props> = ({ user }) => {
  const currentLevel = user?.level;

  const categorizedCourses: CategorizedCourses = {
    currentLevel: {},
    upcomingLevels: {},
    completedLevels: {},
  };

  Object.keys(obj).forEach((key, index) => {
    const courses = obj[key].courses.map((course) => ({
      ...course,
      level: key,
    })) as Course[];

    if (key === currentLevel) {
      categorizedCourses.currentLevel[key] = { ...obj[key], courses };
    } else if (index > Object.keys(obj).indexOf(currentLevel)) {
      categorizedCourses.upcomingLevels[key] = { ...obj[key], courses };
    } else {
      categorizedCourses.completedLevels[key] = { ...obj[key], courses };
    }
  });

  console.log("Current Level", categorizedCourses.currentLevel);
  console.log("Previous Level", categorizedCourses.completedLevels);
  console.log("Upcoming Level", categorizedCourses.upcomingLevels);

  const updateData = async (data: any) => {
    try {
      const questionDoc = doc(questionsCollectionRef, "F1-002");
      await setDoc(questionDoc, {
        questions: data,
        name: "Office Organisation",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-6">
      <Button
        type="button"
        onClick={() => updateData(officeOrganisationQuestions)}
      >
        Update Data
      </Button>
      <div className="">
        <ExamHeading heading="• Current Level Exam" />
        <Levels stage="Current" level={categorizedCourses.currentLevel} />
      </div>
      <Separator className="h-0.5 my-10" />
      <div className="">
        <ExamHeading heading="• Completed Level Exam" />
        <Levels stage="Completed" level={categorizedCourses.completedLevels} />
      </div>
      <Separator className="h-0.5 my-10" />
      <div className="pb-20">
        <ExamHeading heading="• Upcoming Level Exam" />
        <Levels stage="Upcoming" level={categorizedCourses.upcomingLevels} />
      </div>
    </div>
  );
};

export default Exam;

const obj: CoursesObject = {
  "Foundation I": {
    code: "F1",
    courses: [
      { name: "Use of English Language 1", code: "F1/001" },
      { name: "Introduction to Church Office Administration", code: "F1/002" },
      { name: "Introduction to Philosophy of Religion", code: "F1/003" },
      { name: "Introduction to Management", code: "F1/004" },
    ],
  },
  "Foundation II": {
    code: "F2",
    courses: [
      { name: "Introduction to Sociology of Religion", code: "F2/001" },
      {
        name: "Introduction to Office Management Principle & Techniques",
        code: "F2/002",
      },
      { name: "Introduction to Computer", code: "F2/003" },
      { name: "Church Office Ethics and Practice", code: "F2/004" },
    ],
  },
  "Intermediate I": {
    code: "INT1",
    courses: [
      { name: "Fundraising Management", code: "INT1/001" },
      { name: "Effective Communication Skill", code: "INT1/002" },
      { name: "Hospitality Management", code: "INT1/003" },
      { name: "Church Event Management", code: "INT1/004" },
    ],
  },
  "Intermediate II": {
    code: "INT2",
    courses: [
      { name: "Church Leadership and Administration", code: "INT2/001" },
      { name: "Church Finance and Accounting Procedure", code: "INT2/002" },
      { name: "Church Security and Safety Management", code: "INT2/003" },
      { name: "Information Management", code: "INT2/004" },
    ],
  },
  "Final Level I": {
    code: "FL1",
    courses: [
      { name: "Managing Church Personnel", code: "FL1/001" },
      { name: "Church Packaging and Branding", code: "FL1/002" },
      { name: "Church Database Management", code: "FL1/003" },
      { name: "Church Property Management", code: "FL1/004" },
    ],
  },
  "Final Level II": {
    code: "FL2",
    courses: [
      { name: "Church Conflict Management", code: "FL2/001" },
      { name: "Church Insurance and Risk Management", code: "FL2/002" },
      { name: "Church Strategic Planning", code: "FL2/003" },
      { name: "The Church and Law", code: "FL2/004" },
      { name: "Professional Internship Programme", code: "FL2/005" },
    ],
  },
};

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
