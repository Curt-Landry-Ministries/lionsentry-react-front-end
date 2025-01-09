import React from "react";
import TopBottom from "@/components/Global/Gradients/TopBottomGradient";
import ResetPasswordForm from "@/components/ResetPassword/ResetPasswordForm";

const ResetPasswordPage: React.FC = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <TopBottom
        hasBottom={false}
        className="py-16 min-h-screen flex items-center"
      >
        <div className="flex justify-center">
          <ResetPasswordForm />
        </div>
      </TopBottom>
    </section>
  );
};

export default ResetPasswordPage;
