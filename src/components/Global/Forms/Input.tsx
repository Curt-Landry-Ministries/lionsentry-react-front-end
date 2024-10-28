import React from "react";
import { FieldConfig, useField } from "formik";
import classNames from "classnames";

interface IFieldProps {
  label?: string;
  options?: { value: string; label: string }[];
  className?: string;
}
const Input: React.FC<
  IFieldProps & FieldConfig<string> & JSX.IntrinsicElements["input"]
> = ({ label, options = [], className = "rounded-3xl", ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-6">
      {props.type === "checkbox" && options.length > 0 ? (
        options.map((option) => (
          <label
            className="sm:text-sm rounded-lg block w-full"
            key={option.value}
          >
            <input
              {...field}
              {...props}
              className={classNames("mr-3 bg-white dark:bg-dark-mode-subtle", {
                "border-red-500": meta.touched && meta.error,
              })}
              value={option.value}
            />
            <span dangerouslySetInnerHTML={{ __html: option.label }} />
          </label>
        ))
      ) : (
        <>
          {label && (
            <label
              htmlFor={props.id || props.name}
              className="block mb-2 text-left font-medium"
            >
              {label}
            </label>
          )}

          <input
            {...field}
            {...props}
            className={classNames(
              "border border-cloud-darker bg-white dark:bg-dark-mode-subtle dark:border-dark-mode-strong block w-full py-2 px-5",
              {
                "border-red-500": meta.touched && meta.error,
                [className]: !!className,
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
