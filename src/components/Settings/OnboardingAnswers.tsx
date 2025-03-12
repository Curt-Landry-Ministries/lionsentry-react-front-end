import { useUserStore } from "@/app/providers/userContext";
import LoadingScreen from "../Global/LoadingScreen";

const OnboardingAnswers = () => {
  const { onboardingAnswers, questions, isLoading } = useUserStore((s) => s);

  return (
    <div className="flex flex-col">
      <h3 className="mb-8">Onboarding Answers</h3>

      {isLoading ? (
        <LoadingScreen message="Loading your answers" />
      ) : (
        <div className="flex flex-col gap-5">
          {onboardingAnswers.map((answer, index) => (
            <div
              className="bg-cloud-dark flex flex-col p-6 rounded text-black"
              key={`answer-${answer.questionIndex}`}
            >
              <div className="font-semibold mb-2">{`${
                answer.questionIndex + 1
              }. ${answer.question}`}</div>

              <p>{questions[index].subtitle}</p>

              <div className="border border-cloud-darker bg-white rounded px-3 py-2 mt-5">
                {answer.answers[0]["answer"]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OnboardingAnswers;
