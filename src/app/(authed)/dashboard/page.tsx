"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/app/providers/userContext";
import Image from "next/image";
import Link from "next/link";
import { AuthedPaths } from "@/lib/constants";
import Button from "@/components/Global/Button";
import GoalList from "@/components/Goals/GoalList";
import Modal from "@/components/Global/Modal";
import ProfilePhoto from "@/components/Global/ProflePhoto";
import DevotionalFull from "@/components/Devotionals/DevotionalFull";

const Dashboard = () => {
  const { whyStatements, goals, devotionals, name, profile_photo } =
    useUserStore((state) => state);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const showWelcomeModal = localStorage.getItem("showWelcomeModal");

    if (
      (!showWelcomeModal ||
        (showWelcomeModal && showWelcomeModal === "false")) &&
      goals.length === 0
    ) {
      localStorage.setItem("showWelcomeModal", "true");
      setOpenModal(goals.length === 0);
    }
  }, [goals]);

  return (
    <>
      <div className="grid md:grid-cols-5 gap-7 bg-white dark:bg-black mx-4">
        <div className="content-box flex flex-wrap md:flex-nowrap gap-7 w-full md:col-span-5">
          <ProfilePhoto src={profile_photo} name={name()} />

          <div className="flex flex-col">
            <h2 className="pb-5 mb-5 title-line-style">My Why</h2>
            {whyStatements.length > 0 && (
              <>
                <p className="flex-1">
                  {whyStatements[whyStatements.length - 1] &&
                    whyStatements[
                      whyStatements.length - 1
                    ].whyStatement.replace('"Why Statement": ', "")}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="md:col-span-3">
          <DevotionalFull
            showNone={devotionals.length === 0}
            devotional={devotionals && devotionals[0]}
            inDashboard={true}
          />
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
                    src="/icons/None.svg"
                    alt="None Icon"
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
              <GoalList goals={goals.slice(0, 4)} isLarge={false} />
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div className="text-center flex flex-col items-center gap-10">
          <Image
            src="/icons/welcome-icon.svg"
            width={150}
            height={150}
            alt="welcome modal icon"
          />
          <h2>Welcome!</h2>
          <p className="text-xl leading-normal">
            We are excited about your “why!” Your mission statement sounds
            powerful and impactful.
            <br /> <br /> Now that you have your personal purpose statement,
            it&apos;s time set goals!
          </p>
          <div className="space-x-5 flex w-full">
            <Button
              onClick={() => setOpenModal(false)}
              standardBtn={"tertiary"}
              className="flex-1"
            >
              Later
            </Button>
            <Button
              onClick={() => {}}
              standardBtn={"primary"}
              className="flex-1"
            >
              <Link href={AuthedPaths.Goals}>Set Goals</Link>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
