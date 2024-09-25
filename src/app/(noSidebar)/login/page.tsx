import React from "react";
import LoginForm from "@/components/Login/LoginForm";
import TopBottom from "@/components/Global/Gradients/TopBottomGradient";

const LogInPage: React.FC = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <TopBottom
        hasBottom={false}
        className="py-16 min-h-screen flex items-center"
      >
        <LoginForm />
      </TopBottom>
    </section>
  );
};

export default LogInPage;
