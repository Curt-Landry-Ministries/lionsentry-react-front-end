"use client";
import React, { useEffect, useRef, useState } from "react";
import TopBottom from "@/components/Global/Gradients/TopBottomGradient";
import Image from "next/image";
import {  useScroll } from "framer-motion";
import HomeTop from "@/components/Home2/HomeTop";
import MissionSection from "@/components/Home2/MissionSection";
import WisdomSection from "@/components/Home2/WisdomSection";
import FounderSection from "@/components/Home2/FounderSection";
import PartnershipSection from "@/components/Home2/HowitWork";

const Home: React.FC = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end end"],
  });

  const [heightProgress, setHeightProgress] = useState(0);

  useEffect(() => {
    scrollYProgress.on("change", (v) => setHeightProgress(v));
  }, [scrollYProgress]);

  const howToUseContent = [
    {
      subText: "Step 1",
      title: 'Craft Your "Why" Statement',
      mainText:
        "We help you craft your personal mission statement—your “why,” drawing from your core beliefs, values, and giftings. This is the bedrock of setting your goals.",
    },
    {
      subText: "Step 2",
      title: "Set Your Goals",
      mainText:
        "Five goals are set that tie directly to beliefs, values, and giftings to help you overcome challenges so you can walk with confidence and authority into your purpose.",
    },
    {
      subText: "Step 3",
      title: "Get Daily Encouragement",
      mainText:
        "You’ll get scriptures from God’s Word that speak directly to your mission, passions, goals, and challenges, helping you stay focused and encouraged!",
    },
  ];
  return (
    <section>
      <TopBottom>
        <div className="relative h-[542px] flex items-center w-full py-40">
          <Image
            src="/images/hero-line-graphic-mobile.svg"
            width={0}
            height={0}
            className="w-full h-auto absolute top-0 left-0 block md:hidden"
            alt="Lionsentry line hero graphic"
          />
          <Image
            src="/images/hero-line-graphic.svg"
            width={0}
            height={0}
            className="w-full h-full absolute top-0 left-0 hidden md:block -z-10"
            alt="Lionsentry line hero graphic"
          />
          <div className="max-w-[700px] mx-auto flex flex-col items-center justify-center h-full">
            <div className="text-center">
              <span className="font-bold md:text-base text-[12px]">Creators of PurposeQuest™ and PurposePlan™</span>
              <h1 className="md:leading-[86%] leading-[120%] mt-3 text-center md:text-[64px] text-[30px] font-medium">
                Innovating Pathways to Purpose

              </h1>
            </div>
            <p className="text-center md:text-[24px] text-[21px] md:leading-tight leading-[28px] tracking-normal mx-8 mt-5">
              We develop transformative digital experiences that guide individuals to discover their divine design and guide purpose-driven living.
            </p>

          </div>
        </div>

      </TopBottom>
      <div ref={scrollRef} className="relative">
        <HomeTop />
        <MissionSection />
        <WisdomSection />
        <FounderSection />
        <PartnershipSection />

      </div>


    </section>
  );
};

export default Home;
