import React from "react";
import { FieldConfig, useField } from "formik";
import classNames from "classnames";

const Textarea: React.FC<
  IFieldProps & FieldConfig<string> & JSX.IntrinsicElements["textarea"]
> = ({
  label,
  description,
  options = [],
  className = "rounded-3xl",
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-5">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block mb-2 text-left font-medium"
        >
          {label}
        </label>
      )}

      {description && (
        <div
          className="text-left mb-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}

      <textarea
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

      {meta.touched && meta.error ? (
        <div className="text-xs text-red-500 mt-1 text-left">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Textarea;
