"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "@/components/ui/info";
import { Edit } from "lucide-react";
import PersonalForm from "./forms/personalForm";

type Props = {};

const PersonalInfo = ({
  firstName,
  lastName,
  email,
  gender,
  phone,
  dob,
  nationality,
  state,
  govt,
  user,
}: any) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="mt-5">
      <h1 className="text-lg font-bold text-gray-800 mb-2">
        Personal Information
      </h1>
      {edit ? (
        <PersonalForm setEdit={setEdit} info={user} />
      ) : (
        <div className="w-full h-full rounded-xl bg-white md:px-5 px-4 md:py-5 py-4  ">
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-y-6 gap-x-6">
            <Info title="First Name" content={firstName} />
            <Info title="Last Name" content={lastName} />
            <Info title="Email" content={email} />
            <Info title="Gender" content={gender} />
            <Info title="Phone" content={phone} />
            <Info title="DOB" content={dob} />
            <Info title="Nationality" content={nationality} />
            <Info title="State of Origin" content={state} />
            <Info title="Local Govt Area" content={govt} />
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

export default PersonalInfo;
