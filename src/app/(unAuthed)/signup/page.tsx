import TopBottom from "@/components/Global/Gradients/TopBottomGradient";
import SignupForm from "@/components/Signup/SignupForm";
import React from "react";

const SignUpPage: React.FC = () => {
  return (
    <section className="flex items-center justify-center">
      <TopBottom hasBottom={false} className="py-32">
        <div className="flex justify-center">
          <SignupForm />
        </div>
      </TopBottom>
    </section>
  );
};

export default SignUpPage;
