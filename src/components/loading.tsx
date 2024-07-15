// src/components/loading.tsx

import React from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

interface LoadingScreenProps {
  message: string;
  size: "sm" | "md" | "lg";
  isFullScreen: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message,
  size = "sm",
  isFullScreen = false,
}) => {
  return (
    <div
      className={classNames("flex flex-col items-center justify-center", {
        "min-h-screen min-w-full": isFullScreen,
      })}
    >
      <motion.div
        className="flex space-x-4"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <motion.div
          className={classNames(
            " bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full",
            {
              "w-6 h-6": size === "sm",
              "w-8 h-8": size === "md",
              "w-12 h-12": size === "lg",
            }
          )}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={classNames(
            "bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full",
            {
              "w-6 h-6": size === "sm",
              "w-8 h-8": size === "md",
              "w-12 h-12": size === "lg",
            }
          )}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
      </motion.div>
      <p
        className={classNames("mt-14", {
          "text-lg": size === "lg",
          "text-sm": size === "sm",
        })}
      >
        {message}
      </p>
    </div>
  );
};

export default LoadingScreen;
