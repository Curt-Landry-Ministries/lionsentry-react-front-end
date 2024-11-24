import { GoalTypeAsset } from "@/lib/constants";
import GoalTag from "./GoalTag";
import DateInput from "../Global/DateInput";

export type GoalOnboardingStep = {
  index: number;
  currentAnswer: Pick<Goal, "goal" | "description" | "category" | "deadline">;
  onChange: (
    answer: Pick<Goal, "goal" | "description" | "category" | "deadline">
  ) => void;
};

const GoalOnboardingStep: React.FC<GoalOnboardingStep> = ({
  index,
  currentAnswer,
  onChange,
}: GoalOnboardingStep) => {
  const inputStyle =
    "border border-cloud-darker bg-white dark:bg-dark-mode-subtle dark:border-dark-mode-strong w-full py-2 px-3 rounded";

  const handleChange = (
    key: "description" | "goal" | "deadline",
    value: string
  ) => {
    onChange({ ...currentAnswer, [key]: value });
  };

  return (
    <div className="[&>iframe]:w-full [&>iframe]:min-h-[250px] md:[&>iframe]:min-h-[500px] [&>iframe]:pb-8 z-10 relative flex flex-col gap-8">
      <div>
        <GoalTag category={currentAnswer["category"]} />
        <p className="italic">
          {GoalTypeAsset[currentAnswer["category"]].description}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Goal Title</p>
        <input
          type="text"
          placeholder="Give this goal a short title"
          value={currentAnswer.goal}
          onChange={(e) => handleChange("goal", e.currentTarget.value)}
          className={inputStyle}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Goal Description</p>
        <p>
          What is the goal? What is the one small, repeatable action I can do
          daily to get me there? (
          <span className="font-bold">specific action, time of day</span> I will
          do it, and <span className="font-bold">location</span>)
        </p>
        <textarea
          className={inputStyle}
          rows={4}
          placeholder={`My ${currentAnswer.category.toLowerCase()} goal is...`}
          onChange={(e) => handleChange("description", e.currentTarget.value)}
          value={currentAnswer.description}
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold">Select Date</p>

        <DateInput
          selected={
            (currentAnswer.deadline &&
              new Date(currentAnswer.deadline).toLocaleDateString()) ||
            null
          }
          onChange={(val: string) => {
            handleChange("deadline", val);
          }}
          placeholder="Select Date"
          containerClass={inputStyle}
          minDate={new Date()}
        />
      </div>
    </div>
  );
};

export default GoalOnboardingStep;
