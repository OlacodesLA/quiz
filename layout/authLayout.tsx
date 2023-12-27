import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className=" flex justify-center items-center h-screen w-full  pb-10">
      <div className="-translate-y-5 w-[700px] px-3">{children}</div>
    </div>
  );
}
