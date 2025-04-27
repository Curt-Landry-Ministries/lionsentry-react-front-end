"use client";
import { useUserStore } from "@/app/providers/userContext";
import LoadingScreen from "../Global/LoadingScreen";
import Modal from "../Global/Modal";
import Button from "../Global/Button";
import { AuthedPaths } from "@/lib/constants";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const OnboardingAnswers = () => {
  const { onboardingAnswers, questions, isLoading } = useUserStore((s) => s);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <h3 className="mb-8">Onboarding Answers</h3>

      {isLoading ? (
        <LoadingScreen message="Loading your answers" />
      ) : (
        <div className="flex flex-col gap-5">
          <Button
            onClick={() => setOpenModal(true)}
            standardBtn={"primary"}
            className="self-start"
          >
            Edit Answers
          </Button>
          {onboardingAnswers.map((answer, index) => (
            <div
              className="bg-cloud-dark flex flex-col p-6 rounded text-black"
              key={`answer-${answer.questionIndex}`}
            >
              <div className="font-semibold mb-2">{`${
                answer.questionIndex + 1
              }. ${answer.question}`}</div>

              <p>{questions[index].subtitle}</p>

              <div className="border border-cloud-darker bg-white rounded px-3 py-2 mt-5">
                {answer.answers[0]["answer"]}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div className="text-center flex flex-col items-center gap-10">
          <h2>Before we proceed</h2>
          <p className="text-xl leading-normal">
            Please be aware that updating your answers will change your why
            statement.
          </p>
          <div className="space-x-5 flex w-full">
            <Button
              onClick={() => setOpenModal(false)}
              standardBtn={"tertiary"}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                router.push(`${AuthedPaths.Questionnaire}?from_start=true`)
              }
              standardBtn={"primary"}
              className="flex-1"
            >
              Update My Answers
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OnboardingAnswers;
