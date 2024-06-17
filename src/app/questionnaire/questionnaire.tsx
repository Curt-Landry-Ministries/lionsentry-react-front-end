// src/app/pages/index.tsx

import { GetStaticProps } from 'next';
import FormComponent from '../../components/form';
import { fetchQuestions } from '../../data/fetchQuestions';
import { Question } from '../../data/questions';


export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchQuestions();
  return {
    props: data,
  };
};

const Questionnaire: React.FC<{ questions: Question[] }> = ({ questions }) => {
  return (
    <FormComponent questions={questions} />
  );
};

export default Questionnaire;
