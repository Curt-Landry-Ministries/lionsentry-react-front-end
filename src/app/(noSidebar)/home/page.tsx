"use client";
// src/app/pages/HomePage.tsx
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/Global/Button";
import TopBottom from "@/components/Global/Gradients/TopBottomGradient";
import LeftRight from "@/components/Global/Gradients/LeftRightGradient";
import { Paths } from "@/lib/constants";
import TwoColumnText from "@/components/Home/TwoColumnText";
import ImageBGSection from "@/components/Global/ImageBGSection";
import Image from "next/image";
import CTAContentImage from "@/components/Home/CTAContentImage";
import SectionBoxCTA from "@/components/Home/SectionBoxCTA";
import { motion, useScroll } from "framer-motion";
import classnames from "classnames";

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
      title: "Answer the Questions",
      mainText:
        "Friends, embark on a journey to uncover your Divine Purpose and Faith Vision with the Divine Mission app. Reflect on your strengths, acknowledge your weaknesses, and take a step toward the unique mission that God has designed just for you. Embrace the extraordinary purpose He has planned for your life, and let the Divine Mission app be your guide in discovering and living out your true calling.",
    },
    {
      subText: "Step 2",
      title: "Receive Purpose Statement",
      mainText:
        "Friends, embark on a journey to uncover your Divine Purpose and Faith Vision with the Divine Mission app. Reflect on your strengths, acknowledge your weaknesses, and take a step toward the unique mission that God has designed just for you. Embrace the extraordinary purpose He has planned for your life, and let the Divine Mission app be your guide in discovering and living out your true calling.",
    },
    {
      subText: "Step 3",
      title: "Set Your Goals",
      mainText:
        "Friends, embark on a journey to uncover your Divine Purpose and Faith Vision with the Divine Mission app. Reflect on your strengths, acknowledge your weaknesses, and take a step toward the unique mission that God has designed just for you. Embrace the extraordinary purpose He has planned for your life, and let the Divine Mission app be your guide in discovering and living out your true calling.",
    },
    {
      subText: "Step 4",
      title: "Receive Daily Devotionals",
      mainText:
        "Friends, embark on a journey to uncover your Divine Purpose and Faith Vision with the Divine Mission app. Reflect on your strengths, acknowledge your weaknesses, and take a step toward the unique mission that God has designed just for you. Embrace the extraordinary purpose He has planned for your life, and let the Divine Mission app be your guide in discovering and living out your true calling.",
    },
    {
      subText: "Step 5",
      title: "Live with Intention",
      mainText:
        "Friends, embark on a journey to uncover your Divine Purpose and Faith Vision with the Divine Mission app. Reflect on your strengths, acknowledge your weaknesses, and take a step toward the unique mission that God has designed just for you. Embrace the extraordinary purpose He has planned for your life, and let the Divine Mission app be your guide in discovering and living out your true calling.",
    },
  ];
  return (
    <section>
      <TopBottom className="min-h-screen">
        <div className="relative h-full w-full">
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
            className="w-full h-full absolute top-0 left-0 hidden md:block"
            alt="Lionsentry line hero graphic"
          />
          <div className="content-container flex flex-col items-center justify-center h-full">
            <Image
              src={"/images/LS-Logo.png"}
              width={70}
              height={70}
              alt="LionSentry Logo"
            />
            <h1 className="display-heading leading-[86%] mt-10 text-center font-medium">
              <span className="text-gradient block">Find Your Purpose</span>
              <span>Live with Intention</span>
            </h1>
            <p className="text-center text-2xl leading-tight my-7">
              Transform Your Life with Our Personalized Purpose Statement and
              Goal-Setting Framework with TruPath<sup>TM</sup>, a LionSentry
              Product.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/signup">
                <Button standardBtn={"primary"}>Begin</Button>
              </Link>
              <Link href="/login">
                <Button standardBtn={"secondary"}>Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </TopBottom>
      <div ref={scrollRef} className="relative">
        <div
          className={classnames(
            "w-3 h-3 bottom-16 left-1/2 -ml-1.5 bg-blue rounded-full z-10 hidden md:block",
            {
              fixed: heightProgress < 1,
              absolute: heightProgress === 1,
            }
          )}
        />
        <motion.div
          className="absolute left-1/2 w-0.5 -ml-[0.05rem] h-16 top-0 bg-blue origin-[0%] z-10 hidden md:block"
          style={{ height: heightProgress * 100 + "%" }}
          viewport={{ root: scrollRef }}
        />
        <div className="content-container [&>iframe]:min-h-[194px] md:[&>iframe]:min-h-[500px] pt-24 md:pt-52 z-10 relative">
        <iframe
          src="https://www.youtube.com/embed/u31qwQUeGuM?si=hQpRtxns7WLx-KE1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        </div>
        <CTAContentImage
          title="Feeling Lost? Discover Your True Calling"
          content="<p>In a world filled with distractions and uncertainties, many of us struggle to find our true purpose and direction. We often feel overwhelmed, aimless, and unsure of how to live a life that aligns with our values and faith.</p><p>Without a clear purpose and intentional goals, we risk wandering through life without experiencing the fulfillment and impact God intends for us.</p>"
          buttonText="Discover my calling"
          buttonLink="/signup"
          image={"/images/discover-my-calling.gif"}
        />

        <CTAContentImage
          title="Your Path to Clarity and Intention"
          content="<p>Introducing our revolutionary digital tool designed to help you discover your God-given purpose and live with intentionality.</p><p>Through a simple process, you'll answer seven insightful questions that will reveal a customized purpose statement tailored to your unique journey, along with daily devotionals sent straight to your email. Following this, our platform will guide you through creating five SMART goals using the ACT framework, empowering you to take practical steps toward a life of meaning and direction.</p>"
          buttonText="I'm ready"
          buttonLink="/signup"
          image={"/images/path-to-clarity.gif"}
        />
      </div>
      <LeftRight className="py-24">
        <div>
          <Image
            src="/images/top-line-graphic.svg"
            width={0}
            height={0}
            alt="LionSentry Logo"
            className="mb-6 w-[95%] h-auto absolute -top-24 left-0 -z-10 hidden md:block"
          />
          <div className="content-container">
            <h1 className="text-center mb-16">How to Use TruPath</h1>

            {howToUseContent.map((item, key) => (
              <TwoColumnText
                subText={item.subText}
                title={item.title}
                mainText={item.mainText}
                key={key}
              />
            ))}

            <div className="w-full text-center">
              <Link href={Paths.Signup}>
                <Button standardBtn={"primary"}>Let the journey begin</Button>
              </Link>
            </div>
          </div>
          <Image
            src="/images/bottom-line-graphic.svg"
            width={0}
            height={0}
            alt="LionSentry Logo"
            className="mb-6 w-[95%] h-auto absolute bottom-0 right-0 -z-10 hidden md:block"
          />
        </div>
      </LeftRight>
      <SectionBoxCTA
        title="Grow in Faith"
        content="Throughout this process, you will find scriptural references and spiritual encouragement to deepen your faith and keep you grounded in God's plan for your life."
        image={"/images/grow_in_faith.png"}
        buttonLink="/"
        buttonText="I'm ready to grow"
      />
      <ImageBGSection imageUrl="/images/bg-image.png">
        <div className="content-container flex flex-col items-center text-center gap-4 text-white">
          <Image
            src="/images/LS-Logo.png"
            width={80}
            height={80}
            alt="LionSentry Logo"
            className="mb-6"
          />
          <h1>About Our Ministry</h1>
          <p className="text-xl">
            We believe that every person has a unique calling, and through our
            digital tools, we aim to provide practical and spiritual guidance to
            help you navigate your journey.
          </p>
          <p className="text-xl">
            Our team is passionate about creating resources that inspire growth,
            intentional living, and a deeper relationship with God. Join us on
            this transformative path and see how purposeful living can impact
            every aspect of your life.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Link href="/signup">
              <Button standardBtn={"primary"}>Start Now</Button>
            </Link>
            <Link href="/signin">
              <Button standardBtn={"secondary"}>Learn More</Button>
            </Link>
          </div>
        </div>
      </ImageBGSection>
    </section>
  );
};

export default Home;
