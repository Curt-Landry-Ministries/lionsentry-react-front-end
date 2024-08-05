"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { logout } from "@/lib/auth/actions";
import { isLoggedIn } from "@/lib/utils";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkLoggedIn = async () => setLoggedIn(isLoggedIn());

    checkLoggedIn();
  }, []);

  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);

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
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-black">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <span className="leading-tight tracking-tight md:text-2xl gradient-text">
            Lionsentry
          </span>
        </Link>

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
          <Link href="/login">
            <button type="button" className="main-btn">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
