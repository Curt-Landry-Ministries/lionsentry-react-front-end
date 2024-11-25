import { GoalTypeAsset } from "@/lib/constants";
import Modal from "../Global/Modal";
import GoalTag from "./GoalTag";
import { useUserStore } from "@/app/providers/userContext";
import Button from "../Global/Button";
import { useGoals } from "@/lib/hooks/useGoals";

const GoalCompleteModal = ({
  goalId,
  isOpen,
  updateIsOpen,
}: {
  goalId: string;
  isOpen: boolean;
  updateIsOpen: (open: boolean) => void;
}) => {
  const { name } = useUserStore((s) => s);

  const { currentGoal, updateGoalHook } = useGoals(goalId);

  const handleComplete = async () => {
    updateGoalHook({
      isComplete: true,
    });

    updateIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => updateIsOpen(false)}>
      <div className="max-w-sm">
        <div
          className={`bg-${
            GoalTypeAsset[currentGoal.category].color
          }-fade dark:bg-${
            GoalTypeAsset[currentGoal.category].color
          }-dark py-8 px-5 rounded-lg mb-5`}
        >
          <div className="max-w-md gap-2 flex flex-col items-center mx-auto text-center">
            <GoalTag category={currentGoal.category} />
            <h3>{currentGoal.goal}</h3>
          </div>
        </div>
        <p className="mb-12">
          Hey {name()}, we just want to confirm that you&apos;d like to mark
          this goal as &quot;complete&quot;?
        </p>
        <Button
          standardBtn={"primary"}
          className="w-full mb-2"
          onClick={handleComplete}
        >
          Yes, Goal Is Complete!
        </Button>
        <Button
          standardBtn={"secondary"}
          className="w-full dark:bg-black"
          onClick={() => updateIsOpen(false)}
        >
          Still working on it
        </Button>
      </div>
    </Modal>
  );
};

export default GoalCompleteModal;
