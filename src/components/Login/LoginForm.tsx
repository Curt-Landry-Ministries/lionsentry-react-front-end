"use client";

"use client";
import React, { useState } from "react";
import FormWrapper from "../Global/Forms/FormWrapper";
import { Form, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import Input from "../Global/Forms/Input";
import Button from "../Global/Button";
import Link from "next/link";
import { login } from "@/lib/auth/actions";

const LoginForm = () => {
  const [errors, setErrors] = useState("");
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const initialValues: FormikValues = {
    email: "",
    password: "",
  };

  const handlSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    try {
      await login({ email: values.email, password: values.password });
    } catch (error: any) {
      setErrors(
        "Issue with logging in. Make sure your credentials are correct."
      );
    }
  };

  return (
    <FormWrapper
      title="Login"
      validationSchema={validationSchema}
      initialValues={initialValues}
      handleSubmit={handlSubmit}
    >
      <Form>
        <Input
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="your-email@domain.com"
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          required
        />
        {errors && <p className="text-red-500 text-xs mb-4">{errors}</p>}

        <Button type="submit" standardBtn={"primary"}>
          Login
        </Button>

        <p className="text-sm font-light text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg text-sm px-1 py-2 text-center dark:focus:ring-blue-800"
          >
            Signup
          </Link>
        </p>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;
