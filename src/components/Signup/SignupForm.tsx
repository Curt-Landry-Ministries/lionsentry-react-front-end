"use client";
import React, { useRef, useState } from "react";
import FormWrapper from "../Global/Forms/FormWrapper";
import {
  Form,
  FormikHelpers,
  FormikProvider,
  FormikValues,
  useFormik,
} from "formik";
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
import DisclamerModal from "./DisclamerModal";

const SignupForm = () => {
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDisclamer, setOpenDisclamer] = useState(false);

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
    setOpenDisclamer(false);
    setIsLoading(true);

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

        await saveUserDataPoint("ai_disclaimer_agreement", "1.0", "replace");

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
        localStorage.removeItem("completedOnboardingGoal");
        // Redirect to the questionnaire or any other appropriate page
        router.push(AuthedPaths.Questionnaire);
      } else {
        setIsLoading(false);
        setErrors(loginResp.error || "Trouble logging in");
      }
    } else {
      setIsLoading(false);
      setErrors(signupResp.error || "Issue with sign up");
    }
  };

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: handleSubmit,
  });

  return isLoading ? (
    <LoadingScreen message="Creating your account" isFullScreen={true} />
  ) : (
    <>
      <FormikProvider value={formik}>
        <div className="w-full p-6 lg:p-8 sm:max-w-md">
          <h1 className="mb-8">Sign Up</h1>
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
            <Button
              className="w-full"
              standardBtn={"primary"}
              onClick={() => setOpenDisclamer(true)}
              disabled={!formik.dirty || !formik.isValid}
              type="button"
            >
              Create an account
            </Button>
          </Form>
        </div>
      </FormikProvider>
      <DisclamerModal
        isOpen={openDisclamer}
        onConfirm={() => formik.handleSubmit()}
        isLoading={isLoading}
        onClose={() => {
          setOpenDisclamer(false);
        }}
      />
    </>
  );
};

export default SignupForm;
