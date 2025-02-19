import TopBottom from "@/components/Global/Gradients/TopBottomGradient";
import React from "react";

const OutboundService: React.FC = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <TopBottom
        hasBottom={false}
        className="py-32 px-16 flex flex-col justify-center items-center gap-4 h-full text-center"
      >
        <h1>Oops, our service is not available in your region</h1>
        <p className="text-xl">
          Thank you so much for your interest. Unfortunately, our service is not
          available in your region.
        </p>
      </TopBottom>
    </section>
  );
};

export default OutboundService;
