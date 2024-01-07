"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "@/components/ui/info";
import { Edit } from "lucide-react";
import ProfessionalForm from "./forms/professionalForm";

type Props = {};

const ProfessionalInfo = ({
  institute,
  membership,
  certificate,
  membershipNumber,
  user,
}: any) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="mt-5">
      <h1 className="text-lg font-bold text-gray-800 mb-2">
        Professional Qualifications
      </h1>
      {edit ? (
        <ProfessionalForm setEdit={setEdit} info={user} />
      ) : (
        <div className="w-full h-full rounded-xl bg-white md:px-5 px-4 md:py-5 py-4  ">
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-y-6 gap-x-6">
            <Info title="Name of Institute" content={institute} />
            <Info title="Certificate Upload" content={certificate} />
            <Info title="Membership Grade Level" content={membership} />
            <Info title="Membership Number" content={membershipNumber} />
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

export default ProfessionalInfo;
