"use client";
import React from "react";
import { Formik } from "formik";

interface FormWrapper {
  title?: string;
  validationSchema: Object;
  initialValues: Object;
  children: React.ReactNode;
  handleSubmit: any;
  className?: string;
}

const FormWrapper: React.FC<FormWrapper> = ({
  title,
  validationSchema,
  initialValues,
  children,
  handleSubmit,
  className = "w-full p-6 lg:p-8 sm:max-w-md",
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className={className}>
        {title ? <h1 className="mb-8">{title}</h1> : ""}
        {children}
      </div>
    </Formik>
  );
};

export default FormWrapper;
