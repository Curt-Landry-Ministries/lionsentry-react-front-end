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
import DateField from "../Global/Forms/DateField";

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
    deadline: Yup.string().nullable(),
  });

  const initialValues: FormikValues = {
    title: "",
    description: "",
    category: " ",
    deadline: null,
  };

  const handleSubmit = async (values: FormikValues, actions: any) => {
    await saveGoal({
      goal: values.title,
      description: values.description,
      category: values.category,
      deadline: values.deadline,
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
      <div className="text-center flex items-center gap-10 lg:max-w-[780px] p-3">
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
              <div className="flex flex-wrap gap-5 md:gap-8 items-start">
                <div className="bg-cloud dark:bg-dark-mode-strong mobile-only:bg-transparent pt-2 md:p-5 rounded-lg flex flex-col items-center w-full md:w-1/3">
                  <h3 className="md:mb-2">Create New Goal</h3>
                  <div className="hidden md:block">
                    <Image
                      src="/icons/Goal-Icon.svg"
                      width={150}
                      height={150}
                      alt="Goal Icon"
                      className="mx-auto"
                    />
                    <p className="mb-8 mt-2">
                      &quot;Write the vision and make it plain...&quot;
                    </p>
                    <p>Habakkuk 2:2</p>
                  </div>
                </div>
                <div className="flex-1 w-2/3">
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
                    description={
                      "<p>Make sure your goal is <span class='font-bold'>S</span>pecific, <span class='font-bold'>M</span>easurable, <span class='font-bold'>A</span>chievable, <span class='font-bold'>R</span>elevant, and <span class='font-bold'>T</span>ime-Sensitive</p>"
                    }
                    name="description"
                    id="description"
                    placeholder="I will..."
                    className="rounded"
                    rows={3}
                    required
                  />
                  <div className="flex flex-wrap gap-5">
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
                      title="Select Category"
                      titleTop
                      selectedId={values.category as string}
                      containerStyle="w-full md:w-1/2"
                    />
                    <DateField
                      label="Select Date"
                      name="deadline"
                      id="deadline"
                      placeholder="Specific Date"
                      minDate={new Date()}
                    />
                  </div>
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
                    className="w-1/2 whitespace-nowrap"
                    standardBtn={"primary"}
                    disabled={!isValid || isSubmitting}
                  >
                    Start Goal
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
