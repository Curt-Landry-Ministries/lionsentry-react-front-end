import React from "react";
import Dot from "../atoms/Dot";

interface DotIndicatorProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: string[];
}

const DotIndicator: React.FC<DotIndicatorProps> = ({
  totalQuestions,
  currentQuestion,
  answers,
}) => (
  <div>
    {Array.from({ length: totalQuestions }).map((_, index) => {
      let status;
      if (index === currentQuestion) status = "current";
      else if (answers[index]) status = "answered";
      else status = "unanswered";
      return <Dot key={index} $status={status} />;
    })}
  </div>
);

export default DotIndicator;
