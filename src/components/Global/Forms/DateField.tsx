import React from "react";
import { FieldConfig, useField, useFormikContext } from "formik";
import classNames from "classnames";
import DateInput from "../DateInput";

const DateField: React.FC<IFieldProps & FieldConfig<string> & any> = ({
  label,
  options = [],
  className = "rounded",
  ...props
}) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <div className="h-full mb-6 flex flex-col flex-1 w-full">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block mb-2 text-left font-medium"
        >
          {label}
        </label>
      )}

      <DateInput
        {...field}
        {...props}
        autoComplete="off"
        selected={
          (field.value && new Date(field.value).toLocaleDateString()) || null
        }
        onChange={(val: Date) => {
          setFieldValue(field.name, val);
        }}
        className={classNames(
          "border border-cloud-darker bg-white dark:bg-dark-mode-subtle dark:border-dark-mode-strong block w-full ml-0",
          {
            "border-red-500": meta.touched && meta.error,
            [className]: !!className,
          }
        )}
      />

      {meta.touched && meta.error ? (
        <div className="text-xs text-red-500 mt-1 text-left">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DateField;
