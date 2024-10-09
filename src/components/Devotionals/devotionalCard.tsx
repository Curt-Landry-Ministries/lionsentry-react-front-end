import { DetailedHTMLProps } from "react";

export type DevotionalCard = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  devotional: DevotionalContent;
};
const DevotionalCard: React.FC<DevotionalCard> = ({ devotional, ...props }) => {
  return (
    <div
      className="group text-left border rounded-md p-4 flex flex-col cursor-pointer shadow hover:shadow-sm hover:shadow-slate-400 dark:hover:shadow-slate-100  transition ease-in-out duration-100"
      {...props}
    >
      <h4 className="font-bold mb-2">{devotional.Title}</h4>
      <h5 className="text-xs mb-2">Generated Time: {devotional.TimeStamp}</h5>

      <button className="inline font-bold text-left mt-auto gradient-text group-hover:gradient-bg-reverse">
        Click to view
      </button>
    </div>
  );
};

export default DevotionalCard;
