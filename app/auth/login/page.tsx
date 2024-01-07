import React, { useState } from "react";

import AuthLayout from "@/layout/authLayout";
import LoginForm from "./components/form";

const Login = () => {
  return (
    <AuthLayout>
      <div className="text-black font-semibold text-4xl mb-4 text-center">
        Login
      </div>
      <LoginForm />
      {/* <Sharingan /> */}
    </AuthLayout>
  );
};

export default Login;
