"use client";

import React from "react";
import { AuthedPaths } from "@/lib/constants";
import Link from "next/link";
import Button from "@/components/Global/Button";
import Image from "next/image";
import { useUserStore } from "@/app/providers/userContext";
import LoadingScreen from "@/components/Global/LoadingScreen";

const MyWhy = () => {
  const { whyStatements, isLoading, goals } = useUserStore((state) => state);

  return (
    <>
      {isLoading ? (
        <LoadingScreen size="sm" message="Loading Your Why Statement" />
      ) : whyStatements.length > 0 ? (
        <div className="flex flex-col md:flex-row space-y-5 md:space-x-10 content-container">
          <div>
            <div className="w-36 md:w-44 h-36 md:h-44 bg-cloud-dark rounded-full flex items-center justify-center mx-auto">
              <Image
                src="/icons/User.svg"
                width={100}
                height={100}
                alt="Profile Icon"
              />
            </div>
          </div>
          <div className="max-w-[800px]">
            <h1 className="pb-5 mb-5 title-line-style">My Why</h1>

            <div>
              <p className="text-lg leading-relaxed">
                {whyStatements[whyStatements.length - 1].whyStatement}
              </p>
            </div>
            {goals.length === 0 && (
              <div className="text-center p-5 bg-cloud-dark dark:bg-cloud-darker dark:text-black rounded-lg space-y-5 mt-5">
                <h2>Goal Setting Unlocked!</h2>
                <p>
                  Now that you have your purpose statement, you can set your
                  goals that help you live with more focus and intention.
                </p>

                <Button standardBtn={"primary"}>
                  <Link href={AuthedPaths.Goals}>Set Goals</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center dark:text-gray-600">
          No Why Statement found.
        </p>
      )}
    </>
  );
};

export default MyWhy;
