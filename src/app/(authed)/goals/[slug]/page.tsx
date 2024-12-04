"use client";
import AlertBanner from "@/components/Global/AlertBanner";
import Button from "@/components/Global/Button";
import GoalCompleteModal from "@/components/Goals/GoalCompleteModal";
import GoalEditModal from "@/components/Goals/GoalEditModal";
import GoalTag from "@/components/Goals/GoalTag";
import { AuthedPaths, GoalTypeAsset } from "@/lib/constants";
import { useGoals } from "@/lib/hooks/useGoals";
import { formatDate } from "@/lib/utils-global";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SingleGoal = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const [completeOpen, setCompleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [goalUpdate, setGoalUpdate] = useState(false);

  const { currentGoal, updateGoalHook } = useGoals(slug);

  const handleReviveGoal = async () =>
    await updateGoalHook({
      isComplete: false,
    });

  const handleUpdateGoal = async (goalData: Partial<Goal>) => {
    setGoalUpdate(true);

    await updateGoalHook({
      ...goalData,
    });

    setTimeout(() => {
      setGoalUpdate(false);
    }, 5000);
  };

  return (
    currentGoal && (
      <>
        <div className="bg-white dark:bg-black mx-4 flex flex-col gap-8 h-full flex-1">
          <div className="flex justify-between">
            <Link href={AuthedPaths.Goals}>
              <Button
                standardBtn={"text"}
                hasIcon={true}
                className="text-inactive dark:text-inactive-dark"
              >
                <ChevronLeftIcon /> Back
              </Button>
            </Link>

            {currentGoal && !currentGoal.isComplete && (
              <Button
                standardBtn={"text"}
                hasIcon={true}
                className="text-primary"
                onClick={() => setCompleteOpen(true)}
              >
                <Image
                  src="/icons/check_box_outline_blank.svg"
                  width={24}
                  height={24}
                  alt="Check box icon"
                />{" "}
                Mark Complete
              </Button>
            )}
          </div>

          {currentGoal && currentGoal.isComplete && (
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/icons/check-circle.svg"
                width={48}
                height={48}
                alt="Check mark icon"
              />
              <h3>Complete!</h3>

              <Button
                standardBtn={"text"}
                className={"text-primary"}
                onClick={handleReviveGoal}
              >
                Revive Goal
              </Button>
            </div>
          )}

          <div
            className={`bg-${
              GoalTypeAsset[currentGoal.category].color
            }-fade dark:bg-${
              GoalTypeAsset[currentGoal.category].color
            }-dark py-8 px-5 rounded-lg`}
          >
            <div className="max-w-md gap-2 flex flex-col items-center mx-auto text-center">
              <GoalTag category={currentGoal.category} />
              <p className="italic">
                {GoalTypeAsset[currentGoal.category].description}
              </p>
              <h3>{currentGoal.goal}</h3>
            </div>
          </div>

          <div className="content-container mobile-only:px-0">
            {currentGoal.description ? (
              <>
                <p className="font-semibold">Goal Description</p>
                <p className="mt-2 mb-4">{currentGoal.description}</p>
              </>
            ) : (
              ""
            )}

            {currentGoal.deadline && (
              <>
                <p className="font-semibold">Goal Date</p>
                <p className="mt-2 mb-4">{formatDate(currentGoal.deadline)}</p>
              </>
            )}

            <Button
              standardBtn={"text"}
              hasIcon={true}
              className="text-primary"
              onClick={() => setEditOpen(true)}
            >
              <Image
                src="/icons/edit-icon.svg"
                width={24}
                height={24}
                alt="Edit icon"
              />{" "}
              Edit Goal
            </Button>
          </div>
        </div>
        <GoalCompleteModal
          goalId={params.slug}
          isOpen={completeOpen}
          updateIsOpen={setCompleteOpen}
        />
        <GoalEditModal
          goal={currentGoal}
          isOpen={editOpen}
          updateIsOpen={setEditOpen}
          onUpdate={handleUpdateGoal}
        />
        <AlertBanner
          message="Goal has been updated"
          isOpen={goalUpdate}
          onClose={() => setGoalUpdate(false)}
        />
      </>
    )
  );
};

export default SingleGoal;
