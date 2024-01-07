import { IProfilePayload } from "@/interfaces/components/profile";
import React from "react";
import ImageInfo from "./imageInfo";
import PersonalInfo from "./personalInfo";
import EducationalInfo from "./educationalInfo";
import ProfessionalInfo from "./professionalInfo";
import EducationalForm from "./forms/educationalForm";

type Props = {
  user: IProfilePayload;
};

const ProfileUI = ({ user }: Props) => {
  console.log("Usser", user);
  const { firstName, lastName, picture } = user;
  return (
    <div className="mx-6 mt-6 ">
      <ImageInfo firstName={firstName} lastName={lastName} picture={picture} />
      <PersonalInfo {...user} user={user} />
      <EducationalInfo {...user} user={user} />
      <ProfessionalInfo {...user} user={user} />
    </div>
  );
};

export default ProfileUI;
