import { Cross1Icon } from "@radix-ui/react-icons";
import classNames from "classnames";

const AlertBanner = ({
  message,
  isOpen = false,
  onClose,
}: {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={classNames(
        "bg-ls-green-fade dark:bg-ls-green-dark dark:text-white text-[#20976A] p-5 leading-none flex justify-between rounded-lg",
        {
          hidden: !isOpen,
        }
      )}
    >
      {message}
      <Cross1Icon width={20} height={20} onClick={onClose} />
    </div>
  );
};

export default AlertBanner;
