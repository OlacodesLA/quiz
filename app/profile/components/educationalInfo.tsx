"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "@/components/ui/info";
import { Edit } from "lucide-react";
import EducationalForm from "./forms/educationalForm";

type Props = {};

const EducationalInfo = ({
  schools,
  year,
  certificateAward,
  qualifications,
  user,
}: any) => {
  const [edit, setEdit] = useState(false);
  return (
    <div className="mt-5">
      <h1 className="text-lg font-bold text-gray-800 mb-2">
        Educational Background
      </h1>
      {edit ? (
        <EducationalForm setEdit={setEdit} info={user} />
      ) : (
        <div className="w-full h-full rounded-xl bg-white md:px-5 px-4 md:py-5 py-4  ">
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-y-6 gap-x-6">
            <Info title="Name of Schools Attended" content={schools} />
            <Info title="Year Started / Year Graduated" content={year} />
            <Info
              title="Certificate Awarded with Date"
              content={certificateAward}
            />
            <Info
              title="Last Qualifications (Required)"
              content={qualifications}
            />
          </div>
          <div className="flex justify-end w-full">
            <Button type="button" onClick={() => setEdit(true)} size="sm">
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationalInfo;
