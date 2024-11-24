import React from "react";
import { FieldConfig, useField } from "formik";
import classNames from "classnames";

const Input: React.FC<
  ISelectFieldProps & FieldConfig<string> & JSX.IntrinsicElements["select"]
> = ({ label, options, defaultOptionLabel = "Select...", ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-5">
      <label htmlFor={props.id || props.name}>{label}</label>
      <select
        {...field}
        {...props}
        className={classNames(
          "border sm:text-sm rounded-lg block w-full p-2.5",
          {
            "border-red-500": meta.touched && meta.error,
          }
        )}
      >
        <option value="">{defaultOptionLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-xs text-red-500 mt-2">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
