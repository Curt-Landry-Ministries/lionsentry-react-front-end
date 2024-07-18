// src/components/footer.tsx
"use client";

import { CodeIcon } from "@radix-ui/react-icons";
import ThemeToggler from "./Global/ThemeToggler";

const Footer = () => {
  return (
    <footer className="px-4 py-6">
      <div className="max-w-screen-xl flex items-center justify-center mx-auto">
        <CodeIcon className="mr-2 h-6" />
        <p className="text-sm leading-tight tracking-tight md:text-md text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg px-4 py-2 text-center dark:focus:ring-blue-800">
          &copy; 2024 LionSentry. All rights reserved.
        </p>
        <ThemeToggler />
      </div>
    </footer>
  );
};

export default Footer;
