import React from "react";
import { FieldConfig, useField } from "formik";
import classNames from "classnames";

const Select: React.FC<
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
          "border border-cloud-darker bg-white dark:bg-dark-mode-subtle dark:border-dark-mode-strong sm:text-sm rounded-3xl block w-full p-2.5 bg-transparent appearance-none pr-8 bg-no-repeat bg-[size:0.7rem] bg-[right_1rem_center] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAYAAAAMJL+VAAAABGdBTUEAALGPC/xhBQAAAQtJREFUOBG1lEEOgjAQRalbGj2OG9caOACn4ALGtfEuHACiazceR1PWOH/CNA3aMiTaBDpt/7zPdBKy7M/DCL9pGkvxxVp7KsvyJftL5rZt1865M+Ucq6pyyF3hNcI7Cuu+728QYn/JQA5yKaempxuZmQngOwEaYx55nu+1lQh8GIatMGi+01NwBcEmhxBqK4nAPZJ78K0KKFAJmR3oPp8+Iwgob0Oa6+TLoeCvRx+mTUYf/FVBGTPRwDkfLxnaSrRwcH0FWhNOmrkWYbE2XEicqgSa1J0LQ+aPCuQgZiLnwewbGuz5MGoAhcIkCQcjaTBjMgtXGURMVHC1wcQEy0J+Zlj8bKAnY1/UzDe2dbAVqfXn6wAAAABJRU5ErkJggg==')]",
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

export default Select;
