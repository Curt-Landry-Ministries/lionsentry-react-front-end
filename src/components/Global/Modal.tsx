import classnames from "classnames";
import { DetailedHTMLProps } from "react";

export type ModalProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  isOpen: boolean;
  onClose: () => void;
  hasCloseButton?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  hasCloseButton = false,
  ...props
}) => {
  return (
    <div
      className={classnames(
        "fixed top-0 left-0 h-screen w-screen flex items-center justify-center opacity-1 transform delay-300 duration-500",
        {
          "opacity-0 -z-50": !isOpen,
          "z-50": isOpen,
        }
      )}
      {...props}
    >
      {hasCloseButton && (
        <button
          className="text-white absolute right-8 top-8 text-lg font-semibold tracking-wider hover:gradient-text transition-all duration-200"
          onClick={onClose}
        >
          CLOSE
        </button>
      )}
      <div className="bg-white dark:text-white dark:bg-black mx-4 md:p-8 p-4 border rounded-md z-10">
        {children}
      </div>
      <div
        className="bg-black bg-opacity-70 h-full w-full absolute top-0 left-0 -z-10"
        onClick={onClose}
      ></div>{" "}
      {/* Backdrop for modal */}
    </div>
  );
};

export default Modal;
