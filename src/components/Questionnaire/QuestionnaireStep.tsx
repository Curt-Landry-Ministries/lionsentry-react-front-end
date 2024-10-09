import Image from "next/image";

export type QuestionnaireStepType = {
  index: number;
  numberOfQues: number;
  item: Question;
  currentAnswer: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const QuestionnaireStep: React.FC<QuestionnaireStepType> = ({
  index,
  numberOfQues,
  item,
  currentAnswer,
  onChange,
}: QuestionnaireStepType) => {
  return (
    <div className="[&>iframe]:w-full [&>iframe]:min-h-[250px] md:[&>iframe]:min-h-[500px] [&>iframe]:pb-8 z-10 relative">
      {index > -1 && item ? (
        <>
          <iframe
            src="https://www.youtube.com/embed/u31qwQUeGuM?si=hQpRtxns7WLx-KE1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <p className="mb-8">
            Question {index + 1}/{numberOfQues}
          </p>

          <div className="flex gap-5 mb-5">
            <Image
              src="/images/question-icon.svg"
              height={50}
              width={50}
              alt="Question Icon"
            />

            <div>
              <p>{item.title}</p>
              <p>{item.subtitle}</p>
            </div>
          </div>

          <textarea
            className="border w-full bg-white text-black py-2 px-3"
            rows={8}
            placeholder="Write answer here"
            onChange={onChange}
            value={currentAnswer}
          />
        </>
      ) : (
        <>
          <h2 className="pb-8">Welcome, Paul</h2>
          <iframe
            src="https://www.youtube.com/embed/u31qwQUeGuM?si=hQpRtxns7WLx-KE1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />

          <p>First thing we want to do is create your purpose statement.</p>

          <p>Text to be written about this TBD.</p>
        </>
      )}
    </div>
  );
};

export default QuestionnaireStep;
