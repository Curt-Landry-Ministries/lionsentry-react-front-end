"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "../Global/LoadingScreen";
import { useRouter } from "next/navigation";

import { saveGoal } from "@/lib/app/actions";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Button from "../Global/Button";
import ProgressBar from "../Global/ProgressBar";
import { AuthedPaths, GoalTypeAsset } from "@/lib/constants";
import { logError } from "@/lib/utils";
import GoalOnboardingStep from "./GoalOnboardingStep";
import Image from "next/image";

const GoalOnboardingForm: React.FC = () => {
  const goalKeys = Object.keys(GoalTypeAsset);
  const DEFAULT_GOALS = goalKeys.map(
    (key): Pick<Goal, "goal" | "description" | "category" | "deadline"> => ({
      category: key as keyof typeof GoalTypeAsset,
      goal: "",
      description: "",
      deadline: null,
    })
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] =
    useState<Pick<Goal, "goal" | "description" | "category" | "deadline">[]>(
      DEFAULT_GOALS
    );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); // State to disable submit button
  const [isLoading, setIsLoading] = useState(false); // State to show loading indicator

  const router = useRouter();

  useEffect(() => {
    const savedAnswers = localStorage.getItem("onboardingGoalsCurrentState");

    if (savedAnswers) {
      const parseSavedAnswers = JSON.parse(savedAnswers);

      if (parseSavedAnswers.activeQuestion) {
        setCurrentQuestionIndex(parseSavedAnswers.activeQuestion);

        if (parseSavedAnswers.currentAnswers) {
          setAnswers(parseSavedAnswers.currentAnswers);
        }
      }
    }
  }, []);

  const handleChange = (
    answer: Pick<Goal, "goal" | "description" | "category" | "deadline">
  ) => {
    const tmpAnswer = [...answers];
    tmpAnswer[currentQuestionIndex] = answer;
    setAnswers([...tmpAnswer]);
  };

  const handleNavigate = (direction: number = 1) => {
    if (
      currentQuestionIndex + direction < goalKeys.length &&
      currentQuestionIndex + direction > -1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + direction);

      saveAnswerToLocalStorage();

      window.scrollTo(0, 0);
    }

    if (currentQuestionIndex + direction < 0)
      router.push(AuthedPaths.Principles);

    if (currentQuestionIndex === goalKeys.length - 1) handleSubmit();
  };

  const saveAnswerToLocalStorage = () => {
    localStorage.setItem(
      "onboardingGoalsCurrentState",
      JSON.stringify({
        activeQuestion: currentQuestionIndex,
        currentAnswers: answers,
      })
    );
  };

  const handleSubmit = async () => {
    setIsSubmitDisabled(true); // Disable the submit button
    setIsLoading(true); // Show loading indicator

    // Submit each answer to the server individually
    try {
      await Promise.all(
        answers.map(async (item) => {
          if (!!item.goal && item.goal.length > 0) await saveGoal(item);
        })
      );

      localStorage.removeItem("onboardingGoalsCurrentState");

      localStorage.setItem("completedOnboardingGoal", "true");
    } catch (error) {
      logError(error);
    }

    // Clear the answers and reset the current question index after submission
    setAnswers(DEFAULT_GOALS);
    setCurrentQuestionIndex(0);

    router.push(AuthedPaths.Goals);
  };

  // Variants for animation
  const variants = {
    enterFromLeft: { opacity: 0, x: -20 },
    center: { opacity: 1, x: 0 },
    enterFromRight: { opacity: 0, x: 20 },
  };

  // Determine initial and exit animation states based on current question index
  const initialAnimation =
    currentQuestionIndex % 2 === 0 ? "enterFromLeft" : "enterFromRight";
  const exitAnimation =
    currentQuestionIndex % 2 === 0 ? "enterFromRight" : "enterFromLeft";

  return (
    <div className="pb-40 md:pb-16">
      {/* Black background for the entire component */}
      {isLoading ? (
        <LoadingScreen message="Creating Your Goals" /> // Display loading screen when isLoading is true
      ) : (
        <div className="flex-1">
          <ProgressBar
            current={currentQuestionIndex + 1}
            max={goalKeys.length}
            subText={`Goal ${currentQuestionIndex + 1}/${goalKeys.length}`}
          />

          {answers[currentQuestionIndex] && (
            <motion.div
              key={currentQuestionIndex}
              initial={initialAnimation}
              animate="center"
              exit={exitAnimation}
              variants={variants}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <GoalOnboardingStep
                index={currentQuestionIndex}
                currentAnswer={answers[currentQuestionIndex]}
                onChange={(answer) => handleChange(answer)}
              />
            </motion.div>
          )}

          <div className="mobile-only:z-20 mobile-only:flex-wrap gap-5 mobile-only:fixed mobile-only:bottom-0 mobile-only:left-0 mobile-only:shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)] mobile-only:gap-2 mobile-only:dark:shadow-[0px_0px_12px_0px_rgba(255,255,255,0.15)] w-full mobile-only:p-5 bg-white md:bg-transparent flex items-center justify-between mt-10">
            <Button
              standardBtn={"secondary"}
              hasIcon={true}
              className="pl-2 mobile-only:w-full"
              onClick={() => handleNavigate(-1)}
            >
              <ChevronLeftIcon width={24} height={24} /> Previous
            </Button>

            <Button
              standardBtn={"text"}
              className="text-primary md:ml-auto"
              onClick={() => handleNavigate(1)}
            >
              Skip
            </Button>
            <Button
              standardBtn={"primary"}
              hasIcon={true}
              className="pr-2 mobile-only:w-auto"
              onClick={() => handleNavigate(1)}
              disabled={!answers[currentQuestionIndex] || isSubmitDisabled}
            >
              Save and Continue <ChevronRightIcon width={24} height={24} />
            </Button>
          </div>

          <div className="text-inactive dark:text-inactive-dark flex gap-1 mt-14">
            <Image
              src="/icons/Clock.svg"
              width={24}
              height={24}
              alt="Clock Icon"
            />{" "}
            Progress is Automatically Saved
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalOnboardingForm;
