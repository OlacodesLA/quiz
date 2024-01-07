import React from "react";

import AuthLayout from "@/layout/authLayout";
import ForgotForm from "./components/form";

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <div>SignIn</div>
      <ForgotForm />
    </AuthLayout>
  );
}
