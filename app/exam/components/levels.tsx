import { Button } from "@/components/ui/button";
import { Clock9 } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  level: CoursesObject;
  stage: string;
};

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

type ColorVariants = {
  [key: string]: string;
};

const Levels: React.FC<Props> = ({ level, stage }) => {
  const colorVariants: ColorVariants = {
    "Foundation I": "bg-1",
    "Foundation II": "bg-2",
    "Intermediate I": "bg-3",
    "Intermediate II": "bg-4",
    "Final Level I": "bg-5",
    "Final Level II": "bg-6",
  };

  const textVariants: ColorVariants = {
    "Foundation I": "text-1",
    "Foundation II": "text-2",
    "Intermediate I": "text-3",
    "Intermediate II": "text-4",
    "Final Level I": "text-5",
    "Final Level II": "text-6",
  };

  const levelVariants: ColorVariants = {
    "Foundation I": "1",
    "Foundation II": "2",
    "Intermediate I": "3",
    "Intermediate II": "4",
    "Final Level I": "5",
    "Final Level II": "6",
  };
  console.log("Level", typeof level, Object.keys(level).length);
  return (
    <div>
      {Object.keys(level).length === 0 ? (
        <div className="py-10 text-center">
          <p>You have no {stage} level exam</p>
        </div>
      ) : (
        <>
          {Object.keys(level).map((key, index) => (
            <div className="mb-10" key={key}>
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={`/levels/${levelVariants[key]}.png`}
                  className="w-10"
                  alt=""
                />
                <h2 className="font-bold text-lg">{key}</h2>
              </div>

              <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-start gap-5 w-full">
                {level[key].courses.map((course: any) => (
                  <div
                    className="bg-white rounded-md shadow-sm "
                    key={course.code}
                  >
                    <div className={`bg-black h-2 rounded-t-md`}></div>
                    <div className="p-2">
                      <div className="w-full flex justify-between">
                        <h3 className="text-gray-400 text-lg font-medium">
                          30 QUESTIONS
                        </h3>
                        <div className="">
                          <span
                            className={`${colorVariants[key]} rounded-lg px-2 py-0.5  text-white text-[12px] `}
                          >
                            {course.code}
                          </span>
                        </div>
                      </div>
                      <div className="font-medium py-2">{course.name}</div>
                      <div className="flex items-center justify-between w-full">
                        <div
                          className={`flex items-center  py-2 gap-2 ${textVariants[key]}`}
                        >
                          <Clock9 size="20" /> <p>45 minutes</p>
                        </div>

                        {stage === "Current" && (
                          <Button type="button" size="sm" variant="outline">
                            <Link
                              href={`/exam/${course.code.replace("/", "-")}`}
                            >
                              Start
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Levels;
