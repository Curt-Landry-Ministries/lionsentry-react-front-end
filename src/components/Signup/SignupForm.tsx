"use client";
import React, { useState } from "react";
import FormWrapper from "../Global/Forms/FormWrapper";
import { Form, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import Input from "../Global/Forms/Input";
import Button from "../Global/Button";
import Link from "next/link";
import { login, signup } from "@/lib/auth/actions";
import { saveUserDataPoint } from "@/lib/app/actions";
import { useRouter } from "next/navigation";
import { Paths } from "@/lib/constants";
import LoadingScreen from "../Global/LoadingScreen";

const SignupForm = () => {
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), ""],
      "Password must match"
    ),
    firstName: Yup.string()
      .min(1, "First name must have at least 1 character")
      .required("First Name is required"),
    lastName: Yup.string().min(1, "Last name must have at least 1 character"),
    termsAndConditions: Yup.bool().oneOf(
      [true],
      "You must agree with our terms and conditions"
    ),
  });

  const initialValues: FormikValues = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  };

  const router = useRouter();

  const handlSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    try {
      const signupResp = await signup({
        email: values.email,
        password: values.password,
      }); // create account
      console.log("Create account", signupResp);

      try {
        await login(
          { email: values.email, password: values.password },
          false
        ).then(async (resp) => {
          await saveUserDataPoint("firstName", values.firstName, "replace");

          if (values.lastName) {
            await saveUserDataPoint("lastName", values.lastName, "replace");
          }

          console.log("Name saved successfully");
          // Redirect to the questionnaire or any other appropriate page
          router.push(Paths.Questionnaire);
        });
      } catch (err: any) {
        setErrors(err.message || "Trouble logging in");
        console.error("Login error:", err);
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      console.log();
      setErrors(error.message || "Issue with sign up");
    }
  };

  return isLoading ? (
    <LoadingScreen message="Creating your account" />
  ) : (
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
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="••••••••"
          required
        />
        <Input
          label="First Name"
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          required
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          required
        />
        <Input
          options={[
            {
              label:
                "I accept the <a class='gradient-text' href='#'>Terms and Conditions</a>",
              value: "true",
            },
          ]}
          type="checkbox"
          name="termsAndConditions"
          id="termsAndConditions"
          required
        />
        {errors && <p className="text-red-500 text-xs mb-4">{errors}</p>}

        <Button type="submit" standardBtn={"primary"}>
          Create an account
        </Button>

        <p className="text-sm font-light text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg text-sm px-1 py-2 text-center dark:focus:ring-blue-800"
          >
            Login
          </Link>
        </p>
      </Form>
    </FormWrapper>
  );
};

export default SignupForm;
