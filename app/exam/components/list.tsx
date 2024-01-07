import React from "react";

type Props = {};

const List = (props: Props) => {
  return (
    <div className="text-center">
      <h1>Business Admin</h1>
    </div>
  );
};

export default List;

const obj = {
  FoundationI: {
    code: "F1",
    Courses: [
      { name: "Use of English Language 1", code: "F1/001" },
      { name: "Introduction to Church Office Administration", code: "F1/002" },
      { name: "Introduction to Philosophy of Religion", code: "F1/003" },
      { name: "Introduction to Management", code: "F1/004" },
    ],
  },
  FoundationII: {
    code: "F2",
    Courses: [
      { name: "Introduction to Sociology of Religion", code: "F2/001" },
      {
        name: "Introduction to Office Management Principle & Techniques",
        code: "F2/002",
      },
      { name: "Introduction to Computer", code: "F2/003" },
      { name: "Church Office Ethics and Practice", code: "F2/004" },
    ],
  },
  IntermediateI: {
    code: "INT1",
    Courses: [
      { name: "Fundraising Management", code: "INT1/001" },
      { name: "Effective Communication Skill", code: "INT1/002" },
      { name: "Hospitality Management", code: "INT1/003" },
      { name: "Church Event Management", code: "INT1/004" },
    ],
  },
  IntermediateII: {
    code: "INT2",
    Courses: [
      { name: "Church Leadership and Administration", code: "INT2/001" },
      { name: "Church Finance and Accounting Procedure", code: "INT2/002" },
      { name: "Church Security and Safety Management", code: "INT2/003" },
      { name: "Information Management", code: "INT2/004" },
    ],
  },
  FinalLevelI: {
    code: "FL1",
    Courses: [
      { name: "Managing Church Personnel", code: "FL1/001" },
      { name: "Church Packaging and Branding", code: "FL1/002" },
      { name: "Church Database Management", code: "FL1/003" },
      { name: "Church Property Management", code: "FL1/004" },
    ],
  },
  FinalLevelII: {
    code: "FL2",
    Courses: [
      { name: "Church Conflict Management", code: "FL2/001" },
      { name: "Church Insurance and Risk Management", code: "FL2/002" },
      { name: "Church Strategic Planning", code: "FL2/003" },
      { name: "The Church and Law", code: "FL2/004" },
      { name: "Professional Internship Programme", code: "FL2/005" },
    ],
  },
};
