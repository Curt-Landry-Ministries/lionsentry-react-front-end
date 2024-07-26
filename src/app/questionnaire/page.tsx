// src/app/page.tsx

"use client";

import { useEffect, useState } from "react";
import Questionnaire from "./questionnaire";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import LoadingScreen from "@/components/loading";
import { fetchQuestionsFromServer } from "@/api/app";

export interface Question {
  id: number;
  title: string;
  subtitle: string;
}

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
      {" "}
      {/* Apply black background to the entire component */}
      <Navbar />
      <section className="flex items-center justify-center h-screen flex-shrink-0 flex-1">
        {loading ? (
          <LoadingScreen message="Loading your questionaire" />
        ) : (
          <Questionnaire questions={questions} />
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Pages;
