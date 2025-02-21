import { useUserStore } from "@/app/providers/userContext";
import Image from "next/image";
import QuestionnaireVideos from "./QuestionnaireVideos";
import VideoComponent from "../Global/VideoComponent";

export type QuestionnaireStepType = {
  index: number;
  item: Question;
  currentAnswer: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const QuestionnaireStep: React.FC<QuestionnaireStepType> = ({
  index,
  item,
  currentAnswer,
  onChange,
}: QuestionnaireStepType) => {
  const { name } = useUserStore((s) => s);
  const inputStyle =
    "border border-cloud-darker bg-white dark:bg-dark-mode-subtle dark:border-dark-mode-strong w-full py-2 px-3 rounded";
  const videoContainerStyle =
    "md:max-w-[90vw] lg:max-w-[950px] mx-auto [&>iframe]:min-h-[calc(100vw*0.6)] md:[&>iframe]:min-h-[calc(100vw*0.48)] lg:[&>iframe]:min-h-[480px] [&>iframe]:w-full [&>iframe]:pb-8";

  return (
    <div className="z-10 relative">
      {index > -1 && item ? (
        <>
          {QuestionnaireVideos[index] && (
            <VideoComponent
              videoSrc={QuestionnaireVideos[index]}
              videoTitle={`Question ${index + 1} Video`}
              className={videoContainerStyle}
            />
          )}

          <div className="flex gap-5 mb-5">
            <Image
              src="/images/question-icon.svg"
              height={50}
              width={50}
              alt="Question Icon"
            />

            <div>
              <p className="font-semibold">{item.title}</p>
              <p>{item.subtitle}</p>
            </div>
          </div>

          <textarea
            className={inputStyle}
            rows={8}
            placeholder="Write answer here"
            onChange={onChange}
            value={currentAnswer}
          />
        </>
      ) : (
        <>
          <h2 className="pb-8">Welcome, {name()}!</h2>
          <VideoComponent
            videoSrc="https://player.manage.broadcastcloud.tv/1efa826f-79d3-6084-a301-ff6683206c46/default?autoplay=false&debug=false&direct=true"
            videoTitle={`Welcome Video`}
            className={videoContainerStyle}
          />
          <div className="space-y-3">
            <p>I&apos;m excited to be on this journey with you.</p>
            <p>
              The first thing is developing your personal mission statement—your
              “why.”
            </p>
            <p>
              Your “why” is the foundational piece that will provide direction
              and help you establish attainable goals and overcome challenges to
              become the best version of yourself.
            </p>
            <p>
              Don&apos;t overthink it. Once you click “start,” you&apos;ll go
              through a series of questions, don&apos;t overthink it.
              There&apos;s no right or wrong answer. Just jot down the first
              things that come to mind.
            </p>
            <p>
              The point of this process is to simply draw out what God has
              deposited in you, how you are uniquely created, and to determine
              where you are most passionate.
            </p>
            <p>Let&apos;s get started!</p>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionnaireStep;
