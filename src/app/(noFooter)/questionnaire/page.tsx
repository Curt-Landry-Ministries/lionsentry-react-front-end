// import { useEffect, useState } from "react";
import LoadingScreen from "@/components/Global/LoadingScreen";
import {
  fetchAnswersFromServer,
  fetchQuestionsFromServer,
} from "@/lib/app/actions";

import QuestionnaireForm from "@/components/Questionnaire/QuestionnaireForm";

// export const getStaticProps: GetStaticProps = async () => {
//   const data = await fetchQuestionsFromServer();

//   return {
//     props: { data.value },
//   };
// };

const Pages: React.FC = async () => {
  // const [questions, setQuestions] = useState<Question[]>([]);
  // const [loading, setLoading] = useState(true);

  // const { whyStatements, isLoading } = useUserStore((s) => s);
  // const router = useRouter();

  // useEffect(() => {
  //   console.log("in here outside");
  //   const getQuestions = async () => {
  //     const data = await fetchQuestionsFromServer();
  //     console.log("in here inside");
  //     console.log(data);

  //     if (data.success) {
  //       setQuestions(data.value);
  //       setLoading(false);
  //     }
  //   };

  //   getQuestions();
  // }, []);

  // useEffect(() => {
  //   if (!isLoading && whyStatements.length > 0)
  //     router.push(AuthedPaths.Dashboard);
  // }, [whyStatements]);

  const questionData = await fetchQuestionsFromServer();
  // const answerData = await fetchAnswersFromServer();

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
