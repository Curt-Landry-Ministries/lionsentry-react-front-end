import { CodeIcon } from "@radix-ui/react-icons";
//import { MoonIcon } from "@radix-ui/react-icons";

export const Footer = () => {
  return (
    <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <footer className="px-4 py-6 w-full">
        <div className="container flex items-center justify-start p-0">
          <CodeIcon className="mr-2 h-6 w-6" />
          <p className="text-sm">
            &copy; 2024 LionSentry. All rights reserved.
          </p>
        </div>
      </footer>
            {/*<div className="fixed bottom-4 right-4">
                <MoonIcon className="h-6 w-6" /> TODO: Fix footer layout for dark/light mode toggle
            </div>*/}
    </div>
  );
};

export default Footer;
