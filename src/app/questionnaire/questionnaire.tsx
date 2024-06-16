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
    <section className="bg-black min-h-screen flex items-center justify-center"> {/* Black background for the entire component */}
      <div className="w-full bg-black rounded-lg shadow border border-white sm:max-w-md xl:p-0"> {/* Form with white border */}
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-blue-800">
            Questionnaire
          </h1>
          <FormComponent questions={questions} />
        </div>
      </div>
    </section>
  );
};

export default Questionnaire;
