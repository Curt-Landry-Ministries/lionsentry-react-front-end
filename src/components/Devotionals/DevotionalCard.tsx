import Link from "next/link";
import { DetailedHTMLProps, useEffect, useState } from "react";
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
};
const DevotionalCard: React.FC<DevotionalCard> = ({
  devotional,
  index,
  showNone = false,
  ...props
}) => {
  const devotionalDate = devotional && new Date(devotional.dateTimeCreated);
  const todayDate = new Date();

  return (
    <div
      className={classNames(
        "bg-white dark:bg-opacity-10 dark:shadow-none shadow-content-box px-7 py-8 rounded-md relative flex flex-col"
      )}
      {...props}
    >
      {!showNone && (
        <DevotionalFavorite
          doc_id={devotional?.doc_id}
          isFavorite={devotional?.isFavorite}
          isCard={true}
        />
      )}

      <div
        className={classNames("title-line-style", {
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
          <span className="text-inactive block">
            {new Date(devotional.dateTimeCreated).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        )}
      </div>

      <div className="mt-7 flex flex-col flex-1 justify-between">
        {showNone ? (
          <DevotionalNone />
        ) : (
          <>
            {devotional && (
              <>
                <p>
                  {devotional.journalingPrompt &&
                    devotional.journalingPrompt.substring(0, 250) + " ..."}
                </p>

                <Link href={`/devotionals/${devotional.doc_id}`}>
                  <Button standardBtn={"text"} className="text-primary flex-1">
                    Read More
                  </Button>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DevotionalCard;
