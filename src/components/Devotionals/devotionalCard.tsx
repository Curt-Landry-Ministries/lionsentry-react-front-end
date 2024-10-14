import { AuthedPaths } from "@/lib/constants";
import Link from "next/link";
import { DetailedHTMLProps } from "react";
import DevotionalNone from "./DevotionalNone";
import classNames from "classnames";

export type DevotionalCard = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  devotional?: Devotional;
  showNone?: boolean;
  hasAll?: boolean;
};
const DevotionalCard: React.FC<DevotionalCard> = ({
  devotional,
  showNone = false,
  hasAll = false,
  ...props
}) => {
  const devotionalDate = devotional && new Date(devotional.dateTimeCreated);
  const todayDate = new Date();

  return (
    <div
      className="bg-white dark:bg-opacity-10 dark:shadow-none shadow-content-box p-7 rounded-md"
      {...props}
    >
      <div
        className={classNames("title-line-style", {
          "pb-7": !showNone,
          "pb-3": showNone,
        })}
      >
        <div className="flex items-center">
          {((devotionalDate &&
            devotionalDate.setHours(0, 0, 0, 0) ===
              todayDate.setHours(0, 0, 0, 0)) ||
            showNone) && <h3>Today&apos;s Devotional</h3>}

          {hasAll && !showNone && (
            <Link href={AuthedPaths.Devotionals} className="link-style ml-auto">
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
    </div>
  );
};

export default DevotionalCard;
