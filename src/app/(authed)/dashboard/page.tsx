"use client";

import React from "react";
import { useUserStore } from "@/app/providers/userContext";
import Image from "next/image";
import Link from "next/link";
import { AuthedPaths } from "@/lib/constants";
import Button from "@/components/Global/Button";
import classNames from "classnames";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const Dashboard = () => {
  const { whyStatements, goals, devotionals, name } = useUserStore(
    (state) => state
  );

  return (
    <div className="grid md:grid-cols-5 gap-7 bg-white dark:bg-black [&>.content-box]:bg-white [&>.content-box]:dark:bg-opacity-10 [&>.content-box]:dark:shadow-none [&>.content-box]:shadow-content-box [&>.content-box]:p-7 [&>.content-box]:rounded-md mx-4">
      <div className="content-box flex flex-wrap md:flex-nowrap gap-7 w-full md:col-span-5">
        <Image
          src="/images/user_image.png"
          width={170}
          height={170}
          alt={name}
        />
        <div className="flex flex-col">
          <h2 className="pb-5 mb-5 title-line-style">My Why</h2>
          {whyStatements.length > 0 && (
            <>
              <p className="flex-1">
                {whyStatements[whyStatements.length - 1].whyStatement.substring(
                  0,
                  200
                )}
                ...
              </p>
              <Link href={AuthedPaths.MyWhy} className="link-style ml-auto">
                See Full Statement
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="content-box md:col-span-3">
        <div className="title-line-style">
          <div className="flex items-center">
            <h3>Today&apos;s Devotional</h3>
            <Link href={AuthedPaths.Devotionals} className="link-style ml-auto">
              See All
            </Link>
          </div>

          {devotionals.length > 0 && (
            <span className="text-inactive block pb-7">
              {devotionals[devotionals.length - 1].dateTimeCreated}
            </span>
          )}
        </div>

        <div className="mt-7">
          {devotionals.length === 0 ? (
            <div className="text-center space-y-7 p-5">
              <Image
                src="/icons/check-circle.svg"
                alt="Check Circle Icon"
                width={40}
                height={40}
                className="mx-auto"
              />
              <p className="text-inactive text-xl">
                Once you set your goals, you will receive daily devotionals that
                help you further align to those goals you are currently working
                on.
              </p>
              <Button standardBtn={"primary"}>
                <Link href={AuthedPaths.Goals}>Set Goals</Link>
              </Button>
            </div>
          ) : (
            <>{devotionals[devotionals.length - 1].devotional}</>
          )}
        </div>
      </div>

      <div className="content-box md:col-span-2">
        <div className="flex">
          <h3 className="title-line-style pb-3">My Goals</h3>
          <Link href={AuthedPaths.Goals} className="link-style ml-auto">
            See All
          </Link>
        </div>
        <div className="mt-7">
          {goals.length === 0 ? (
            <div className="p-5">
              <div className="text-center space-y-7">
                <Image
                  src="/icons/check-circle.svg"
                  alt="Check Circle Icon"
                  width={40}
                  height={40}
                  className="mx-auto"
                />
                <p className="text-inactive text-xl">
                  Once you set your goals, you will see them here.
                </p>
                <Button standardBtn={"primary"}>
                  <Link href={AuthedPaths.Goals}>Set Goals</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {goals.map((goal, index) => (
                <div
                  className="[&:not(:first-child)]:pt-5"
                  key={`goal-${index}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span
                        className={classNames(
                          "text-white min-w-[106px] inline-block text-center rounded font-semibold leading-normal mb-1",
                          {
                            "bg-tag-blue": goal.category === "Physical",
                            "bg-tag-orange": goal.category === "Spiritual",
                            "bg-tag-purple": goal.category === "Other",
                            "bg-tag-pink": goal.category === "Joy",
                            "bg-tag-green": goal.category === "Financial",
                          }
                        )}
                      >
                        {goal.category}
                      </span>
                      <p className="text-lg md:text-xl leading-normal">
                        {goal.goal}
                      </p>
                      <span className="text-inactive mobile-only:text-sm">
                        {goal.deadline ?? "No Date"}
                      </span>
                    </div>

                    <ChevronRightIcon
                      width={24}
                      height={24}
                      className="text-primary"
                    />
                  </div>

                  {index < goals.length - 1 && (
                    <div className="w-full h-[1px] bg-gradient-1 mt-5"></div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
