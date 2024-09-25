// src/components/footer.tsx
"use client";
import { Paths } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="p-10 w-full bg-navy dark:bg-black text-white">
      <div className="max-w-screen-xl flex items-center justify-center mx-auto flex-col md:flex-row">
        <Image
          src={"/LS-Logo.png"}
          width={70}
          height={70}
          alt="LionSentry Logo"
          className="hidden md:block"
        />
        <div className="flex-1 flex flex-col justify-center">
          <div className="self-center">
            <div className="flex justify-center items-center flex-col md:flex-row flex-wrap gap-5 text-base md:text-xs px-10">
              <div className="font-serif text-2xl">LionSentry</div>

              <Link href="https://www.curtlandry.com/" target="_blank">
                Curt Landry Ministries
              </Link>
              <Link href={Paths.Terms}>Terms of Service</Link>
              <Link href={Paths.Privacy}>Privacy Policy</Link>
            </div>
            <div className="h-[1px] w-full bg-gradient-1 bg-opacity-70 mt-5"></div>
          </div>

          <Image
            src={"/images/LS-Logo.png"}
            width={40}
            height={40}
            alt="LionSentry Logo"
            className="block md:hidden self-center mt-3"
          />

          <p className="text-xs text-white opacity-60 text-center pt-8 md:pt-3 order-last">
            &copy; {currentYear} Curt Landry Ministries | 501C Charity | All
            Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
