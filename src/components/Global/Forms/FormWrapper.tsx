"use client";
import React from "react";
import { Formik } from "formik";

interface FormWrapper {
  title?: string;
  validationSchema: Object;
  initialValues: Object;
  children: React.ReactNode;
  handleSubmit: any;
}

const FormWrapper: React.FC<FormWrapper> = ({
  title,
  validationSchema,
  initialValues,
  children,
  handleSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="w-full p-6 lg:p-8 rounded-lg shadow border sm:max-w-md bg-white dark:bg-black">
        {title ? (
          <h1 className="text-2xl gradient-text text-center mb-8">{title}</h1>
        ) : (
          ""
        )}
        {children}

      </div>
    </Formik>
  );
};

export default FormWrapper;
