import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import classNames from "classnames";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  className?: string;
  standardBtn?: null | "primary" | "secondary" | "tertiary";
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  standardBtn = null,
  ...props
}) => {
  const btnClass = classNames("transition-all", {
    "main-btn": standardBtn === "primary",
    [className as string]: !!className,
  });
  return (
    <button role="button" className={btnClass} tabIndex={0} {...props}>
      {children}
    </button>
  );
};

export default Button;
