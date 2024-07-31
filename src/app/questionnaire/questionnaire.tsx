// src/app/pages/index.tsx

import { GetStaticProps } from "next";
import FormComponent from "../../components/form";
import { fetchQuestionsFromServer } from "@/api/app";
import { Question } from "./page";

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
