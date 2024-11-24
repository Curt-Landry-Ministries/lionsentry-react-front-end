import { AuthedPaths } from "@/lib/constants";
import Link from "next/link";
import { DetailedHTMLProps, useState } from "react";
import DevotionalNone from "./DevotionalNone";
import classNames from "classnames";
import Heart from "../Global/Heart";
import DevotionalGenerateModal from "./DevotionalGenerateModal";
import DevotionalFavorite from "./DevotionalFavorite";

export type DevotionalFull = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  devotional?: Devotional;
  showNone?: boolean;
  inDashboard?: boolean;
};
const DevotionalFull: React.FC<DevotionalFull> = ({
  devotional,
  showNone = false,
  inDashboard = false,
  ...props
}) => {
  const devotionalDate = devotional && new Date(devotional.dateTimeCreated);
  const todayDate = new Date();

  const [favorite, setFavorite] = useState(false); // Temp solution to show fav

  const handleFavorite = () => {
    alert("favorite a devotional");
    setFavorite(!favorite);
  };

  const DevotionalTools = () => {
    return (
      <div>
        <DevotionalFavorite
          isFavorite={devotional?.isFavorite}
          doc_id={devotional?.doc_id}
        />
      </div>
    );
  };

  return (
    <div
      className={classNames({
        "bg-white dark:bg-opacity-10 dark:shadow-none shadow-content-box p-7 rounded-md relative":
          inDashboard,
        "content-container": !inDashboard,
      })}
      {...props}
    >
      <div
        className={classNames("title-line-style", {
          "pb-7": !showNone,
          "pb-3": showNone,
        })}
      >
        <div className="flex items-top">
          <h3>
            {devotional?.title ? devotional?.title : "Today's Devotional"}
          </h3>
          {(devotionalDate &&
            devotionalDate.setHours(0, 0, 0, 0) ===
              todayDate.setHours(0, 0, 0, 0)) ||
            showNone}

          {inDashboard && (
            <Link
              href={AuthedPaths.Devotionals}
              className="link-style ml-auto flex-shrink-0 pl-2"
            >
              See All
            </Link>
          )}
        </div>
        {devotional && devotional.dateTimeCreated && (
          <span className="text-inactive block">
            {new Date(devotional.dateTimeCreated).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        )}

        {!showNone && (
          <div className="w-full mt-6">
            <DevotionalTools />
          </div>
        )}
      </div>

      <div className="mt-7">
        {showNone ? (
          <DevotionalNone />
        ) : (
          <>
            {devotional && (
              <>
                <p>{devotional.journalingPrompt}</p>
                <p className="font-bold my-5">{devotional.biblePassage}</p>
                <p>{devotional.personalization}</p>
              </>
            )}
          </>
        )}
      </div>

      {!inDashboard && (
        <div className="border-t border-cloud-darker mt-8 py-8 flex justify-between">
          <DevotionalTools />
          <DevotionalGenerateModal />
        </div>
      )}
    </div>
  );
};

export default DevotionalFull;
