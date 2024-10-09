import { ReactNode } from "react";
import classNames from "classnames";

const CenterGradient: React.FC<{
  children: ReactNode;
  className?: string;
  hasLeft?: boolean;
  hasRight?: boolean;
}> = ({ children, className, hasLeft = true, hasRight = true, ...props }) => {
  const outerClass = classNames(
    "relative w-screen bg-white dark:bg-black overflow-hidden text-white",
    {
      [className as string]: !!className,
    }
  );
  return (
    <div className={outerClass} {...props}>
      <div className="bg-gradient-1 w-full h-full absolute top-0 left-0" />

      <div className="bg-gradient-to-l from-transparent to-white dark:to-black w-1/4 h-full absolute left-0 top-0" />

      <div className="h-full flex justify-center items-center z-10 relative">
        {children}
      </div>

      <div className="bg-gradient-to-b from-white dark:from-black via-[percentage:41%_70%] via-white/50 dark:via-black/50 to-white dark:to-black w-full h-full absolute top-0 left-0" />

      <div className="bg-gradient-to-r from-transparent to-white dark:to-black w-1/4 h-full absolute right-0 top-0" />
    </div>
  );
};

export default CenterGradient;
