"use client";
import React, { useState } from "react";
import FormWrapper from "../Global/Forms/FormWrapper";
import { Form, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import Input from "../Global/Forms/Input";
import Button from "../Global/Button";
import Link from "next/link";
import { resetPassword } from "@/lib/auth/actions";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Paths } from "@/lib/constants";

const ResetPasswordForm = () => {
  const [errors, setErrors] = useState("");
  const [showSuccess, setShowSuccess] = useState(true);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const initialValues: FormikValues = {
    email: "",
  };

  const handleSubmit = async (values: FormikValues) => {
    const resp = await resetPassword(values.email);

    if (resp.success) {
      setShowSuccess(true);
    } else {
      setErrors(
        resp.error ||
          "Issue with reseting your password. Make sure your credentials are correct."
      );
    }
  };

  return (
    <>
      {showSuccess ? (
        <div className="flex flex-col justify-center gap-5 text-center max-w-2xl px-4">
          <h1>Password Reset Request is Sent!</h1>
          <p className="text-xl">
            Please check your email inbox for instruction to update your
            password. You can login with your new password after. You can try
            again if you do not receive it after 15 minutes.
          </p>
          <div className="gap-2 flex justify-center">
            <Link href={Paths.Login}>
              <Button standardBtn={"primary"}>Login</Button>
            </Link>
            <Button
              standardBtn={"secondary"}
              onClick={() => setShowSuccess(false)}
            >
              Try again.
            </Button>
          </div>
        </div>
      ) : (
        <FormWrapper
          title="Reset Password"
          validationSchema={validationSchema}
          initialValues={initialValues}
          handleSubmit={handleSubmit}
        >
          <Form>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
              required
            />

            {errors && <p className="text-red-500 text-xs mb-4">{errors}</p>}

            <Button
              type="submit"
              className="w-full"
              standardBtn={"primary"}
              hasIcon={true}
            >
              Reset My Password <ChevronRightIcon height={24} width={24} />
            </Button>
          </Form>
        </FormWrapper>
      )}
    </>
  );
};

export default ResetPasswordForm;
