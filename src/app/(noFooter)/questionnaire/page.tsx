// import { useEffect, useState } from "react";
import LoadingScreen from "@/components/Global/LoadingScreen";
import { fetchQuestionsFromServer } from "@/lib/app/actions";

import QuestionnaireForm from "@/components/Questionnaire/QuestionnaireForm";

const Pages: React.FC = async () => {
  const questionData = await fetchQuestionsFromServer();

  return (
    <div className="flex flex-col w-full bg-cloud dark:bg-black">
      <section className="flex items-center justify-center min-h-screen flex-shrink-0 flex-1">
        {!questionData.success ? (
          <LoadingScreen message="Loading your questionaire" />
        ) : (
          <QuestionnaireForm questions={questionData.value} />
        )}
      </section>
    </div>
  );
};

export default Pages;
