"use client";
import React, { useState } from "react";
import FormWrapper from "../Global/Forms/FormWrapper";
import { Form, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import Input from "../Global/Forms/Input";
import Button from "../Global/Button";
import Link from "next/link";
import { login, signup, createKeapUser } from "@/lib/auth/actions";
import { saveUserDataPoint } from "@/lib/app/actions";
import { useRouter } from "next/navigation";
import { AuthedPaths, Paths } from "@/lib/constants";
import LoadingScreen from "../Global/LoadingScreen";
import { useUserStore } from "@/app/providers/userContext";
import { logTest } from "@/lib/utils";

const SignupForm = () => {
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { fetchBasicData } = useUserStore((s) => s);

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

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    const signupResp = await signup({
      email: values.email,
      password: values.password,
    }); // create account

    if (signupResp.success) {
      const loginResp = await login({
        email: values.email,
        password: values.password,
      });

      if (loginResp.success) {
        await saveUserDataPoint("firstName", values.firstName, "replace");

        const lastName = values.lastName ? values.lastName : "";

        if (values.lastName)
          await saveUserDataPoint("lastName", lastName, "replace");

        if (process.env.NEXT_PUBLIC_LOCAL_TESTING !== "true") {
          const keapCreation = await createKeapUser(
            values.email,
            values.firstName,
            lastName
          );

          if (keapCreation.success) logTest(keapCreation.value);
          else logTest(keapCreation.error);
        }

        logTest("Name saved successfully");

        await fetchBasicData();

        localStorage.setItem("showWelcomeModal", "false");
        // Redirect to the questionnaire or any other appropriate page
        router.push(AuthedPaths.Questionnaire);
      } else {
        setErrors(loginResp.error || "Trouble logging in");
      }
    } else {
      setErrors(signupResp.error || "Issue with sign up");
    }
  };

  return isLoading ? (
    <LoadingScreen message="Creating your account" />
  ) : (
    <FormWrapper
      title="Sign Up"
      validationSchema={validationSchema}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
    >
      <p className="mb-5">
        Already have an account?{" "}
        <Link className="link-style" href="/login">
          Sign In
        </Link>
      </p>
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
          placeholder="Password"
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
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
              label: `I accept the <a class='gradient-text' href='${Paths.Terms}' target="_blank">Terms and Conditions</a>`,
              value: "true",
            },
          ]}
          type="checkbox"
          name="termsAndConditions"
          id="termsAndConditions"
          required
        />

        {errors && <p className="text-red-500 text-xs mb-4">{errors}</p>}

        <Button type="submit" className="w-full" standardBtn={"primary"}>
          Create an account
        </Button>
      </Form>
    </FormWrapper>
  );
};

export default SignupForm;
