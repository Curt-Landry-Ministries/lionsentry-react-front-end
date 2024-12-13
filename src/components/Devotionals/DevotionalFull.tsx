import { AuthedPaths } from "@/lib/constants";
import Link from "next/link";
import { DetailedHTMLProps } from "react";
import DevotionalNone from "./DevotionalNone";
import classNames from "classnames";
import DevotionalGenerateModal from "./DevotionalGenerateModal";
import DevotionalFavorite from "./DevotionalFavorite";
import Image from "next/image";
import { useDevotional } from "@/lib/hooks/useDevotional";

export type DevotionalFull = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  devotional: Devotional;
  showNone?: boolean;
  inDashboard?: boolean;
};
const DevotionalFull: React.FC<DevotionalFull> = ({
  devotional,
  showNone = false,
  inDashboard = false,
  ...props
}) => {
  const { devotionalDate, isNewFormat, devotionalHeader } =
    useDevotional(devotional);

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
        "max-w-5xl mx-auto px-4": !inDashboard,
      })}
      {...props}
    >
      <div
        className={classNames(
          "title-line-style center-line content-container mx-auto",
          {
            "pb-7": !showNone,
            "pb-3": showNone,
          }
        )}
      >
        <div>
          <div className="flex w-full justify-between items-center">
            {devotional && devotional.dateTimeCreated && (
              <span className="text-white block">
                {new Date(devotional.dateTimeCreated).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </span>
            )}
            {!showNone && (
              <DevotionalFavorite
                isFavorite={devotional?.isFavorite}
                doc_id={devotional?.doc_id}
              />
            )}
          </div>

          <h3 className="w-full text-center mb-5">
            {devotional?.title ? devotional?.title : "Today's Devotional"}
          </h3>

          {devotional && devotional.introduction && (
            <p className="text-center">{devotional.introduction}</p>
          )}

          {devotional && devotional.journalingPrompt && (
            <p className="text-center">{devotional.journalingPrompt}</p>
          )}

          {inDashboard && (
            <Link
              href={AuthedPaths.Devotionals}
              className="link-style ml-auto flex-shrink-0 pl-2"
            >
              See All
            </Link>
          )}
        </div>
      </div>

      <div className="mt-10">
        {showNone ? (
          <DevotionalNone />
        ) : (
          <>
            {devotional && (
              <div className="space-y-5">
                <p className="font-bold text-center mb-16">
                  {devotional.verse
                    ? devotional.verse
                    : devotional.biblePassage}
                </p>
                {isNewFormat ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7 [&>.devotional-box]:bg-white [&>.devotional-box]:p-4 [&>.devotional-box]:rounded-2xl text-black">
                    {Object.keys(devotionalHeader).map((key) => (
                      <div
                        className="devotional-box"
                        key={`devotional-box-${key}`}
                      >
                        <div className="flex items-center gap-1">
                          <Image
                            src={devotionalHeader[key].icon}
                            width={60}
                            height={60}
                            alt={`devotional-icon-${key}`}
                          />
                          <h3>{devotionalHeader[key].title}</h3>
                        </div>
                        <div className="h-[1px] w-full bg-gradient-1 flex-1 my-4" />

                        <p>{devotional[key as keyof Devotional]}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  devotional.personalization && (
                    <p className="text-center">{devotional.personalization}</p>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-12 mx-4">
        <div className="h-[1px] w-full bg-gradient-1 flex-1" />
        <div className="py-8 flex justify-between">
          <DevotionalTools />
          {!inDashboard && <DevotionalGenerateModal />}
        </div>
      </div>
    </div>
  );
};

export default DevotionalFull;
