"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/app/providers/themeContext";
import Button from "./Button";

const ThemeToggler = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      standardBtn={"tertiary"}
      className="!px-2 !py-1 md:!px-[18px] md:!py-2 ml-auto !bg-transparent flex font-light capitalize"
    >
      {isDarkMode ? (
        <>
          <SunIcon className="h-5 w-5" />{" "}
          <span className="md:hidden text-white pl-1">Light Mode</span>
        </>
      ) : (
        <>
          <MoonIcon className="h-5 w-5" />{" "}
          <span className="md:hidden text-white pl-1">Dark Mode</span>
        </>
      )}
    </Button>
  );
};

export default ThemeToggler;
