import { Cross1Icon } from "@radix-ui/react-icons";
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
        "fixed top-0 left-0 h-screen w-screen flex items-center justify-center opacity-1 transform delay-200 duration-300",
        {
          "opacity-0 -z-50 hidden": !isOpen,
          "z-50": isOpen,
        }
      )}
      {...props}
    >
      <div className="bg-white dark:text-white dark:bg-black dark:border-dark-mode-strong mx-4 md:p-8 p-4 border rounded-[20px] shadow-modal z-10 relative">
        {hasCloseButton && (
          <button className="absolute right-8 top-8" onClick={onClose}>
            <Cross1Icon width={14} height={14} />
          </button>
        )}
        {children}
      </div>
      <div
        className="bg-initial-black bg-opacity-25 h-full w-full absolute top-0 left-0 -z-10"
        onClick={onClose}
      ></div>{" "}
      {/* Backdrop for modal */}
    </div>
  );
};

export default Modal;
