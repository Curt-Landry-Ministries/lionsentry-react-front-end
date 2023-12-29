import React, { useState, useEffect } from "react";
import Label from "../atoms/Label";
import Subtitle from "../atoms/Subtitle";
import MultiLineTextInput from "../atoms/MultiLineTextInput";
import DotIndicator from "../molecules/DotIndicator";
import StyledButton from "../atoms/StyledButton";
import { useTranslation } from "react-i18next";
import {
  submitAnswerToServer,
  fetchQuestionsFromServer,
  generateWhyStatementFromAnswers,
  generateDevotional,
} from "../../API/appServerAPICalls";
import { StyledBody, StyledH1 } from "../theme";
import { LoadingIndicator } from "../atoms/LoadingIndicator";
import { DevotionalContent } from "../../API/appServerAPICalls";

const OnboardingQuestionForm: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [whyStatement, setWhyStatement] = useState<string | null>(null);
  const [devotionalContent, setDevotionalContent] = useState<DevotionalContent>(
    {
      Title: "",
      BiblePassage: "",
      Personalization: "",
      JournalingPrompt: "",
    }
  );

  const { t } = useTranslation();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const fetchedQuestions = await fetchQuestionsFromServer();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    getQuestions();
  }, []);

  const handleGenerateDevotional = async () => {
    setIsLoading(true);
    try {
      const generatedDevotional = await generateDevotional(answers);
      if (generatedDevotional) {
        setDevotionalContent(generatedDevotional); // Set the structured content
        console.log("Generated Devotional:", generatedDevotional);
      } else {
        console.error("No devotional content returned from the server");
      }
    } catch (error) {
      console.error("Failed to generate Devotional:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsLoading(true);
      try {
        const generatedStatement = await generateWhyStatementFromAnswers(
          questions,
          answers
        );
        setWhyStatement(generatedStatement);
        console.log("Generated Why Statement:", generatedStatement);
      } catch (error) {
        console.error("Failed to generate Why Statement:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (
        answers[currentQuestionIndex] &&
        answers[currentQuestionIndex].trim() !== ""
      ) {
        await submitAnswerToServer(
          answers[currentQuestionIndex],
          questions[currentQuestionIndex].title,
          currentQuestionIndex
        );
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  if (whyStatement) {
    return (
      <StyledBody>
        <StyledH1>{t("Your Why Statement")}</StyledH1>
        <p>{whyStatement}</p>
        {!devotionalContent.Title && (
          <StyledButton onClick={handleGenerateDevotional}>
            {t("Generate Devotional")}
          </StyledButton>
        )}
        {isLoading && <LoadingIndicator />}
        {devotionalContent.Title && (
          <div>
            <StyledH1>{devotionalContent.Title}</StyledH1>
            <Subtitle>{t("Bible Passage")}</Subtitle>
            <p>{devotionalContent.BiblePassage}</p>
            <Subtitle>{t("Personalization")}</Subtitle>
            <p>{devotionalContent.Personalization}</p>
            <Subtitle>{t("Journaling Prompt")}</Subtitle>
            <p>{devotionalContent.JournalingPrompt}</p>
          </div>
        )}
      </StyledBody>
    );
  }

  return (
    <div>
      {isLoading ? (
        <div>
          <StyledH1>{t("Generating Your Why Statement")}</StyledH1>
          <LoadingIndicator />
        </div>
      ) : (
        <StyledBody>
          <Label style={{ marginBottom: "10px" }}>
            {questions[currentQuestionIndex]?.title}
          </Label>
          <Subtitle style={{ marginBottom: "20px" }}>
            {questions[currentQuestionIndex]?.subtitle}
          </Subtitle>
          <MultiLineTextInput
            numberOfLines={12}
            value={answers[currentQuestionIndex] || ""}
            onChange={handleInputChange}
            style={{ marginBottom: "20px" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            {currentQuestionIndex > 0 && (
              <StyledButton onClick={handleBack}>
                {t("shared.buttons.back")}
              </StyledButton>
            )}
            <StyledButton
              onClick={handleNext}
              disabled={
                !answers[currentQuestionIndex] ||
                answers[currentQuestionIndex].trim() === ""
              }
            >
              {currentQuestionIndex === questions.length - 1
                ? t("shared.buttons.submit")
                : t("shared.buttons.next")}
            </StyledButton>
          </div>
          <DotIndicator
            totalQuestions={questions.length}
            currentQuestion={currentQuestionIndex}
            answers={answers}
          />
        </StyledBody>
      )}
    </div>
  );
};

export default OnboardingQuestionForm;