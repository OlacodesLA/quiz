"use client";
import React from "react";
import { logoutUser } from "@/services";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

type Props = {};

const Logout = (props: Props) => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="flex items-center gap-3 mb-10 px-6"
      onClick={() => {
        logoutUser(router);
      }}
    >
      <LogOut className="text-2xl text-red-500" />
      Log out
    </button>
  );
};

export default Logout;
