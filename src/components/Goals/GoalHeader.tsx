import { GoalTypeAsset } from "@/lib/constants";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../Global/Button";
import { ChevronDownIcon, TriangleDownIcon } from "@radix-ui/react-icons";

type GoalHeaderType = {
  handleFilterChange: (key: string, order: FilterOrder) => void;
};

type ResetState = {
  [key: string]: boolean;
  category: boolean;
  name: boolean;
  status: boolean;
  date: boolean;
};

const OrderButton = ({
  buttonText,
  reset = false,
  onClick,
}: {
  buttonText: string;
  reset?: boolean;
  onClick: (order: FilterOrder) => void;
}) => {
  const [order, setOrder] = useState<FilterOrder>(null);

  useEffect(() => {
    onClick(order);
  }, [order]);

  useEffect(() => {
    setOrder(null);
  }, [reset]);

  const handleClick = () => {
    if (order === null) setOrder("ASC");
    else if (order === "ASC") setOrder("DESC");
    else setOrder(null);
  };

  return (
    <button className="flex items-center gap-1" onClick={handleClick}>
      {buttonText} <TriangleDownIcon />
    </button>
  );
};

const GoalHeader = ({ handleFilterChange }: GoalHeaderType) => {
  const [reset, setReset] = useState<ResetState>({
    category: false,
    name: false,
    status: false,
    date: false,
  });

  const filterChange = (key: string, order: FilterOrder) => {
    handleFilterChange(key, order);

    let tempResest: ResetState = reset;

    Object.keys(tempResest).map((rKey) => {
      if (rKey !== key) tempResest[rKey] = false;
      if (rKey !== key) setReset({ ...reset, [rKey]: true });
    });

    setReset(tempResest);
  };

  return (
    <div className="text-sm font-bold mb-8 pr-8 [&>select]:dark:bg-dark-mode-subtle focus-visible:[&>select]:outline-0 hidden md:grid grid-cols-6 gap-5">
      <div className="col-span-1">
        <OrderButton
          reset={reset["category"]}
          buttonText="Category"
          onClick={(order) => filterChange("category", order)}
        />
      </div>

      <div className="col-span-auto">
        <OrderButton
          reset={reset["name"]}
          buttonText="Goal Name"
          onClick={(order) => filterChange("goal", order)}
        />
      </div>

      <div className="col-start-5 col-span-1">
        <OrderButton
          reset={reset["status"]}
          buttonText="Status"
          onClick={(order) => filterChange("status", order)}
        />
      </div>

      <div className="col-start-6 col-end-6 col-span-1">
        <OrderButton
          reset={reset["date"]}
          buttonText="Date"
          onClick={(order) => filterChange("deadline", order)}
        />
      </div>
    </div>
  );
};

export default GoalHeader;
