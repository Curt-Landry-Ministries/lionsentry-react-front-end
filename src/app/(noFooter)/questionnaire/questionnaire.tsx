// src/app/pages/index.tsx
import { GetStaticProps } from "next";
import QuestionnaireForm from "../../../components/Questionnaire/QuestionnaireForm";
import { fetchQuestionsFromServer } from "@/lib/app/actions";

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchQuestionsFromServer();

  return {
    props: data,
  };
};

const Questionnaire: React.FC<{ questions: Question[] }> = ({ questions }) => {
  return <QuestionnaireForm questions={questions} />;
};

export default Questionnaire;
