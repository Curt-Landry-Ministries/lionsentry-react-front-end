import { GoalTypeAsset } from "@/lib/constants";

const GoalTag = ({ category }: { category: any }) => {
  return (
    category &&
    GoalTypeAsset[category as keyof typeof GoalTypeAsset] && (
      <span
        className={`text-white min-w-[106px] max-w-[120px] inline-block text-center rounded font-semibold leading-normal mb-1 bg-${
          GoalTypeAsset[category as keyof typeof GoalTypeAsset].color
        }`}
      >
        {category}
      </span>
    )
  );
};

export default GoalTag;
