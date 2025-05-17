"use client";
import AuthedHeader from "@/components/Global/AuthedHeader";
import SimpleFooter from "@/components/Global/SimpleFooter";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../providers/userContext";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import DisclamerModal from "@/components/Signup/DisclamerModal";
import { logout } from "@/lib/auth/actions";
import { setDisclaimerUserValues } from "@/lib/app/actions";
import { CURRENT_AI_DISCLAIMER_VERSION } from "@/lib/utils-global";

export default function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchUserData, ai_disclaimer_agreement, isLoading } = useUserStore(
    (s) => s
  );
  const [openDisclaimer, setOpenDisclamer] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const asyncFetchData = async () => {
      await fetchUserData();
    };

    asyncFetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (
        !ai_disclaimer_agreement ||
        ai_disclaimer_agreement !== CURRENT_AI_DISCLAIMER_VERSION
      ) {
        setOpenDisclamer(true);
      } else {
        setOpenDisclamer(false);
      }
    }
  }, [ai_disclaimer_agreement, isLoading]);

  const handleConfirm = async () => {
    await setDisclaimerUserValues();
    setOpenDisclamer(false);
    await fetchUserData();
  };

  const handleClose = () => {
    logout();
  };

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
      <DisclamerModal
        onClose={handleClose}
        isOpen={openDisclaimer}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
