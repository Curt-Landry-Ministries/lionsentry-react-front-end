"use client";
import AuthedHeader from "@/components/Global/AuthedHeader";
import SimpleFooter from "@/components/Global/SimpleFooter";
import React, { useEffect } from "react";
import { useUserStore } from "../providers/userContext";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export default function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchUserData, whyStatements } = useUserStore((s) => s);
  const pathname = usePathname();

  useEffect(() => {
    const asyncFetchData = async () => {
      await fetchUserData();
    };

    asyncFetchData();
  }, []);

  useEffect(() => {
    // Waiting for the endpoint to validate auth token before turning this on to make sure the flow work correctly
    // if (whyStatements.length === 0) router.push(AuthedPaths.Questionnaire);
  }, [whyStatements]);
  return (
    <div className="min-h-screen flex flex-col items-start">
      <AuthedHeader />
      <div className="flex flex-1 w-full">
        <div
          className={classNames(
            "flex flex-col items-center justify-between w-full",
            {
              "bg-cloud dark:bg-black":
                pathname.includes("principles") ||
                pathname.includes("onboarding"),
            }
          )}
        >
          <div
            className={classNames({
              "py-24 md:py-36 container mx-auto": !/^\/devotionals\/.+$/.test(
                pathname
              ),
            })}
          >
            {children}
          </div>

          {!pathname.includes("principles") && (
            <SimpleFooter darkTheme={!/^devotionals\/.+$/.test(pathname)} />
          )}
        </div>
      </div>
    </div>
  );
}
