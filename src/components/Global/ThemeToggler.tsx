"use client";

import { useTheme } from "@/app/providers/themeContext";
import Button from "./Button";
import Image from "next/image";

const ThemeToggler = ({ darkHeader = false }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      standardBtn={"tertiary"}
      className="!px-2 !py-1 md:!px-[18px] md:!py-2 ml-auto !bg-transparent flex font-light capitalize md:order-last"
    >
      {isDarkMode ? (
        <>
          <Image src="/icons/Sun.svg" width={20} height={20} alt="Sun Icon" />{" "}
          <span className="md:hidden text-white pl-1">Light Mode</span>
        </>
      ) : (
        <>
          <Image
            src={darkHeader ? "/icons/Moon-White.svg" : "/icons/Moon.svg"}
            width={20}
            height={20}
            alt="Moon Icon"
          />{" "}
          <span className="md:hidden text-white pl-1">Dark Mode</span>
        </>
      )}
    </Button>
  );
};

export default ThemeToggler;
