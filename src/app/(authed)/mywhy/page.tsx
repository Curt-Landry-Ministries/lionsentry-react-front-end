"use client";

import React, { useEffect, useState } from "react";
import { getLatestWhyStatement } from "@/lib/app/actions";
import { AuthedPaths } from "@/lib/constants";
import Link from "next/link";
import Button from "@/components/Global/Button";
import Image from "next/image";
import Modal from "@/components/Global/Modal";
import { useUserStore } from "@/app/providers/userContext";

const MyWhy = () => {
  const [loading, setLoading] = useState(false); // State to manage loading
  const [openModal, setOpenModal] = useState(false);

  const { whyStatements, goals, updateWhyStatements } = useUserStore(
    (state) => state
  );

  useEffect(() => {
    const fetchWhyStatement = async () => {
      try {
        setLoading(true);

        const statement = await getLatestWhyStatement();

        statement &&
          updateWhyStatements([
            {
              id: "why-statement-id",
              forUser: "user-id",
              dateTimeCreated: new Date().toDateString(),
              whyStatement: statement,
            },
          ]);
      } catch (err) {
        console.error("Error fetching the latest why statement:", err);
      } finally {
        setLoading(false);
      }
    };

    if (whyStatements.length === 0) {
      fetchWhyStatement();
    }

    if (goals.length === 0) {
      setTimeout(() => setOpenModal(true), 300);
    }
  }, [goals.length, updateWhyStatements, whyStatements.length]);

  return (
    <>
      {loading ? (
        <p className="text-center dark:text-gray-600">
          Loading your Why Statement...
        </p>
      ) : whyStatements.length > 0 ? (
        <div className="flex flex-col md:flex-row space-y-5 md:space-x-10">
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

      <Modal isOpen={openModal} onClose={() => console.log("test")}>
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
              Set Goals
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyWhy;
