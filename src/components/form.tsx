import React, { useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "./loading";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import {
  generateWhyStatementFromAnswers,
  submitAnswerToServer,
} from "@/lib/app/actions";

const FormComponent: React.FC<{ questions: Question[] }> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [whyStatement, setWhyStatement] = useState<string | null>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); // State to disable submit button
  const [isLoading, setIsLoading] = useState(false); // State to show loading indicator

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
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

    console.log("Submitting the following data:", questionAnswerPairs);

    // Submit each answer to the server individually
    try {
      for (const { answer, question, questionIndex } of questionAnswerPairs) {
        await submitAnswerToServer(answer, question, questionIndex);
      }
    } catch (error) {
      console.error("Error submitting answers to server:", error);
    }

    // Generate the Why statement after submitting all answers
    try {
      const generatedWhyStatement = await generateWhyStatementFromAnswers(
        questions.map((q) => ({ title: q.title })), // Send only the question titles
        questionAnswerPairs.map((qa) => qa.answer) // Send the corresponding answers
      );
      setWhyStatement(generatedWhyStatement);
      console.log("Generated Why Statement:", generatedWhyStatement);

      // Store the Why statement in local storage
      localStorage.setItem("whyStatement", generatedWhyStatement);

      // Redirect to the dashboard page
      router.push("/dashboard");
    } catch (error) {
      console.error("Error generating Why Statement:", error);
    } finally {
      setIsLoading(false); // Hide loading indicator after processing is done
    }

    // Clear the answers and reset the current question index after submission
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  const handleClear = () => {
    // Clear the answers and reset the current question index
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitDisabled(false); // Re-enable the submit button when clearing the form
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
    <>
      {/* Black background for the entire component */}
      {isLoading ? (
        <LoadingScreen message="Generating Your Life Vision Statement..." /> // Display loading screen when isLoading is true
      ) : (
        <div className="w-full rounded-lg shadow border max-w-lg bg-white dark:bg-black">
          {" "}
          {/* Form with white border */}
          <div className="p-6 sm:p-8 text-center">
            <h2 className="text-center mb-2 font-bold text-sm">
              {currentQuestionIndex + 1} / {questions.length}
            </h2>
            <span className="uppercase text-[10px] font-bold tracking-wide">
              Questionaire
            </span>
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-transparent bg-clip-text rounded-lg px-4 py-2 text-center gradient-text">
              {questions[currentQuestionIndex].title}
            </h1>

            <div className="space-y-4 md:space-y-6">
              <motion.div
                key={currentQuestionIndex}
                initial={initialAnimation}
                animate="center"
                exit={exitAnimation}
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <div className="max-w-md w-full">
                  <label className="block text-sm mb-8 text-center">
                    {questions[currentQuestionIndex].subtitle}
                  </label>
                  <textarea
                    value={answers[currentQuestionIndex] || ""}
                    onChange={handleChange}
                    className="border dark:border-gray-300 rounded-md px-4 py-2 mb-4 w-full h-24 resize-none"
                    placeholder="Type your answer here..."
                  />
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handleClear}
                      className="bg-gray-300 dark:bg-gray-500 font-semibold px-6 py-2 rounded-md"
                    >
                      {currentQuestionIndex < questions.length - 1
                        ? "Reset"
                        : "Clear"}
                    </button>
                    <button
                      onClick={handleNext}
                      className={classNames("main-btn", {
                        "cursor-not-allowed opacity-50": isSubmitDisabled,
                      })}
                      disabled={isSubmitDisabled}
                    >
                      {currentQuestionIndex < questions.length - 1
                        ? "Next"
                        : "Submit"}
                    </button>
                  </div>
                  {isLoading && (
                    <div className="mt-4 text-center">
                      <p className="text-white">
                        Generating Your Life Vision Statement...
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormComponent;
