"use client";
import React, { useEffect } from "react";
import List from "./list";
import { CarouselApi } from "@/components/ui/carousel";
import ExamHeading from "./heading";
import { object } from "yup";
import clsx from "clsx";
import Levels from "./levels";
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

  return (
    <div className="w-full px-6">
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
