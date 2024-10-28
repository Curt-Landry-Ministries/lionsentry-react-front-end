"use client";

import { useUserStore } from "@/app/providers/userContext";
import Button from "@/components/Global/Button";
import Dropdown from "@/components/Global/CustomSelect";
import GoalCreateModal from "@/components/Goals/GoalCreateModal";
import GoalList from "@/components/Goals/GoalList";
import { AuthedPaths } from "@/lib/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const Goals = () => {
  const { goals, getGoals } = useUserStore((s) => s);

  const router = useRouter();

  const [currentCat, setCurrentCat] = useState("All");
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>(goals);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const { current, completed } = useMemo(() => {
    return {
      current: goals.filter((item) => !item.isComplete && !item.isDeleted),
      completed: goals.filter((item) => item.isComplete && !item.isDeleted),
    };
  }, [goals]);

  const setGoals = () => {
    if (currentCat === "In Progress") setFilteredGoals(current);
    else if (currentCat === "Complete") setFilteredGoals(completed);
    else setFilteredGoals(goals);
  };

  useEffect(() => {
    setGoals();
  }, [currentCat, goals]);

  useEffect(() => {
    const completedOnboarding = localStorage.getItem("completedOnboardingGoal");

    if (
      (completedOnboarding && completedOnboarding === "true") ||
      goals.length > 0
    )
      getGoals();
    else router.push(AuthedPaths.Principles);
  }, []);

  return (
    <>
      <div className="bg-white dark:bg-black mx-4 flex flex-col gap-8">
        <div className="flex flex-wrap justify-between gap-8">
          <h1 className="md:w-full">My Goals</h1>
          <div className="mobile-only:order-1">
            <Dropdown
              id="select-goal-view"
              title="View"
              data={[
                {
                  value: "All",
                  label: "All",
                },
                { value: "In Progress", label: "In Progress" },
                { value: "Complete", label: "Complete" },
              ]}
              selectedId={currentCat}
              onSelect={setCurrentCat}
            />
          </div>

          <Button
            standardBtn={"primary"}
            onClick={() => setOpenCreateModal(true)}
          >
            Create Goal
          </Button>
        </div>
        <div className="content-box">
          {current.length > 0 ? (
            <GoalList goals={filteredGoals} />
          ) : (
            <div className="text-center flex flex-col items-center gap-8">
              <Image
                src="/icons/None.svg"
                width={48}
                height={48}
                alt="No Goals Icon"
              />
              <p className="text-inactive">
                Looks like you need to set some goals
              </p>
              <Button
                standardBtn={"primary"}
                onClick={() => setOpenCreateModal(true)}
              >
                Create Goal
              </Button>
            </div>
          )}
        </div>
      </div>
      <GoalCreateModal
        isOpen={openCreateModal}
        updateIsOpen={setOpenCreateModal}
      />
    </>
  );
};

export default Goals;
