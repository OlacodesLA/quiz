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
import { BookOpen, Download, Lock, Router } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    pdfUrl: "/courses/foundation-1.pdf",
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
    pdfUrl: "/courses/foundation-2.pdf",
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
    pdfUrl: "/courses/intermediate-1.pdf",
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
    pdfUrl: "/courses/intermediate-2.pdf",
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
    pdfUrl: "/courses/final-1.pdf",
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
    pdfUrl: "/courses/final-2.pdf",
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

function removeSpacesAndLowercaseFirst(str: string) {
  const noSpaces = str.replace(/\s+/g, "");
  return noSpaces.charAt(0).toLowerCase() + noSpaces.slice(1);
}

export default function CourseList({ userCourseList }: any) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Extract the current level from the userCourseList
  const userCurrentLevel = userCourseList.level; // e.g., "Foundation II"

  console.log("User Current Level:", userCurrentLevel);
  console.log(
    "Fixed User Current Level:",
    removeSpacesAndLowercaseFirst(userCurrentLevel.toLowerCase())
  );

  // Find the matching course level by matching a portion of the name
  const currentCourseLevel = courseLevels.find((level) =>
    level.id
      .toLowerCase()
      .includes(removeSpacesAndLowercaseFirst(userCurrentLevel.toLowerCase()))
  );

  // Check if the study pack fee is paid for the current level
  let studyPackPaid = false;
  if (currentCourseLevel) {
    // Construct fee key (e.g., "foundationII_studyPackFee")
    const feeKey = `${currentCourseLevel.id}_studyPackFee`;
    studyPackPaid = userCourseList[feeKey];
  }

  console.log("User Course List:", userCourseList);
  console.log("Current Course Level:", currentCourseLevel);
  console.log("Study Pack Paid:", studyPackPaid);

  if (!currentCourseLevel) {
    return <p className="text-center text-gray-600">No courses available.</p>;
  }

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch(currentCourseLevel.pdfUrl);
      if (!response.ok) throw new Error("Failed to fetch PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentCourseLevel.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("Download Successful", {
        description: `${currentCourseLevel.name} has been downloaded successfully.`,
      });
    } catch (error) {
      toast.error("Download Failed", {
        description:
          "There was an error downloading the course. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReadOnline = () => {
    window.open(currentCourseLevel.pdfUrl, "_blank");
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {currentCourseLevel.emoji} {currentCourseLevel.name}
            </span>
            {studyPackPaid ? (
              <span className="text-sm font-normal text-green-600">
                Paid ✅
              </span>
            ) : (
              <span className="text-sm font-normal text-red-600">Not paid</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {studyPackPaid ? (
            <div>
              <p>Your study pack fee has been paid.</p>
            </div>
          ) : (
            <div>
              <p>Your are yet to pay for study pack.</p>
            </div>
          )}
          <ul className="list-disc list-inside space-y-1">
            {currentCourseLevel.courses.map((course) => (
              <li key={course.id} className="text-sm">
                {course.name}{" "}
                <span className="text-muted-foreground">({course.code})</span>
              </li>
            ))}
          </ul>
        </CardContent>
        {studyPackPaid ? (
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleDownload}
              disabled={loading}
            >
              {loading ? (
                "Downloading..."
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </>
              )}
            </Button>
            <Button variant="secondary" onClick={handleReadOnline}>
              <BookOpen className="mr-2 h-4 w-4" />
              Read Online
            </Button>
          </CardFooter>
        ) : (
          <div className="flex w-full px-4 justify-center">
            <Button
              variant="default"
              className="w-full my-2"
              onClick={() => router.push("/payment")}
            >
              Make payment
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
