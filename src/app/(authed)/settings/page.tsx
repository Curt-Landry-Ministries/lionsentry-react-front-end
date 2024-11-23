"use client";

import ImageCropProvider from "@/app/providers/imageCropContext";
import { useUserStore } from "@/app/providers/userContext";
import Button from "@/components/Global/Button";
import Input from "@/components/Global/Forms/Input";
import ProfileModal from "@/components/Global/ProfileModal";
import { fetchBasicData, saveUserDataPoint } from "@/lib/app/actions";
import { deleteUser } from "@/lib/auth/actions";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

const Settings = () => {
  const { firstName, lastName, email, fetchBasicData } = useUserStore((s) => s);

  const [openProfile, setOpenProfile] = useState(false);

  const formikRef = useRef<FormikProps<Record<string, unknown>>>(null);

  const validationSchema = Yup.object({
    first_name: Yup.string(),
    last_name: Yup.string(),
    email: Yup.string().matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  });

  const deleteValidationSchema = Yup.object({
    delete_confirm: Yup.string()
      .oneOf(
        ["Delete my account"],
        'You must type "Delete my account" to confirm'
      )
      .required(),
  });

  let initialValues: FormikValues = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  useEffect(() => {
    initialValues = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
  }, [firstName, lastName, email]);

  const handleSubmit = async (values: FormikValues, actions: any) => {
    actions.resetForm();

    for (const [key, value] of Object.entries(values)) {
      await saveUserDataPoint(key, value, "replace");
    }

    await fetchBasicData();
  };

  return (
    <ImageCropProvider>
      <div className="bg-white dark:bg-black mx-4 flex flex-col gap-8">
        <div className="content-box flex flex-col gap-8 justify-start items-start">
          <h1 className="md:w-full">Settings</h1>

          <Button
            standardBtn={"secondary"}
            onClick={() => setOpenProfile(true)}
          >
            Update Profile Photo
          </Button>

          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnChange
            validateOnMount
            innerRef={formikRef}
            enableReinitialize
          >
            {({ isValid, isSubmitting }) => (
              <Form className="w-full max-w-xl">
                <div className="w-full">
                  <h3 className="md:mb-2">Account information</h3>
                  <Input
                    label="First Name"
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder=""
                    className="rounded"
                  />

                  <Input
                    label="Last Name"
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder=""
                    className="rounded"
                  />

                  <Input
                    label="Email"
                    type="text"
                    name="email"
                    id="email"
                    placeholder=""
                    className="rounded"
                  />

                  <Button
                    type="submit"
                    className="w-1/2 whitespace-nowrap"
                    standardBtn={"primary"}
                    disabled={!isValid || isSubmitting}
                  >
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="border-t-2 pt-8 mt-4">
            <h3>Delete account</h3>
            <p className="mb-4">
              Deleting your account will remove all of your information from our
              database. This action can not be reversed. Type "Delete my
              account" to confirm
            </p>
            <Formik
              validationSchema={deleteValidationSchema}
              initialValues={{
                delete_confirm: "",
              }}
              onSubmit={async () => await deleteUser()}
              validateOnChange
              validateOnMount
            >
              {({ isValid, isSubmitting }) => (
                <Form>
                  <Input
                    type="text"
                    id="delete_confirm"
                    name="delete_confirm"
                    placeholder={'Type "Delete my account"  to confirm'}
                  />
                  <Button
                    standardBtn={"text"}
                    className="text-red-500 mb-5 !px-4"
                    disabled={!isValid || isSubmitting}
                  >
                    Delete my account
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ProfileModal isOpen={openProfile} updateOpen={setOpenProfile} />
    </ImageCropProvider>
  );
};

export default Settings;
