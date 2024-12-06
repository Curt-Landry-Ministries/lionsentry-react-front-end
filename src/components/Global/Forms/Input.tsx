import React, { useState } from "react";
import { FieldConfig, useField } from "formik";
import classNames from "classnames";
import Image from "next/image";

const Input: React.FC<
  IFieldProps & FieldConfig<string> & JSX.IntrinsicElements["input"]
> = ({ label, options = [], className = "rounded-3xl", ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-5">
      {options.length > 0 ? (
        options.map((option) =>
          props.type === "checkbox" ? (
            <label
              className="sm:text-sm rounded-lg block w-full"
              key={option.value}
            >
              <input
                {...field}
                {...props}
                className={classNames(
                  "mr-3 bg-white dark:bg-dark-mode-subtle",
                  {
                    "border-red-500": meta.touched && meta.error,
                  }
                )}
                value={option.value}
              />
              <span dangerouslySetInnerHTML={{ __html: option.label }} />
            </label>
          ) : (
            <>
              <input
                {...field}
                {...props}
                id={option.value}
                value={option.label}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </>
          )
        )
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
          <div className="relative">
            <input
              {...field}
              {...props}
              type={showPassword ? "text" : props.type}
              className={classNames(
                "border border-cloud-darker bg-white dark:bg-dark-mode-subtle dark:border-dark-mode-strong block w-full py-2 px-5",
                {
                  "border-red-500": meta.touched && meta.error,
                  [className]: !!className,
                }
              )}
            />

            {props.type === "password" && (
              <Image
                src="./icons/Eye.svg"
                alt="Eye Icon"
                width={20}
                height={20}
                className="absolute right-4 top-1/4"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </>
      )}

      {meta.touched && meta.error ? (
        <div className="text-xs text-red-500 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
