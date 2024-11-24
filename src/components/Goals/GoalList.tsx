import { GoalTypeAsset, MaxWindowSize } from "@/lib/constants";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import GoalHeader from "./GoalHeader";
import { useEffect, useState } from "react";
import useWindowSize from "@/lib/hooks/useWindowSize";
import GoalTag from "./GoalTag";
import Link from "next/link";
import { formatDate } from "@/lib/utils-global";

const GoalList = ({
  goals,
  isLarge = true,
}: {
  goals: Goal[];
  isLarge?: boolean;
}) => {
  const [filter, setFilter] = useState<{ key: string; order: FilterOrder }>({
    key: "",
    order: null,
  });

  const convertStatus = (goal: Goal) =>
    goal.isComplete ? "Completed" : "In Progress";

  useEffect(() => {
    const dir = filter.order === "ASC" ? -1 : 1;

    goals.sort((a, b) => {
      const aVal = filter.key !== "status" ? a[filter.key] : convertStatus(a);
      const bVal = filter.key !== "status" ? b[filter.key] : convertStatus(b);

      if (!aVal && bVal) return -1 * dir;
      if (aVal && !bVal) return 1 * dir;
      if (!aVal && !bVal) return 0;

      return aVal.toLowerCase().localeCompare(bVal.toLowerCase()) * dir;
    });
  }, [filter]);

  const { width } = useWindowSize();

  return (
    <>
      {width > MaxWindowSize.Desktop && isLarge && (
        <GoalHeader
          handleFilterChange={(key, order) =>
            setFilter({ key: key, order: order })
          }
        />
      )}

      {goals.map((goal, index) => (
        <Link
          href={`/goals/${goal.doc_id}`}
          className="[&:not(:first-child)]:pt-5 block"
          key={`goal-${index}`}
        >
          <div className="flex justify-between items-center">
            <div
              className={classNames("pr-2 w-full", {
                "lg:grid grid-cols-6 gap-2 lg:gap-5":
                  isLarge && width > MaxWindowSize.Desktop,
                "flex flex-wrap justify-between":
                  !isLarge || width < MaxWindowSize.Desktop,
              })}
            >
              {goal.category && (
                <div
                  className={classNames("col-span-1", {
                    "order-1": !isLarge || width < MaxWindowSize.Desktop,
                  })}
                >
                  <GoalTag category={goal.category} />
                </div>
              )}

              <p
                className={classNames(
                  "text-lg md:text-xl leading-normal col-span-3 tablet-down:order-3 tablet-down:w-full",
                  {
                    "order-3 w-full": !isLarge || width < MaxWindowSize.Desktop,
                  }
                )}
              >
                {goal.goal}
              </p>

              <p
                className={classNames(
                  "leading-normal col-start-5 col-span-1 tablet-down:order-2 dark:text-inactive mobile-only:-mr-6",
                  {
                    "-mr-6 order-1 text-base":
                      !isLarge || width < MaxWindowSize.Desktop,
                    "lg:text-xl": isLarge,
                  }
                )}
              >
                {goal.isComplete ? "Complete" : "In Progress"}
              </p>

              <span
                className={classNames(
                  "leading-normal dark:text-inactive mobile-only:text-sm tablet-down:order-4 tablet-down:w-full",
                  {
                    "col-start-6 col-end-6 col-span-1 lg:text-xl text-lg":
                      isLarge,
                    "text-inactive": !goal.deadline,
                    "order-4 w-full ":
                      !isLarge || width < MaxWindowSize.Desktop,
                  }
                )}
              >
                {goal.deadline ? formatDate(goal.deadline) : "No Date"}
              </span>
            </div>

            <ChevronRightIcon width={24} height={24} className="text-primary" />
          </div>

          {index < goals.length - 1 && (
            <div className="w-full h-[1px] bg-gradient-1 mt-5"></div>
          )}
        </Link>
      ))}
    </>
  );
};

export default GoalList;
