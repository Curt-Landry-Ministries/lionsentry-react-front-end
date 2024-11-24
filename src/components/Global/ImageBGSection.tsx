import { ReactNode } from "react";
import classNames from "classnames";

export type ImageBGSectionType = {
  children: ReactNode;
  className?: string;
  opacityLevel?: number;
  imageUrl: string;
};

const ImageBGSection: React.FC<ImageBGSectionType> = ({
  children,
  className,
  opacityLevel = 70,
  imageUrl = "",
  ...props
}) => {
  const outerClass = classNames("bg-cover relative pt-16 pb-24", {
    [className as string]: !!className,
  });
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className={outerClass}
      {...props}
    >
      <div
        className={`bg-black bg-opacity-${opacityLevel} absolute inset-0 z-0`}
      ></div>
      <div className="z-10 relative flex justify-center">{children}</div>
    </div>
  );
};

export default ImageBGSection;
