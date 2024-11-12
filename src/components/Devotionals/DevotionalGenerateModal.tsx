"use client";
import Image from "next/image";
import Button from "../Global/Button";
import Modal from "../Global/Modal";
import { useEffect, useState } from "react";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { fetchDevotionals, generateDevotional } from "@/lib/app/actions";
import LoadingScreen from "../Global/LoadingScreen";
import { useUserStore } from "@/app/providers/userContext";
import { redirect } from "next/navigation";

const DevotionalGenerateModal = () => {
  const { updateDevotionals } = useUserStore((s) => s);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customGenerate, setCustomGenerate] = useState(false);
  const [devotionalTopic, setDevotionalTopic] = useState("");

  const inputStyle =
    "border border-cloud-darker bg-white dark:bg-dark-mode-subtle dark:border-dark-mode-strong w-full py-2 px-3 rounded";

  const handleGenerateDevotional = async (custom = false) => {
    setIsLoading(true);
    setIsOpen(false);

    if (custom) {
      alert("Generate Devotional with custom topic " + devotionalTopic);
      setDevotionalTopic("");
      setCustomGenerate(false);
    } else {
      await generateDevotional();

      const refetchDevotionals = await fetchDevotionals();
      if (refetchDevotionals.success) {
        updateDevotionals(refetchDevotionals.value);

        redirect(`/devotionals/devotional-0`);
      }
    }

    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <>
      <Button
        standardBtn={"gradient"}
        onClick={() => setIsOpen(true)}
        hasIcon={true}
        className="!pr-2"
      >
        Generate{" "}
        <Image
          src="/icons/AI-Sparks.svg"
          height={24}
          width={24}
          alt="AI sparks icon"
        />
      </Button>

      {isLoading && (
        <LoadingScreen
          isFullScreen={true}
          message="Generating Devotional"
          className="bg-cloud"
        />
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="text-center relative flex flex-col items-center md:min-w-[700px]">
          <h3 className="mb-8">Generate a Devotional</h3>

          {!customGenerate ? (
            <>
              <Button
                standardBtn={"gradient"}
                onClick={() => handleGenerateDevotional(false)}
                hasIcon={true}
                className="!pr-2"
              >
                Generate Now{" "}
                <Image
                  src="/icons/AI-Sparks.svg"
                  height={24}
                  width={24}
                  alt="AI sparks icon"
                />
              </Button>

              <div className="w-full my-8">
                <div className="h-[1px] w-full bg-gradient-1"></div>
                <span className="px-5 bg-white inline-block -translate-y-1/2">
                  Or
                </span>
              </div>
            </>
          ) : (
            <Button
              hasIcon={true}
              standardBtn={"text"}
              className="text-inactive dark:text-inactive-dark mr-auto mb-6"
              onClick={() => setCustomGenerate(false)}
            >
              <ChevronLeftIcon /> Back
            </Button>
          )}

          <div className="w-full text-left">
            <p className="font-semibold mb-2">
              Write down a topic, or describe the devotional you'd like to
              receive.
            </p>
            <textarea
              className={inputStyle}
              rows={4}
              placeholder="Please describe your devotional needs today"
              onClick={() => setCustomGenerate(true)}
              onChange={(e) => setDevotionalTopic(e.currentTarget.value)}
              value={devotionalTopic}
            />
          </div>

          {customGenerate && (
            <Button
              standardBtn={"gradient"}
              onClick={() => handleGenerateDevotional(true)}
              hasIcon={true}
              className="!pr-2 ml-auto mt-6"
            >
              Generate{" "}
              <Image
                src="/icons/AI-Sparks.svg"
                height={24}
                width={24}
                alt="AI sparks icon"
              />
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default DevotionalGenerateModal;
