"use client";
import { useUserStore } from "@/app/providers/userContext";
import AlertBanner from "@/components/Global/AlertBanner";
import Button from "@/components/Global/Button";
import GoalCompleteModal from "@/components/Goals/GoalCompleteModal";
import GoalEditModal from "@/components/Goals/GoalEditModal";
import GoalTag from "@/components/Goals/GoalTag";
import { AuthedPaths, GoalTypeAsset } from "@/lib/constants";
import { formatDate } from "@/lib/utils-global";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const SingleGoal = ({ params }: { params: { slug: string } }) => {
  const { goals } = useUserStore((s) => s);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [goalUpdate, setGoalUpdate] = useState(false);

  const goal = useMemo(() => {
    return goals.filter(
      (_, index) => index === parseInt(params.slug.replace("goal-", ""))
    );
  }, [goals, params.slug]);

  const handleUpdateGoal = () => {
    setGoalUpdate(true);

    setTimeout(() => {
      setGoalUpdate(false);
    }, 5000);
  };

  return (
    goal &&
    goal[0] && (
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
          </div>

          {goal[0] && goal[0].isComplete && (
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/icons/check-circle.svg"
                width={48}
                height={48}
                alt="Check mark icon"
              />
              <h3>Complete!</h3>
            </div>
          )}

          <div
            className={`bg-${
              GoalTypeAsset[goal[0].category].color
            }-fade dark:bg-${
              GoalTypeAsset[goal[0].category].color
            }-dark py-8 px-5 rounded-lg`}
          >
            <div className="max-w-md gap-2 flex flex-col items-center mx-auto text-center">
              <GoalTag category={goal[0].category} />
              <p className="italic">
                {GoalTypeAsset[goal[0].category].description}
              </p>
              <h3>{goal[0].goal}</h3>
            </div>
          </div>

          <div className="content-container mobile-only:px-0">
            <p className="font-semibold">Goal Description</p>
            <p className="mt-2 mb-4">
              {goal[0].description ??
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie accumsan elit, at ultricies enim. Nullam gravida varius purus, vel commodo dolor finibus nec. Sed mattis non ipsum id lobortis."}
            </p>

            {goal[0].deadline && (
              <>
                <p className="font-semibold">Goal Date</p>
                <p className="mt-2 mb-4">{formatDate(goal[0].deadline)}</p>
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
          goal={goal[0]}
          isOpen={completeOpen}
          updateIsOpen={setCompleteOpen}
        />
        <GoalEditModal
          goal={goal[0]}
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
