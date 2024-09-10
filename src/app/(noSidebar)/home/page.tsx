// src/app/pages/HomePage.tsx
import React from "react";
import Link from "next/link";
import Button from "@/components/Global/Button";
import TopBottom from "@/components/Global/Gradients/TopBottomGradient";
import LeftRight from "@/components/Global/Gradients/LeftRightGradient";
import { Paths } from "@/lib/constants";
import TwoColumnText from "@/components/Home/TwoColumnText";
import ImageBGSection from "@/components/Global/ImageBGSection";
import Image from "next/image";
import CTAContentImage from "@/components/Home/CTAContentImage";
import discover from "../../../../public/discover-my-calling.gif";
import SectionBoxCTA from "@/components/Home/SectionBoxCTA";

const Home: React.FC = () => {
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
    <section className="min-h-full mx-auto grid max-w-5xl flex-col justify-center flex-1">
      <TopBottom className="min-h-screen">
        <div className="content-container flex flex-col items-center justify-center h-full overflow-visible">
          <Image
            src={"/LS-Logo.png"}
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
            <Link href="/signin">
              <Button standardBtn={"secondary"}>Sign In</Button>
            </Link>
          </div>
        </div>
      </TopBottom>
      <CTAContentImage
        title="Feeling Lost? Discover Your True Calling"
        content="<p>In a world filled with distractions and uncertainties, many of us struggle to find our true purpose and direction. We often feel overwhelmed, aimless, and unsure of how to live a life that aligns with our values and faith.</p><p>Without a clear purpose and intentional goals, we risk wandering through life without experiencing the fulfillment and impact God intends for us.</p>"
        buttonText="Discover my calling"
        buttonLink="/signup"
        image={"/images/discover-my-calling.gif"}
      />
      <LeftRight className="py-24">
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
            src="/LS-Logo.png"
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
