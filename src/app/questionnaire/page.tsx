// src/app/page.tsx

"use client";

import { useEffect, useState } from "react";
import Questionnaire from "./questionnaire";
import { fetchQuestions } from "../../data/fetchQuestions";
import { Question } from "../../data/questions";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const Pages: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuestions = async () => {
      const data = await fetchQuestions();
      setQuestions(data.questions);
      setLoading(false);
    };

    getQuestions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {" "}
      {/* Apply black background to the entire component */}
      <Navbar />
      <Questionnaire questions={questions} />
      <Footer />
    </div>
  );
};

export default Pages;
