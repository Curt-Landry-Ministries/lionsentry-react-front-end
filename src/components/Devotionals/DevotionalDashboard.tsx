import { AuthedPaths } from "@/lib/constants";
import Link from "next/link";
import { DetailedHTMLProps } from "react";
import DevotionalNone from "./DevotionalNone";
import classNames from "classnames";
import DevotionalFavorite from "./DevotionalFavorite";
import Image from "next/image";
import DevotionalTools from "./DevotionalTools";
import { useDevotional } from "@/lib/hooks/useDevotional";
import Button from "../Global/Button";

export type DevotionalDashboard = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  devotional: Devotional;
  showNone?: boolean;
};
const DevotionalDashboard: React.FC<DevotionalDashboard> = ({
  devotional,
  showNone = false,
  ...props
}) => {
  const { devotionalDate, isTodayDevotional, isNewFormat, devotionalHeader } =
    useDevotional(devotional);

  return (
    <div {...props}>
      <div
        className={classNames("title-line-style", {
          "pb-7": !showNone,
          "pb-3": showNone,
        })}
      >
        <div className="flex w-full justify-between items-top">
          <div>
            <h3 className="w-full mb-1">
              {devotional?.title && !isTodayDevotional
                ? devotional?.title
                : "Today's Devotional"}
            </h3>
            {devotional && devotional.dateTimeCreated && (
              <span className="block text-inactive">
                {devotionalDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
          <Link
            href={AuthedPaths.Devotionals}
            className="link-style ml-auto flex-shrink-0 pl-2"
          >
            <Button standardBtn="text">See All</Button>
          </Link>
        </div>
      </div>

      <div className="mt-10">
        {devotional && devotional.introduction && (
          <p>{devotional.introduction}</p>
        )}
        {devotional && devotional.journalingPrompt && (
          <p>{devotional.journalingPrompt}</p>
        )}
      </div>

      <div className="mt-10">
        {showNone ? (
          <DevotionalNone />
        ) : (
          <>
            {devotional && (
              <div className="space-y-5">
                <div className="bg-cloud-dark text-black p-5 mb-16 rounded-md">
                  <p className="font-bold text-center">
                    {devotional.verse
                      ? devotional.verse
                      : devotional.biblePassage}
                  </p>
                </div>

                {isNewFormat ? (
                  <div className="grid grid-cols-1 gap-8">
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

      {devotional && (
        <div className="mt-12">
          <DevotionalTools devotional={devotional} />
        </div>
      )}
    </div>
  );
};

export default DevotionalDashboard;
