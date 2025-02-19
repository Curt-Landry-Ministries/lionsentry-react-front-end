import TopBottom from "@/components/Global/Gradients/TopBottomGradient";
import React from "react";

const OutboundService: React.FC = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <TopBottom
        hasBottom={false}
        className="py-32 px-16 flex flex-col justify-center items-center gap-4 h-full text-center"
      >
        <h1>Coming Soon!</h1>
        <div className="flex flex-col gap-4 mt-4 px-2">
          <p className="text-lg">
            LionSentry is not yet available in your region. Our dedicated team
            is working diligently to provide this transformative resource to all
            countries over the next few months— we encourage you to come back
            and try again shortly! Thank you for your patience and
            understanding.
          </p>
          <p>
            Sincerely,
            <br />
            The Lionsentry Team
          </p>
        </div>
      </TopBottom>
    </section>
  );
};

export default OutboundService;
