"use client";

import { useEffect, useState } from "react";
import Questionnaire from "./questionnaire";
import LoadingScreen from "@/components/Global/LoadingScreen";
import { fetchQuestionsFromServer } from "@/lib/app/actions";
import { useUserStore } from "@/app/providers/userContext";
import { useRouter } from "next/navigation";
import { AuthedPaths } from "@/lib/constants";

const Pages: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const { whyStatements, isLoading } = useUserStore((s) => s);
  const router = useRouter();

  useEffect(() => {
    const getQuestions = async () => {
      const data = await fetchQuestionsFromServer();
      if (data.success) setQuestions(data.value);
      setLoading(false);
    };

    getQuestions();
  }, []);

  useEffect(() => {
    if (!isLoading && whyStatements.length > 0)
      router.push(AuthedPaths.Dashboard);
  }, [whyStatements]);

  return (
    <div className="flex flex-col w-full bg-cloud dark:bg-black">
      <section className="flex items-center justify-center min-h-screen flex-shrink-0 flex-1">
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
