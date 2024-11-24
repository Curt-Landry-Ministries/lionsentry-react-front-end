import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import classNames from "classnames";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  className?: string;
  hasIcon?: boolean;
  standardBtn?:
    | null
    | "primary"
    | "secondary"
    | "tertiary"
    | "text"
    | "gradient";
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  hasIcon,
  standardBtn = null,
  ...props
}) => {
  const btnClass = classNames(
    "transition-all text-base leading-tight uppercase px-4 md:px-5 py-2 border rounded-full disabled:border-cloud-darker disabled:bg-cloud-darker disabled:text-inactive",
    {
      "bg-primary border-primary text-white": standardBtn === "primary",
      "bg-white border-primary text-primary": standardBtn === "secondary",
      "bg-white text-primary border-primary border-2 border-opacity-25 dark:bg-transparent dark:text-white dark:border-white dark:border-opacity-25":
        standardBtn === "tertiary",
      "bg-gradient-1 text-white": standardBtn === "gradient",
      "font-semibold !px-0 border-none": standardBtn === "text",
      "w-auto flex justify-center items-center gap-1": hasIcon,
      [className as string]: !!className,
    }
  );
  return (
    <button role="button" className={btnClass} tabIndex={0} {...props}>
      {children}
    </button>
  );
};

export default Button;
