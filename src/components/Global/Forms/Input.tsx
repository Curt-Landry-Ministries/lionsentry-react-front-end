import React from "react";
import { FieldConfig, useField } from "formik";
import classNames from "classnames";

interface IFieldProps {
  label?: string;
  options?: { value: string; label: string }[];
}
const Input: React.FC<
  IFieldProps & FieldConfig<string> & JSX.IntrinsicElements["input"]
> = ({ label, options = [], ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-6">
      {props.type === "checkbox" && options.length > 0 ? (
        options.map((option) => (
          <label className="sm:text-sm rounded-lg block w-full">
            <input
              {...field}
              {...props}
              className={classNames("mr-3", {
                "border-red-500": meta.touched && meta.error,
              })}
              value={option.value}
            />
            <span dangerouslySetInnerHTML={{ __html: option.label }} />
          </label>
        ))
      ) : (
        <>
          <label
            htmlFor={props.id || props.name}
            className="block mb-2 text-sm font-medium"
          >
            {label}
          </label>
          <input
            {...field}
            {...props}
            className={classNames(
              "border sm:text-sm rounded-lg block w-full p-2.5 -inter",
              {
                "border-red-500": meta.touched && meta.error,
              }
            )}
          />
        </>
      )}

      {meta.touched && meta.error ? (
        <div className="text-xs text-red-500 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
