import { ReactNode } from "react";
import classNames from "classnames";

const TopBottomGradient: React.FC<{
  children: ReactNode;
  className?: string;
  hasTop?: boolean;
  hasBottom?: boolean;
}> = ({ children, className, hasTop = true, hasBottom = true, ...props }) => {
  const outerClass = classNames(
    "relative w-screen h-auto bg-navy dark:bg-black text-white",
    {
      [className as string]: !!className,
    }
  );
  return (
    <div className={outerClass} {...props}>
      {hasTop ? (
        <div className="bg-gradient-1 w-full h-1/4 absolute top-0 left-0 -rotate-180 [mask-image:theme(backgroundImage.gradient-3)] dark:[mask-image:theme(backgroundImage.gradient-3-dark)] [mask-type:alpha] z-0">
          <div className="bg-gradient-4 dark:bg-gradient-4-dark [mask-type:alpha] w-full h-full -rotate-180"></div>
        </div>
      ) : (
        ""
      )}

      <div className="w-full h-auto z-10 relative">{children}</div>

      {hasBottom ? (
        <div className="bg-gradient-2 w-full h-1/4 absolute bottom-0 left-0 rotate-180 [mask-image:theme(backgroundImage.gradient-3)] dark:[mask-image:theme(backgroundImage.gradient-3-dark)] [mask-type:alpha] z-0">
          <div className="bg-gradient-4 dark:bg-gradient-4-dark [mask-type:alpha] w-full h-full"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TopBottomGradient;
