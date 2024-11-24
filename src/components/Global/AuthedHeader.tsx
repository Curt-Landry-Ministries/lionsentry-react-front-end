"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import { AuthedPaths, MaxWindowSize } from "@/lib/constants";
import ThemeToggler from "./ThemeToggler";
import useWindowSize from "@/lib/hooks/useWindowSize";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import Image from "next/image";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useUserStore } from "@/app/providers/userContext";
import ProfileModal from "./ProfileModal";
import ImageCropProvider from "@/app/providers/imageCropContext";
import SignoutModal from "./SignoutModal";

const AuthedHeader = () => {
  const pathname = usePathname();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [transparentHeader, setTransparentHeader] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openSignout, setOpenSignout] = useState(false);

  const { profile_photo, name } = useUserStore((s) => s);

  const windowSize = useWindowSize();

  const menuItems: { [key: string]: { iconLink: string; title: string } } = {
    Dashboard: {
      iconLink: "/icons/Home.svg",
      title: "Home",
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

  return (
    <ImageCropProvider>
      <nav className="z-50 fixed w-full bg-navy dark:bg-dark-mode-subtle  text-cloud-darker shadow-modal">
        <div className="flex flex-wrap items-center justify-between mx-auto px-4 md:px-10 py-3 lg:py-0 relative">
          <Link
            className={classnames({
              "mx-auto block pl-10": transparentHeader,
            })}
            href={AuthedPaths.Dashboard}
          >
            <Logo color={"white"} />
          </Link>

          <div className="flex gap-5 items-center">
            <div className="flex items-center">
              {windowSize.width < MaxWindowSize.Desktop ? (
                <MobileMenu darkHeader={true} />
              ) : (
                <>
                  <ul
                    className={classnames(
                      "flex text-base [&>li>a]:flex [&>li>a]:gap-2 [&>li>a]:font-semibold [&>li>a]:px-4 [&>li>a]:py-6 hover:[&>li]:bg-white hover:[&>li]:bg-opacity-10 pr-5"
                    )}
                  >
                    {Object.keys(menuItems).map((key) => (
                      <li
                        className={classnames({
                          "bg-white bg-opacity-10":
                            AuthedPaths[key as keyof typeof AuthedPaths] ===
                            pathname,
                        })}
                        key={`${key}-link`}
                      >
                        <Link
                          href={AuthedPaths[key as keyof typeof AuthedPaths]}
                        >
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
                  <ThemeToggler darkHeader={true} />
                </>
              )}

              {/* Dropdown button */}
              <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className="flex items-center px-5 gap-2 text-base relative before:hidden lg:before:block before:content-[' '] before:absolute before:left-0 before:w-[2px] before:h-[44px] before:bg-cloud-darker before:bg-opacity-20"
              >
                <div className="w-8 h-8 flex-shrink-0 relative flex rounded-full overflow-hidden bg-dark-mode-subtle dark:bg-cloud">
                  <Image
                    src={profile_photo ? profile_photo : "/icons/User.svg"}
                    fill
                    alt={`${name} Profile Photo`}
                    style={{
                      objectFit: "cover",
                      borderRadius: "100px",
                    }}
                  />
                </div>

                <div className="hidden lg:flex lg:items-center gap-1">
                  My Account <TriangleDownIcon />
                </div>
                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute -left-full -bottom-[180%] md:left-0 w-40 bg-white rounded shadow-lg py-1 [&>*]:block [&>*]:px-3 [&>*]:py-2 text-black text-left hover:[&>*]:bg-primary hover:[&>*]:bg-opacity-10"
                  >
                    <span
                      className=""
                      onClick={() => {
                        setOpenProfile(true);
                        setDropdownOpen(false);
                      }}
                    >
                      Profile Picture
                    </span>

                    <span
                      onClick={() => {
                        setDropdownOpen(false);
                        setOpenSignout(true);
                      }}
                    >
                      Sign Out
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <ProfileModal isOpen={openProfile} updateOpen={setOpenProfile} />
      <SignoutModal isOpen={openSignout} updateOpen={setOpenSignout} />
    </ImageCropProvider>
  );
};

export default AuthedHeader;
