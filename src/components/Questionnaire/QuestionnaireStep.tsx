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

  return (
    <div className="z-10 relative">
      {index > -1 && item ? (
        <>
          {QuestionnaireVideos[index] && (
            <VideoComponent
              videoSrc={QuestionnaireVideos[index]}
              videoTitle={`Question ${index + 1} Video`}
              className="[&>iframe]:w-full [&>iframe]:min-h-[230px] md:[&>iframe]:min-h-[300px] lg:[&>iframe]:min-h-[480px] [&>iframe]:pb-8"
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
            className="[&>iframe]:w-full [&>iframe]:min-h-[230px] md:[&>iframe]:min-h-[300px] lg:[&>iframe]:min-h-[480px] [&>iframe]:pb-8"
          />

          <p>First thing we want to do is create your purpose statement.</p>

          <p>Text to be written about this TBD.</p>
        </>
      )}
    </div>
  );
};

export default QuestionnaireStep;
