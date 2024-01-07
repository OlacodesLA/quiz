import { useRouter } from "next/navigation";
import React, { useState } from "react";

import AuthLayout from "@/layout/authLayout";
import { Heading } from "@/components/ui/heading";
import RegisterForm from "./components/form";

export default function SignUp() {
  return (
    <AuthLayout>
      <Heading
        title="Register"
        description="create an account to get started"
      />
      <RegisterForm />
    </AuthLayout>
  );
}
