import { Paths } from "@/lib/constants";
import Link from "next/link";
import Logo from "./Logo";
import classNames from "classnames";

const SimpleFooter = ({ darkTheme = false }: { darkTheme?: boolean }) => {
  return (
    <footer
      className={classNames("py-7 px-10 w-full text-inactive dark:text-white", {
        "bg-navy dark:bg-black": darkTheme,
        "border-t": !darkTheme,
      })}
    >
      <div className="max-w-screen-xl flex justify-start items-center flex-col md:flex-row flex-wrap gap-5 text-base md:text-xs px-10">
        <Logo color={"gray"} />

        <Link href="https://www.curtlandry.com/" target="_blank">
          Curt Landry Ministries
        </Link>
        <Link href={Paths.Terms}>Terms of Service</Link>
        <Link href={Paths.Privacy}>Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default SimpleFooter;
