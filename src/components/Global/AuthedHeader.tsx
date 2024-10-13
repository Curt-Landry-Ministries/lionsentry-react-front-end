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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [transparentHeader, setTransparentHeader] = useState(false);

  const windowSize = useWindowSize();

  const menuItems: { [key: string]: { iconLink: string; title: string } } = {
    Dashboard: {
      iconLink: "./icons/Home.svg",
      title: "Home",
    },
    MyWhy: {
      iconLink: "/icons/Sun.svg",
      title: "My Why",
    },
    Devotionals: {
      iconLink: "/icons/Book.svg",
      title: "Devotionals",
    },
    Goals: {
      iconLink: "/icons/Goals.svg",
      title: "Goals",
    },
  };

  useEffect(() => {
    setTransparentHeader(
      pathname.includes("signup") ||
        pathname.includes("login") ||
        pathname.includes("questionnaire")
    );
  }, [pathname]);

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
    <nav className="z-50 fixed w-full bg-navy dark:bg-white dark:bg-opacity-10 text-cloud-darker">
      <div className="flex flex-wrap items-center justify-between mx-auto px-10 relative">
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
                <ul
                  className={classnames(
                    "flex text-base [&>li>a]:flex [&>li>a]:gap-2 [&>li>a]:px-4 [&>li>a]:py-6 hover:[&>li]:bg-white hover:[&>li]:bg-opacity-10"
                  )}
                >
                  {Object.keys(menuItems).map((key) => (
                    <li
                      className={classnames({
                        "bg-white bg-opacity-10":
                          AuthedPaths[key as keyof typeof AuthedPaths] ===
                          pathname,
                      })}
                    >
                      <Link href={AuthedPaths[key as keyof typeof AuthedPaths]}>
                        <Image
                          src={menuItems[key].iconLink}
                          height={24}
                          width={24}
                          alt={`${menuItems[key].title} Icon`}
                        />
                        {menuItems[key].title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* Dropdown button */}
                <button
                  ref={buttonRef}
                  onClick={toggleDropdown}
                  className="flex items-center px-5 gap-2 text-base relative before:content-[' '] before:absolute before:left-0 before:w-[2px] before:h-[44px] before:bg-cloud-darker"
                >
                  <span className="w-5 h-5 rounded-full block bg-black"></span>
                  My Account <TriangleDownIcon />
                  {/* Dropdown menu */}
                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute left-0 -bottom-[120%] w-40 bg-white rounded shadow-lg py-1 [&>*]:block [&>*]:px-3 [&>*]:py-2 text-black text-left hover:[&>*]:bg-primary hover:[&>*]:bg-opacity-10"
                    >
                      <span className="">Profile Picture</span>

                      <Link href="/">
                        <button onClick={handleLogout} className="">
                          Sign Out
                        </button>
                      </Link>
                    </div>
                  )}
                </button>
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
