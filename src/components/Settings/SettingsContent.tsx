"use client";
import AccountInformation from "@/components/Settings/AccountInformation";
import OnboardingAnswers from "@/components/Settings/OnboardingAnswers";
import classNames from "classnames";
import Image from "next/image";
import React, { useState } from "react";

const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/5">
        <h1 className="md:w-full title-line-style pb-5 mb-8 mobile-only:mx-6">
          Settings
        </h1>

        <ul className="flex md:flex-col mobile-only:border-b mobile-only:px-6 border-cloud-darker [&>li]:px-3 [&>li]:font-semibold [&>li]:py-2 [&>li]:cursor-pointer [&>li]:flex [&>li]:gap-2 md:[&>li]:rounded [&>li]:bg-transparent md:[&>li]:mb-2 md:[&>li.active]:bg-cloud-dark md:dark:[&>li.active]:text-black  mobile-only:[&>li.active]:border-b-4 mobile-only:[&>li.active]:border-blue mobile-only:[&>li.active]:text-blue  [&>li]:transition-colors">
          <li
            className={classNames({
              active: activeTab === "account",
            })}
            onClick={() => setActiveTab("account")}
          >
            <Image
              src="/icons/User-Gray.svg"
              width={24}
              height={24}
              alt="Account Icon"
              className="mobile-only:hidden"
            />{" "}
            Account
          </li>
          <li
            className={classNames({
              active: activeTab === "onboarding",
            })}
            onClick={() => setActiveTab("onboarding")}
          >
            <Image
              src="/icons/Book-Gray.svg"
              width={24}
              height={24}
              alt="Book Icon"
              className="mobile-only:hidden"
            />
            Onboarding
          </li>
        </ul>
      </div>

      <div className="md:w-4/5 bg-white dark:bg-black content-box mx-6">
        {activeTab === "account" ? (
          <AccountInformation />
        ) : (
          <OnboardingAnswers />
        )}
      </div>
    </div>
  );
};

export default SettingsContent;
