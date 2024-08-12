"use client";

import { useEffect, useState } from "react";
import Questionnaire from "./questionnaire";
import LoadingScreen from "@/components/Global/LoadingScreen";
import { fetchQuestionsFromServer } from "@/lib/app/actions";

const Pages: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuestions = async () => {
      const data = await fetchQuestionsFromServer();

      setQuestions(data);
      setLoading(false);
    };

    getQuestions();
  }, []);

  return (
    <div className="min-h-screen flex flex-col page-gradient-bg dark:page-gradient-bg-dark">
      <section className="flex items-center justify-center h-screen flex-shrink-0 flex-1">
        {loading ? (
          <LoadingScreen message="Loading your questionaire" />
        ) : (
          <Questionnaire questions={questions} />
        )}
      </section>
    </div>
  );
};

export default Pages;
