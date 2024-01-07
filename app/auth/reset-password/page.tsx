import React from "react";
import AuthLayout from "@/layout/authLayout";
import ResetForm from "./components/form";

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <div>Reset Password</div>
      <ResetForm />
    </AuthLayout>
  );
}
