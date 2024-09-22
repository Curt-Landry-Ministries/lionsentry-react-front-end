import TopBottom from "@/components/Global/Gradients/TopBottomGradient";
import SignupForm from "@/components/Signup/SignupForm";
import React from "react";

const SignUpPage: React.FC = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <TopBottom hasBottom={false}>
        <SignupForm />
      </TopBottom>
    </section>
  );
};

export default SignUpPage;
