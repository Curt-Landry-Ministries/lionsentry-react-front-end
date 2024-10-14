import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import classNames from "classnames";
import LeftRight from "./Gradients/LeftRightGradient";
import { Paths } from "@/lib/constants";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { isLoggedIn } from "@/lib/utils";

const MobileMenu = () => {
  const pathname = usePathname();
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    if (toggleMenu) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [toggleMenu]);

  useEffect(() => {
    setToggleMenu(false);
  }, [pathname]);

  return (
    <>
      <button onClick={() => setToggleMenu(!toggleMenu)}>
        {toggleMenu ? (
          <Cross1Icon width={30} height={30} />
        ) : (
          <HamburgerMenuIcon width={30} height={30} />
        )}
      </button>

      <div
        className={classNames(
          "w-screen fixed inset-0 top-12 transition-transform duration-700 bg-navy dark:bg-black overflow-hidden",
          {
            "translate-y-0": toggleMenu,
            "-translate-y-[200%]": !toggleMenu,
          }
        )}
      >
        <LeftRight hasRight={false} className="pt-12 flex h-full">
          <div className="flex flex-col w-full h-full py-10 px-8 items-start">
            {!isLoggedIn && (
              <div className="flex flex-col gap-5 flex-grow">
                <Link className="inline-block" href={Paths.Login}>
                  Sign In
                </Link>
                <Link className="inline-block" href={Paths.Signup}>
                  Sign Up
                </Link>
              </div>
            )}

            <ThemeToggler />

            <div className="h-[1px] w-full bg-gradient-1 bg-opacity-70 my-5"></div>

            <div className="flex flex-col gap-5">
              <Link href="https://www.curtlandry.com/" target="_blank">
                Curt Landry Ministries
              </Link>
              <Link href={Paths.Terms}>Terms of Service</Link>
              <Link href={Paths.Privacy}>Privacy Policy</Link>
            </div>
            <div className="h-[1px] w-full bg-gradient-1 bg-opacity-70 my-5"></div>

            <Logo noTheme={true} />
            <span className="block text-xs">
              A Curt Landry Ministries Platform
            </span>
          </div>
        </LeftRight>
      </div>
    </>
  );
};

export default MobileMenu;
