import { useUserStore } from "@/app/providers/userContext";
import { useEffect, useMemo } from "react";
import { updateGoal } from "../app/actions";

export const useGoals = (goalId: string = "") => {
  const { goals, getGoals } = useUserStore((s) => s);

  useEffect(() => {
    getGoals();
  }, []);

  const currentGoal = useMemo(() => {
    return goals.filter((goal) => goal.doc_id === goalId)[0];
  }, [goals, goalId]);

  const updateGoalHook = async (updatedFields: Partial<Goal>) => {
    await updateGoal({
      doc_id: goalId,
      updateFields: {
        ...updatedFields,
      },
    });

    await getGoals();
  };

  const goalsObj = useMemo(() => {
    return {
      all: goals,
      current: goals.filter((item) => !item.isComplete && !item.isDeleted),
      completed: goals.filter((item) => item.isComplete && !item.isDeleted),
    };
  }, [goals]);

  return { currentGoal, updateGoalHook, goalsObj };
};
