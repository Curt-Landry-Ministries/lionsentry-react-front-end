import classnames from "classnames";
import { DetailedHTMLProps } from "react";

export type ModalProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  ...props
}) => {
  return (
    <div
      className={classnames(
        "fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-70 flex items-center justify-center",
        {
          hidden: !isOpen,
        }
      )}
      {...props}
    >
      <button
        className="text-white absolute right-8 top-8 text-lg font-semibold tracking-wider hover:gradient-text transition-all duration-200"
        onClick={onClose}
      >
        CLOSE
      </button>
      <div className="bg-white h-[80%] md:max-w-[80%] max-w-[90%] max-h-[80%] md:p-8 p-4 border rounded-md">
        {children}
      </div>
    </div>
  );
};

export default Modal;
