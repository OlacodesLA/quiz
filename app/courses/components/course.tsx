"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Download, Lock } from "lucide-react";
import { toast } from "sonner";

interface Course {
  id: string;
  name: string;
  code: string;
}

interface CourseLevel {
  id: string;
  name: string;
  emoji: string;
  pdfUrl: string;
  courses: Course[];
}

interface UserCourseList {
  foundationI: boolean;
  foundationII: boolean;
  intermediateI: boolean;
  intermediateII: boolean;
  finalI: boolean;
  finalII: boolean;
  [key: string]: boolean;
}

interface CourseListProps {
  userCourseList: UserCourseList;
}

const courseLevels: CourseLevel[] = [
  {
    id: "foundationI",
    name: "Foundation Level I",
    emoji: "🌱",
    pdfUrl: "/courses/foundation-I.pdf",
    courses: [
      { id: "F1/001", name: "Use of English", code: "F1/001" },
      {
        id: "F1/002",
        name: "Intro. to Church Office Administration",
        code: "F1/002",
      },
      {
        id: "F1/003",
        name: "Intro. of Philosophy of Religion",
        code: "F1/003",
      },
      { id: "F1/004", name: "Introduction to Management", code: "F1/004" },
    ],
  },
  {
    id: "foundationII",
    name: "Foundation Level II",
    emoji: "🌿",
    pdfUrl: "/courses/foundation-II.pdf",
    courses: [
      { id: "F2/001", name: "Intro. to Sociology of Religion", code: "F2/001" },
      {
        id: "F2/002",
        name: "Intro. to Office Management Principle",
        code: "F2/002",
      },
      { id: "F2/003", name: "Intro. to Computer", code: "F2/003" },
      {
        id: "F2/004",
        name: "Church Office Ethics and Practices",
        code: "F2/004",
      },
    ],
  },
  {
    id: "intermediateI",
    name: "Intermediate Level I",
    emoji: "🌳",
    pdfUrl: "/courses/intermediate-I.pdf",
    courses: [
      { id: "INT1/001", name: "Fundraising Management", code: "INT1/001" },
      {
        id: "INT1/002",
        name: "Effective Communication Skills",
        code: "INT1/002",
      },
      { id: "INT1/003", name: "Hospitality Management", code: "INT1/003" },
      { id: "INT1/004", name: "Church Event Management", code: "INT1/004" },
    ],
  },
  {
    id: "intermediateII",
    name: "Intermediate Level II",
    emoji: "🌴",
    pdfUrl: "/courses/intermediate-II.pdf",
    courses: [
      {
        id: "INT2/001",
        name: "Church Leadership & Administration",
        code: "INT2/001",
      },
      {
        id: "INT2/002",
        name: "Church Finance & Accounting Procedure",
        code: "INT2/002",
      },
      {
        id: "INT2/003",
        name: "Church Security & Safety Management",
        code: "INT2/003",
      },
      { id: "INT2/004", name: "Information Management", code: "INT2/004" },
    ],
  },
  {
    id: "finalI",
    name: "Final Level I",
    emoji: "🌲",
    pdfUrl: "/courses/final-I.pdf",
    courses: [
      { id: "FL1/001", name: "Managing Church Personnel", code: "FL1/001" },
      { id: "FL1/002", name: "Church Packaging & Branding", code: "FL1/002" },
      { id: "FL1/003", name: "Church Database Management", code: "FL1/003" },
      { id: "FL1/004", name: "Church Property Management", code: "FL1/004" },
    ],
  },
  {
    id: "finalII",
    name: "Final Level II",
    emoji: "🎓",
    pdfUrl: "/courses/final-II.pdf",
    courses: [
      { id: "FL2/001", name: "Church Conflict Management", code: "FL2/001" },
      {
        id: "FL2/002",
        name: "Church Insurance & Risk Management",
        code: "FL2/002",
      },
      { id: "FL2/003", name: "Church Strategic Planning", code: "FL2/003" },
      { id: "FL2/004", name: "The Church & Law", code: "FL2/004" },
    ],
  },
];

export default function CourseList({ userCourseList }: any) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleDownload = async (level: CourseLevel) => {
    if (!userCourseList[level.id]) {
      toast.error("Access Denied", {
        description: "You need to purchase this course level to download it.",
      });
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [level.id]: true }));

    try {
      const response = await fetch(level.pdfUrl);
      if (!response.ok) throw new Error("Failed to fetch PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${level.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("Download Successful", {
        description: `${level.name} has been downloaded successfully.`,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download Failed", {
        description:
          "There was an error downloading the course level. Please try again.",
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [level.id]: false }));
    }
  };

  const handleReadOnline = (level: CourseLevel) => {
    if (!userCourseList[level.id]) {
      toast.error("Access Denied", {
        description:
          "You need to purchase this course level to read it online.",
      });
      return;
    }

    window.open(level.pdfUrl, "_blank");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseLevels.map((level) => (
          <Card key={level.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {level.emoji} {level.name}
                </span>
                {userCourseList[level.id] ? (
                  <span className="text-sm font-normal text-green-600">
                    Access Granted ✅
                  </span>
                ) : (
                  <span className="text-sm font-normal text-red-600">
                    Access Denied 🔒
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="list-disc list-inside space-y-1">
                {level.courses.map((course) => (
                  <li key={course.id} className="text-sm">
                    {course.name}{" "}
                    <span className="text-muted-foreground">
                      ({course.code})
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleDownload(level)}
                disabled={!userCourseList[level.id] || loadingStates[level.id]}
              >
                {loadingStates[level.id] ? (
                  "Downloading..."
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleReadOnline(level)}
                disabled={!userCourseList[level.id]}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Read Online
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
