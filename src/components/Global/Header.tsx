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

  return (
    <nav
      className={classnames("z-50 w-full", {
        "bg-white dark:bg-black fixed": !transparentHeader,
        "bg-transparent absolute": transparentHeader,
      })}
    >
      <div className="flex flex-wrap items-center justify-between mx-auto px-10 py-2.5 relative">
        <Link
          className={classnames({
            "mx-auto block pl-10": transparentHeader,
          })}
          href="/"
        >
          <Logo
            noTheme={transparentHeader && !pathname.includes("questionnaire")}
          />
        </Link>

        <div className="flex gap-5">
          {windowSize.width < MaxWindowSize.Mobile ? (
            <MobileMenu />
          ) : (
            <>
              {!transparentHeader && !loggedIn ? (
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
              <ThemeToggler />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
