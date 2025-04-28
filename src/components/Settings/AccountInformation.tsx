import ImageCropProvider from "@/app/providers/imageCropContext";
import Button from "../Global/Button";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import Input from "../Global/Forms/Input";
import ProfileModal from "../Global/ProfileModal";
import { useEffect, useRef, useState } from "react";
import { saveUserDataPoint } from "@/lib/app/actions";
import { deleteUser, logout } from "@/lib/auth/actions";
import * as Yup from "yup";
import { useUserStore } from "@/app/providers/userContext";
import classNames from "classnames";
import Select from "../Global/Forms/Select";

const AccountInformation = () => {
  const { firstName, lastName, email, timeZone, fetchBasicData } = useUserStore(
    (s) => s
  );

  const [openProfile, setOpenProfile] = useState(false);

  const formikRef = useRef<FormikProps<Record<string, unknown>>>(null);

  const validationSchema = Yup.object({
    first_name: Yup.string(),
    last_name: Yup.string(),
    email: Yup.string().matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
    timeZone: Yup.string(),
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
    timeZone: timeZone,
  };

  useEffect(() => {
    initialValues = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      timeZone: timeZone,
    };
  }, [firstName, lastName, email, timeZone]);

  const handleSubmit = async (values: FormikValues, actions: any) => {
    actions.resetForm();

    for (const [key, value] of Object.entries(values)) {
      await saveUserDataPoint(key, value, "replace");
    }

    await fetchBasicData();
  };

  const handleDeleteUser = async () => {
    const resp = await deleteUser();

    if (resp.success) logout();
  };

  return (
    <ImageCropProvider>
      <div className="flex flex-col gap-5 justify-start items-start">
        <h3 className="mb-0">Account information</h3>
        <Button standardBtn={"secondary"} onClick={() => setOpenProfile(true)}>
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

                <Select
                  name="timeZone"
                  label="Your Timezone"
                  options={Intl.supportedValuesOf("timeZone").map((tz) => ({
                    value: tz,
                    label: tz,
                  }))}
                  defaultOptionLabel="Select your timezone"
                  className="!rounded"
                />

                <Button
                  type="submit"
                  className="w-1/2 whitespace-nowrap"
                  standardBtn={"primary"}
                  disabled={!isValid || isSubmitting}
                >
                  Update Information
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="border-t-2 pt-8 mt-4">
          <h3>Delete account</h3>
          <p className="mb-4">
            Deleting your account will remove all of your information from our
            database. This action can not be reversed. Type &quot;Delete my
            account&quot; to confirm
          </p>
          <Formik
            validationSchema={deleteValidationSchema}
            initialValues={{
              delete_confirm: "",
            }}
            onSubmit={handleDeleteUser}
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
                  className="rounded"
                />
                <Button
                  standardBtn={"text"}
                  className={classNames("text-red-500 mb-5 !px-4", {
                    "bg-red-500 text-white": isValid,
                  })}
                  disabled={!isValid || isSubmitting}
                >
                  Delete my account
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ProfileModal isOpen={openProfile} updateOpen={setOpenProfile} />
    </ImageCropProvider>
  );
};

export default AccountInformation;
