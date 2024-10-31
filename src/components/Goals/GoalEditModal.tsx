import { GoalTypeAsset } from "@/lib/constants";
import Modal from "../Global/Modal";
import Button from "../Global/Button";
import { useRef } from "react";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import * as Yup from "yup";
import Dropdown from "../Global/CustomSelect";
import Input from "../Global/Forms/Input";
import Textarea from "../Global/Forms/Textarea";
import DateField from "../Global/Forms/DateField";

const GoalEditModal = ({
  goal,
  isOpen,
  updateIsOpen,
  onUpdate,
}: {
  goal: Goal;
  isOpen: boolean;
  updateIsOpen: (open: boolean) => void;
  onUpdate: () => void;
}) => {
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
    title: goal.goal,
    description: goal.description,
    category: goal.category,
    deadline: goal.deadline ? new Date(goal.deadline) : null,
  };

  const handleSubmit = async (values: FormikValues, actions: any) => {
    actions.resetForm();

    updateIsOpen(false);
    onUpdate();
  };

  const handleClose = () => {
    updateIsOpen(false);
    formikRef.current?.resetForm();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => updateIsOpen(false)}>
      <div className="md:min-w-[80vw] lg:min-w-[800px]">
        <h3 className="mb-5">Edit Goal</h3>
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
              <div className="flex flex-col">
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

                <div className="flex flex-wrap gap-5">
                  <Dropdown
                    title="Category"
                    id="select-goal-category"
                    titleTop={true}
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
              <div className="w-full flex mobile-only:flex-wrap gap-5 justify-between">
                <Button
                  className="w-full md:w-1/2"
                  standardBtn={"tertiary"}
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full md:w-1/2"
                  standardBtn={"primary"}
                  disabled={!isValid || isSubmitting}
                >
                  Save Updates
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default GoalEditModal;
