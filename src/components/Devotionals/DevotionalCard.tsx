import Link from "next/link";
import { DetailedHTMLProps } from "react";
import DevotionalNone from "./DevotionalNone";
import classNames from "classnames";
import Button from "../Global/Button";
import DevotionalFavorite from "./DevotionalFavorite";

export type DevotionalCard = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  devotional?: Devotional;
  index?: number;
  showNone?: boolean;
  hideGenerateButton?: boolean;
};
const DevotionalCard: React.FC<DevotionalCard> = ({
  devotional,
  index,
  showNone = false,
  hideGenerateButton = false,
  ...props
}) => {
  const devotionalDate = devotional && new Date(devotional.dateTimeCreated);
  const todayDate = new Date();

  return (
    <div
      className={classNames(
        "bg-navy text-white dark:shadow-none shadow-content-box px-7 py-8 rounded-md relative flex flex-col"
      )}
      {...props}
    >
      <div className="bg-gradient-6 w-full h-1/4 absolute top-0 left-0 -rotate-180 [mask-image:theme(backgroundImage.gradient-3)] dark:[mask-image:theme(backgroundImage.gradient-3-dark)] [mask-type:alpha] z-0">
        <div className="bg-gradient-4 [mask-type:alpha] w-full h-full -rotate-180"></div>
      </div>

      <div
        className={classNames("title-line-style z-10", {
          "pb-7": !showNone,
          "pb-3": showNone,
        })}
      >
        <div className="flex items-center">
          <h3>{devotional?.title}</h3>
          {(devotionalDate &&
            devotionalDate.setHours(0, 0, 0, 0) ===
              todayDate.setHours(0, 0, 0, 0)) ||
            showNone}
        </div>
        {devotional && devotional.dateTimeCreated && (
          <span className="block">
            {new Date(devotional.dateTimeCreated).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        )}
      </div>

      <div className="mt-7 flex flex-col flex-1 justify-between z-10">
        {showNone ? (
          <DevotionalNone hideButton={hideGenerateButton} />
        ) : (
          <>
            {devotional && (
              <>
                {devotional.introduction && <p>{devotional.introduction}</p>}
                {devotional.journalingPrompt && (
                  <p>
                    {devotional.journalingPrompt.substring(0, 250) + " ..."}
                  </p>
                )}
                <Link href={`/devotionals/${devotional.doc_id}`}>
                  <Button
                    standardBtn={"text"}
                    className="text-primary flex-1 py-5"
                  >
                    Read More
                  </Button>
                </Link>
              </>
            )}
          </>
        )}
      </div>

      {!showNone && (
        <DevotionalFavorite
          doc_id={devotional?.doc_id}
          isFavorite={devotional?.isFavorite}
        />
      )}
    </div>
  );
};

export default DevotionalCard;
