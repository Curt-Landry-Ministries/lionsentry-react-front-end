"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { logout } from "@/lib/auth/actions";
import { isLoggedIn } from "@/lib/utils";
import Logo from "./Logo";
import { AuthedPaths, Paths, MaxWindowSize } from "@/lib/constants";
import ThemeToggler from "./ThemeToggler";
import useWindowSize from "@/lib/hooks/useWindowSize";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import Image from "next/image";
import { TriangleDownIcon } from "@radix-ui/react-icons";

const AuthedHeader = () => {
  const pathname = usePathname();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [transparentHeader, setTransparentHeader] = useState(false);

  const windowSize = useWindowSize();

  useEffect(() => {
    setTransparentHeader(
      pathname.includes("signup") ||
        pathname.includes("login") ||
        pathname.includes("questionnaire")
    );
  }, [pathname]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const check = await isLoggedIn();

      setLoggedIn(check);
    };

    checkLoggedIn();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false); // Close the dropdown
      setLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="z-50 fixed w-full bg-navy dark:bg-white dark:bg-opacity-10 text-cloud-darker">
      <div className="flex flex-wrap items-center justify-between mx-auto px-10 py-2.5 relative">
        <Link
          className={classnames({
            "mx-auto block pl-10": transparentHeader,
          })}
          href="/"
        >
          <Logo noTheme={true} />
        </Link>

        <div className="flex gap-5 items-center">
          {windowSize.width < MaxWindowSize.Mobile ? (
            <MobileMenu />
          ) : (
            <>
              <div className="flex">
                <ul className="flex text-base [&>li>a]:flex [&>li>a]:gap-2 [&>li>a]:px-4 [&>li>a]:py-2">
                  <li>
                    <Link href={AuthedPaths.Dashboard}>
                      <Image
                        src="./icons/Home.svg"
                        height={24}
                        width={24}
                        alt="Home Icon"
                      />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href={AuthedPaths.MyWhy}>
                      <Image
                        src="./icons/Sun.svg"
                        height={24}
                        width={24}
                        alt="MyWhy Icon"
                      />
                      My Why
                    </Link>
                  </li>
                  <li>
                    <Link href={AuthedPaths.Devotionals}>
                      <Image
                        src="./icons/Book.svg"
                        height={24}
                        width={24}
                        alt="Devotionals Icon"
                      />
                      Devotionals
                    </Link>
                  </li>
                  <li>
                    <Link href={AuthedPaths.Goals}>
                      <Image
                        src="./icons/Goals.svg"
                        height={24}
                        width={24}
                        alt="Goals Icon"
                      />
                      Goals
                    </Link>
                  </li>
                </ul>
                {/* Dropdown button */}
                <button
                  ref={buttonRef}
                  onClick={toggleDropdown}
                  className="flex items-center border-l-2 px-5 gap-2 text-base"
                >
                  <span className="w-5 h-5 rounded-full block bg-black"></span>
                  My Account <TriangleDownIcon />
                </button>
                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-10 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 dark:bg-black z-10"
                  >
                    <Link href="/profile">
                      <span className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                        Profile
                      </span>
                    </Link>
                    <Link href="/settings">
                      <span className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                        Settings
                      </span>
                    </Link>
                    <Link href="/">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Logout
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              <ThemeToggler />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AuthedHeader;
