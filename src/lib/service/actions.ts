"use server";
export const submitToKeap = async (values: any) => {
  const formData = new FormData();

  for (let value in values) {
    formData.append(value, values[value]);
  }
  if (
    process.env.KEAP_FORM_XID &&
    process.env.KEAP_FORM_NAME &&
    process.env.KEAP_INFUSIONSOFT_VERSION
  ) {
    formData.append("inf_form_xid", process.env.KEAP_FORM_XID);
    formData.append("inf_form_name", process.env.KEAP_FORM_NAME);
    formData.append(
      "infusionsoft_version",
      process.env.KEAP_INFUSIONSOFT_VERSION
    );

    const res = await fetch(
      `https://is104.infusionsoft.app/app/form/process/${process.env.KEAP_FORM_XID}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: formData,
      }
    );
  }
};
