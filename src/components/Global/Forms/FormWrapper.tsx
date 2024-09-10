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
      <div className="w-full p-6 lg:p-8 sm:max-w-md">
        {title ? <h1 className="mb-2">{title}</h1> : ""}
        {children}
      </div>
    </Formik>
  );
};

export default FormWrapper;
