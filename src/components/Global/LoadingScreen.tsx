// src/components/loading.tsx

import React from "react";
import classNames from "classnames";
import Image from "next/image";

interface LoadingScreenProps {
  message: string;
  size?: "sm" | "md" | "lg";
  isFullScreen?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message,
  size = "md",
  isFullScreen = false,
}) => {
  return (
    <div
      className={classNames("flex justify-center", {
        "min-h-screen min-w-full": isFullScreen,
      })}
    >
      <div className="max-w-xl flex flex-col items-center justify-between">
        <div className="h-[90px] w-[190px]">
          <Image
            src={"/images/infinite-gradient.svg"}
            width={190}
            height={92}
            alt="Infinite Loading"
          />
          <div className="w-[90px] h-[90px] animate-loading2">
            <div className="min-w-full min-h-full max-w-full max-h-full block float-left relative -top-full left-0 animate-loading1">
              <div className="h-[10px] w-[10px] bg-white dark:bg-black rounded-full relative top-[40px] left-[5px]"></div>
            </div>
          </div>

          <div className="w-[90px] h-[90px] left-[100px] -top-[90px] animate-loading4 relative">
            <div className="min-w-full min-h-full max-w-full max-h-full block float-left relative -top-[90px] -left-[1px] animate-loading3">
              <div className="h-[10px] w-[10px] bg-white dark:bg-black rounded-full relative top-[40px] left-[5px]"></div>
            </div>
          </div>
        </div>

        <h1
          className={classNames("text-center mt-12", {
            "text-2xl": size === "sm",
          })}
        >
          {message}
        </h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
