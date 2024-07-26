// src/app/pages/index.tsx

import { GetStaticProps } from "next";
import FormComponent from "../../components/form";
import { Question } from "../../data/questions";
import { fetchQuestionsFromServer } from "@/api/app";

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchQuestionsFromServer();

  return {
    props: data,
  };
};

const Questionnaire: React.FC<{ questions: Question[] }> = ({ questions }) => {
  return <FormComponent questions={questions} />;
};

export default Questionnaire;
