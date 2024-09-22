"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { logout } from "@/lib/auth/actions";
import { isLoggedIn } from "@/lib/utils";
import Logo from "./Logo";
import { MaxWindowSize, Paths } from "@/lib/constants";
import Button from "./Button";
import ThemeToggler from "./ThemeToggler";
import useWindowSize from "@/lib/hooks/useWindowSize";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const Header = () => {
  const pathname = usePathname();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [transparentHeader, setTransparentHeader] = useState(false);

  const windowSize = useWindowSize();

  useEffect(() => {
    setTransparentHeader(
      pathname.includes("signup") || pathname.includes("login")
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
    <nav
      className={classnames("z-50 fixed w-full", {
        "bg-white dark:bg-black": !transparentHeader,
        "bg-transparent": transparentHeader,
      })}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-10 py-2.5 relative">
        <Link
          className={classnames({
            "mx-auto": transparentHeader,
          })}
          href="/"
        >
          <Logo noTheme={transparentHeader} />
        </Link>

        <div className="flex gap-5">
          {windowSize.width < MaxWindowSize.Mobile ? (
            <MobileMenu />
          ) : (
            <>
              {" "}
              {loggedIn ? (
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
                  {/* Dropdown button */}
                  <button
                    ref={buttonRef}
                    onClick={toggleDropdown}
                    className="text-white bg-black border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 md:px-8 sm:px-4 py-2 text-center mr-4"
                  >
                    Menu
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
              ) : (
                <>
                  {!transparentHeader ? (
                    <>
                      <Link href={Paths.Signup}>
                        <Button standardBtn={"primary"}>Sign Up</Button>
                      </Link>
                      <Link href={Paths.Login}>
                        <Button standardBtn={"secondary"}>Sign In</Button>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}
              <ThemeToggler />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
