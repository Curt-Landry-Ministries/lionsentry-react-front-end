import * as Yup from "yup";
import FormWrapper from "./Forms/FormWrapper";
import { Form, FormikHelpers, FormikValues } from "formik";
import Input from "./Forms/Input";
import Button from "./Button";
import Select from "./Forms/Select";
import Textarea from "./Forms/Textarea";
import { submitToKeap } from "@/lib/service/actions";

const HelpForm = () => {
  const validationSchema = Yup.object({
    inf_field_Email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    inf_field_FirstName: Yup.string().min(1).required("First Name is required"),
    inf_field_LastName: Yup.string().min(1).required("Last Name is required"),
    inf_custom_Browser: Yup.string()
      .oneOf(["Chrome", "Firefox", "Edge", "Safari", "Opera", "Brave"])
      .nullable(),
    inf_custom_LSMVPFeedback: Yup.string(),
    honeypot: Yup.string().max(0),
  });

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    await submitToKeap(values);
  };

  const initialValues = {
    inf_field_Email: "",
    inf_field_FirstName: "",
    inf_field_LastName: "",
    inf_custom_Browser: "",
    inf_custom_LSMVPFeedback: "",
    // honeypot: "",
  };

  return (
    <FormWrapper
      title="You need help with anything?"
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
      initialValues={initialValues}
    >
      <Form>
        <Input
          type="text"
          name="inf_field_FirstName"
          id="inf_field_FirstName"
          placeholder="Enter Your First Name"
          required
        />
        <Input
          type="text"
          name="inf_field_LastName"
          id="inf_field_LastName"
          placeholder="Enter Your Last Name"
          required
        />
        <Input
          type="email"
          name="inf_field_Email"
          id="inf_field_Email"
          placeholder="Enter Your Email Address"
          required
        />
        <Select
          options={[
            {
              label: "Chrome",
              value: "Chrome",
            },
            {
              label: "Brave",
              value: "Brave",
            },
          ]}
          defaultOptionLabel="Your current browser?"
          name="inf_custom_Browser"
        />
        <Textarea
          name="inf_custom_LSMVPFeedback"
          placeholder="What do you need help with?"
          rows={5}
        />
        <div className="hidden">{/* <Input name="honeypot" /> */}</div>
        <Button
          type="submit"
          className="w-full"
          standardBtn={"primary"}
          hasIcon={true}
        >
          Submit
        </Button>
      </Form>
    </FormWrapper>
  );
};

export default HelpForm;
