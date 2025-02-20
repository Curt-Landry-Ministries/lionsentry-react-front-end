"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "../Global/LoadingScreen";
import { useRouter } from "next/navigation";

import {
  fetchAnswersFromServer,
  generateWhyStatementFromAnswers,
  submitAnswerToServer,
} from "@/lib/app/actions";
import QuestionnaireStep from "./QuestionnaireStep";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Button from "../Global/Button";
import ProgressBar from "../Global/ProgressBar";
import { useUserStore } from "@/app/providers/userContext";
import { AuthedPaths } from "@/lib/constants";
import { logTest } from "@/lib/utils";
import useLoggedIn from "@/lib/hooks/useLoggedIn";
import { logout, refreshUserToken } from "@/lib/auth/actions";

const QuestionnaireForm: React.FC<{
  questions: Question[];
}> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); // State to disable submit button
  const [isLoading, setIsLoading] = useState(false); // State to show loading indicator
  const [isLoadingAnswers, setIsLoadingAnswer] = useState(true);
  const isLoggedIn = useLoggedIn();

  const router = useRouter();

  const { email, fetchBasicData } = useUserStore((s) => s);

  useEffect(() => {
    const asyncFetchData = async () => {
      await fetchBasicData();
    };
    const fetchAnswers = async () => {
      setIsLoadingAnswer(true);
      const serverAnswers = await fetchAnswersFromServer();

      if (serverAnswers.success) {
        const parseAnswers: Record<number, string> = {};
        serverAnswers.value.map((serverAnswer: any) => {
          const currentAnswer =
            serverAnswer["answers"][serverAnswer["answers"].length - 1]
              .answer ?? "";

          parseAnswers[serverAnswer.questionIndex] = currentAnswer;
        });

        setAnswers(parseAnswers);
        if (Object.keys(parseAnswers).length > 0)
          setCurrentQuestionIndex(
            Math.max(...Object.keys(parseAnswers).map(Number))
          );
      }
      setIsLoadingAnswer(false);
    };

    if (isLoggedIn && email.length == 0) {
      asyncFetchData();
    }

    if (isLoggedIn && email.length > 0) {
      fetchAnswers();
    }
  }, [isLoggedIn, email]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: e.target.value,
    });
  };

  const handleNavigate = async (direction: number = 1) => {
    // refresh token in case user takes longer than
    // 1 hour to finish the questionnaire
    await refreshUserToken();

    const nextIndex =
      currentQuestionIndex + direction >= -1 &&
      currentQuestionIndex + direction <= 13
        ? currentQuestionIndex + direction
        : currentQuestionIndex;

    if (nextIndex < questions.length && nextIndex >= -1) {
      setCurrentQuestionIndex(nextIndex);
      window.scrollTo(0, 0);
    }

    await saveAnswersToServer();

    if (nextIndex === questions.length) handleSubmit();
  };

  const saveAnswersToServer = async () => {
    if (currentQuestionIndex > -1) {
      await submitAnswerToServer(
        answers[currentQuestionIndex],
        questions[currentQuestionIndex].title,
        currentQuestionIndex
      );
    }
  };

  const handleSubmit = async () => {
    setIsSubmitDisabled(true); // Disable the submit button
    setIsLoading(true); // Show loading indicator

    // Collect all question and answer pairs into an array of objects
    const questionAnswerPairs = questions.map((question, index) => ({
      question: question.title,
      subTitle: question.subtitle,
      answer: answers[index] || "",
      questionIndex: index,
    }));

    logTest(questionAnswerPairs);

    // Generate the Why statement after submitting all answers
    try {
      const generatedWhyStatement = await generateWhyStatementFromAnswers(
        questions.map((q) => ({ title: q.title })), // Send only the question titles
        questionAnswerPairs.map((qa) => qa.answer) // Send the corresponding answers
      );
      logTest(generatedWhyStatement);

      // Redirect to the dashboard page
      if (generatedWhyStatement.success) {
        router.push(AuthedPaths.Dashboard);
      }
    } catch (error) {
      logTest(error);
    } finally {
      setIsLoading(false); // Hide loading indicator after processing is done
    }
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
    <div className="pt-16 pb-40 md:pt-24 md:pb-16 content-container lg:max-w-[800px] lg:min-w-[800px]">
      {isLoading || isLoadingAnswers ? (
        <LoadingScreen
          message={
            isLoadingAnswers
              ? "Loading your questionaire"
              : "Generating Your Personalized Purpose Statement"
          }
        /> // Display loading screen when isLoading is true
      ) : (
        <div className="flex-1">
          {currentQuestionIndex > -1 && (
            <ProgressBar
              current={currentQuestionIndex + 1}
              max={questions.length}
              subText={`Question ${currentQuestionIndex + 1}/${
                questions.length
              }`}
            />
          )}

          <motion.div
            key={currentQuestionIndex}
            initial={initialAnimation}
            animate="center"
            exit={exitAnimation}
            variants={variants}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <QuestionnaireStep
              index={currentQuestionIndex}
              item={questions[currentQuestionIndex]}
              currentAnswer={answers[currentQuestionIndex] || ""}
              onChange={(e) => handleChange(e)}
            />
          </motion.div>

          <div className="mobile-only:z-20 mobile-only:fixed mobile-only:bottom-0 mobile-only:left-0 mobile-only:shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)] mobile-only:gap-2 mobile-only:dark:shadow-[0px_0px_12px_0px_rgba(255,255,255,0.15)] w-full mobile-only:p-5 bg-white md:bg-transparent flex items-center justify-between mt-10">
            {currentQuestionIndex > -1 ? (
              <>
                <Button
                  standardBtn={"secondary"}
                  hasIcon={true}
                  className="pl-2 mobile-only:w-1/2"
                  onClick={() => handleNavigate(-1)}
                >
                  <ChevronLeftIcon width={24} height={24} /> Previous
                </Button>

                <Button
                  standardBtn={"primary"}
                  hasIcon={true}
                  className="pr-2 mobile-only:w-1/2"
                  onClick={() => handleNavigate(1)}
                  disabled={!answers[currentQuestionIndex] || isSubmitDisabled}
                >
                  Next <ChevronRightIcon width={24} height={24} />
                </Button>
              </>
            ) : (
              <Button
                standardBtn={"primary"}
                hasIcon={true}
                className="pr-2 mx-auto "
                onClick={() => handleNavigate(1)}
              >
                Start <ChevronRightIcon width={24} height={24} />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionnaireForm;
