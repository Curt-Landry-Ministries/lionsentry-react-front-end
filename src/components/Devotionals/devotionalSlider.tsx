import { DevotionalContent } from "@/api/app";
import { DetailedHTMLProps } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import classNames from "classnames";

export type DevotionalSliderProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  devotionals: DevotionalContent[];
  current: number;
  onChange: (index: number) => void;
};
const DevotionalSlider: React.FC<DevotionalSliderProps> = ({
  devotionals,
  current,
  onChange,
  ...props
}) => {
  const handleChange = (dir: number) => {
    const nextStep = dir + current;
    if (nextStep >= 0 && nextStep < devotionals.length) {
      onChange(current + dir);
    }
  };

  return (
    <div className="relative h-full overflow-hidden md:px-4 px-2">
      {devotionals.length > 1 && (
        <button
          onClick={() => handleChange(-1)}
          disabled={current === 0}
          className={classNames("absolute -left-3 top-1/2 text-black", {
            "opacity-50": current === 0,
          })}
        >
          <ChevronLeftIcon className="h-10 w-10" />
        </button>
      )}
      <div className="flex h-full overflow-scroll" {...props}>
        <div className="flex flex-col gap-4 p-4">
          <h2 className="font-semibold text-2xl">
            {devotionals[current].Title}
          </h2>
          <h3 className="font-semibold text-lg gradient-bottom-border">
            Bible Passage
          </h3>
          <p>{devotionals[current].BiblePassage}</p>
          <h3 className="font-semibold text-lg gradient-bottom-border">
            Personalization
          </h3>
          <p>{devotionals[current].Personalization}</p>
          <h3 className="font-semibold text-lg gradient-bottom-border">
            Journaling Prompt
          </h3>
          <p>{devotionals[current].JournalingPrompt}</p>
        </div>
      </div>
      {devotionals.length > 1 && (
        <button
          onClick={() => handleChange(1)}
          disabled={current === devotionals.length - 1}
          className={classNames("absolute -right-3 top-1/2 text-black", {
            "opacity-50": current === devotionals.length - 1,
          })}
        >
          <ChevronRightIcon className="h-10 w-10" />
        </button>
      )}
    </div>
  );
};

export default DevotionalSlider;
