import Image from "next/image";
import Modal from "../Global/Modal";
import { GoalTypeAsset } from "@/lib/constants";
import * as Yup from "yup";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import Input from "../Global/Forms/Input";
import Textarea from "../Global/Forms/Textarea";
import Button from "../Global/Button";
import { saveGoal } from "@/lib/app/actions";
import Dropdown from "../Global/CustomSelect";
import { useUserStore } from "@/app/providers/userContext";
import { useRef } from "react";

const GoalCreateModal = ({
  isOpen,
  updateIsOpen,
}: {
  isOpen: boolean;
  updateIsOpen: (isOpen: boolean) => void;
}) => {
  const { getGoals } = useUserStore((s) => s);

  const formikRef = useRef<FormikProps<Record<string, unknown>>>(null);

  const validationSchema = Yup.object({
    title: Yup.string().required("Goal title is required"),
    description: Yup.string().required("Goal description is required"),
    category: Yup.string()
      .oneOf(Object.keys(GoalTypeAsset))
      .required("Goal category is required"),
  });

  const initialValues: FormikValues = {
    title: "",
    description: "",
    category: " ",
  };

  const handleSubmit = async (values: FormikValues, actions: any) => {
    await saveGoal({
      goal: values.title,
      description: values.description,
      category: values.category,
    });

    actions.resetForm();
    getGoals();

    updateIsOpen(false);
  };

  const handleClose = () => {
    updateIsOpen(false);
    formikRef.current?.resetForm();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center flex items-center gap-10 lg:min-w-[800px]">
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnChange
          validateOnMount
          innerRef={formikRef}
        >
          {({ isValid, isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="flex flex-wrap items-start gap-8">
                <div className="bg-cloud dark:bg-dark-mode-strong p-5 rounded-lg flex flex-col items-center">
                  <h3 className="mb-2">Create New Goal</h3>
                  <Image
                    src="/icons/Goal-Icon.svg"
                    width={150}
                    height={150}
                    alt="Goal Icon"
                  />
                  <Dropdown
                    id="select-goal-category"
                    data={[
                      { value: " ", label: "Select Category" },
                      ...Object.keys(GoalTypeAsset).map((category) => ({
                        value: category,
                        label: category,
                      })),
                    ]}
                    onSelect={(id) => {
                      setFieldValue("category", id);
                    }}
                    selectedId={values.category as string}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    label="Goal Title"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Give this goal a short title"
                    className="rounded"
                    required
                  />
                  <Textarea
                    label="Goal Description"
                    name="description"
                    id="description"
                    placeholder="I will..."
                    className="rounded"
                    rows={5}
                    required
                  />
                </div>
                <div className="w-full flex gap-5 justify-between">
                  <Button
                    className="w-1/2"
                    standardBtn={"tertiary"}
                    type="button"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/2"
                    standardBtn={"primary"}
                    disabled={!isValid || isSubmitting}
                  >
                    Save Goal
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default GoalCreateModal;
