import Image from "next/image";
import classNames from "classnames";

const Heart = ({
  isActive = false,
  className,
}: {
  isActive?: boolean;
  className?: string;
}) => {
  return (
    <div className={classNames("heart-icon", className)}>
      {isActive ? (
        <Image
          src="/icons/Heart-Filled.svg"
          width={24}
          height={24}
          alt="Heart Icon Filled"
        />
      ) : (
        <Image src="/icons/Heart.svg" width={24} height={24} alt="Heart Icon" />
      )}
    </div>
  );
};

export default Heart;
