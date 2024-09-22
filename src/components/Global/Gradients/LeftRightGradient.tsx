import { ReactNode } from "react";
import classNames from "classnames";

const LeftRightGradient: React.FC<{
  children: ReactNode;
  className?: string;
  hasLeft?: boolean;
  hasRight?: boolean;
}> = ({ children, className, hasLeft = true, hasRight = true, ...props }) => {
  const outerClass = classNames(
    "relative w-screen bg-navy dark:bg-black overflow-hidden text-white",
    {
      [className as string]: !!className,
    }
  );
  return (
    <div className={outerClass} {...props}>
      {hasLeft ? (
        <div className="bg-gradient-1 w-[100vh] md:w-full h-1/6 md:h-1/4 -rotate-90 absolute bottom-1/4 -left-[50vh] md:-left-1/2 [mask-image:theme(backgroundImage.gradient-3)] dark:[mask-image:theme(backgroundImage.gradient-3-dark)] [mask-type:alpha] z-0 border-none">
          <div className="bg-gradient-4 dark:bg-gradient-4-dark [mask-type:alpha] w-full h-full"></div>
        </div>
      ) : (
        ""
      )}

      <div className="h-auto flex justify-center items-center z-10 relative">
        {children}
      </div>

      {hasRight ? (
        <div className="bg-gradient-1 w-[100vh] md:w-full h-1/6 md:h-1/4 rotate-90 absolute top-1/4 -right-[50vh] md:-right-1/2 [mask-image:theme(backgroundImage.gradient-3)] dark:[mask-image:theme(backgroundImage.gradient-3-dark)] [mask-type:alpha] z-0 border-none">
          <div className="bg-gradient-4 dark:bg-gradient-4-dark [mask-type:alpha] w-full h-full"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LeftRightGradient;
