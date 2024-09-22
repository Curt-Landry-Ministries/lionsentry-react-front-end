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
import { ChevronRightIcon } from "@radix-ui/react-icons";

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

  const handleSubmit = async (
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
      title="Sign In"
      validationSchema={validationSchema}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
    >
      <Form>
        <Input
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email Address"
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

        <Button type="submit" standardBtn={"primary"} hasIcon={true}>
          Sign In With Email <ChevronRightIcon height={24} width={24} />
        </Button>

        <p className="mt-10 text-center">
          New here?{" "}
          <Link
            className="text-primary underline underline-offset-4"
            href="/signup"
          >
            Create an Account
          </Link>
        </p>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;
