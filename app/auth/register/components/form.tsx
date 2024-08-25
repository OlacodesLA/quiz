"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormik } from "formik";
import { IRegistrationValues } from "@/interfaces/components";
import { DefaultButton } from "@/components/button";
import { PasswordField, TextField } from "@/components/input";
import { registerSchema } from "@/schemas";
import { motion } from "framer-motion";
import StaggerChildren, { childVariants } from "@/animations/staggerChildren";
import { registerUser } from "@/services";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import form from "../../forgot-password/components/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectField from "@/components/input/select";

type Props = {};

const RegisterForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (values: IRegistrationValues, actions: any) => {
    registerUser(values, router, setIsLoading);
  };

  const { handleChange, errors, touched, handleSubmit, values, handleBlur } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        qualification: "",
        password: "",
        password2: "",
      },
      validationSchema: registerSchema,
      onSubmit,
    });

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-2 mt-5">
      <StaggerChildren>
        <motion.div variants={childVariants} className="">
          <TextField
            type="text"
            placeholder="First Name"
            name="firstName"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.firstName}
            error={errors.firstName}
            touched={touched.firstName}
          />
        </motion.div>
        <motion.div variants={childVariants} className="">
          <TextField
            type="text"
            placeholder="Last Name"
            name="lastName"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.lastName}
            error={errors.lastName}
            touched={touched.lastName}
          />
        </motion.div>
        <motion.div variants={childVariants} className="">
          <TextField
            type="email"
            placeholder="Email"
            name="email"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.email}
            error={errors.email}
            touched={touched.email}
          />
        </motion.div>
        <motion.div variants={childVariants} className="">
          <SelectField
            options={qualifications}
            placeholder="Last Qualification"
            name="qualification"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.qualification}
            error={errors.qualification}
            touched={touched.qualification}
          />
        </motion.div>

        <motion.div variants={childVariants} className="flex gap-2 items-start">
          <PasswordField
            name="password"
            placeholder="Password"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.password}
            error={errors.password}
            touched={touched.password}
          />
          <PasswordField
            name="password2"
            placeholder="Confirm Password"
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.password2}
            error={errors.password2}
            touched={touched.password2}
          />
        </motion.div>
        <motion.div variants={childVariants}>
          <DefaultButton
            type="submit"
            isLoading={isLoading}
            label="Create Account"
          />
        </motion.div>
      </StaggerChildren>
    </form>
  );
};

export default RegisterForm;

const qualifications = [
  {
    name: "WAEC/NECO/GCE/NABTEB",
    value: "Foundation I",
  },
  {
    name: "OND/NCE",
    value: "Foundation II",
  },
  {
    name: "HND",
    value: "Intermediate I",
  },
  {
    name: "B.SC/PGD",
    value: "Intermediate II",
  },
  {
    name: "M.SC/MBA",
    value: "Final I",
  },
];
