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
import VideoComponent from "@/components/Global/VideoComponent";

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
        "We help you craft your personal mission statement—your “why,” drawing  from your core beliefs, values, and giftings. This is the bedrock of setting your goals.",
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
        "You’ll get scriptures from God’s Word that speak directly to your mission, passions, goals, and challenges, helping you stay focused and encouraged.  ",
    },
  ];
  return (
    <section>
      <TopBottom>
        <div className="relative h-full min-h-screen flex items-center w-full py-40">
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
            <Image
              src={"/images/LS-logo.webp"}
              width={70}
              height={70}
              alt="LionSentry Logo"
            />
            <h1 className="display-heading leading-[86%] mt-10 text-center font-medium">
              <span className="text-gradient block">Find Your Purpose</span>
              <span>Live with Intention</span>
            </h1>
            <p className="text-center text-2xl leading-tight my-7">
              Transform your life with a personalized roadmap that helps you
              walk in your Kingdom purpose every day.
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
          style={{ height: heightProgress * 96.5 + "%" }}
          viewport={{ root: scrollRef }}
        />

        <VideoComponent
          videoSrc="https://player.manage.broadcastcloud.tv/1efa8232-a5d5-6124-8d52-3bf9f65c553b/default?autoplay=false&debug=false&direct=true"
          videoTitle="Lionsentry Homepage Video"
          className="px-4 md:max-w-[90vw] xl:max-w-[72vw] mx-auto [&>iframe]:w-full [&>iframe]:min-h-[200px] md:[&>iframe]:min-h-[370px] lg:[&>iframe]:min-h-[520px] xl:[&>iframe]:min-h-[550px] pt-24 md:pt-52 z-10 relative"
        />

        <CTAContentImage
          title="Feeling Lost? Discover Your True Calling"
          content="<p>You were created by God on purpose for a purpose. Yet distractions and challenges can throw you off course, leaving you feeling unfulfilled and unfocused.</p><p>Discovering your mission—your “why”—gives you the confidence and focus you need to walk in God’s purpose every day and impact the lives of others.</p><p>Live a life transformed by your personal “why”—your life’s mission—and inspire others the way God designed you to do.</p>"
          buttonText='Discover my "why"'
          buttonLink="/signup"
          image={"/images/discover-my-calling.gif"}
        />

        <CTAContentImage
          title="Your Path to Clarity and Intention"
          content="<p>Knowing your “why” establishes a clear path forward and roadmap to fulfilling your God-given purpose.</p><p>Everyone’s personal mission and journey in life is unique. This is why we developed a tool that walks you through developing a personalized “why” statement and provides clear direction for your life based on God’s Word!</p>"
          buttonText='Discover my "why"'
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
            <h1 className="text-center mb-16">How to Use LionSentry</h1>

            {howToUseContent.map((item, key) => (
              <TwoColumnText
                subText={item.subText}
                title={item.title}
                mainText={item.mainText}
                key={key}
              />
            ))}

            <div className="text-2xl space-y-10 mb-20">
              <h2>Your Roadmap for Living with Intention</h2>
              <p>
                These simple steps lead you on the path of living with
                intention. This roadmap keeps your focus on your mission with
                every step and gives you the daily direction and encouragement
                you need to make the impact you desire.
              </p>
              <p>
                Because situations change and life has unexpected turns, you
                goals do too--that’s okay! You can revisit and revise your goals
                as needed. We’re here to help you grow—wherever you go. You
                aren’t alone on this journey!
              </p>
            </div>

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
        image={"/images/grow_in_faith.png"}
        buttonLink={Paths.Signup}
        buttonText="Get Started Today"
      >
        <>
          <p>
            Our heart is to help you harness your God-given potential so you can
            make the impact He designed you for! The daily personalized
            devotions keep you right on track and deepen your faith, anchoring
            your goals to your mission. As a result, you become more confident
            and feel fulfilled.
          </p>

          <p>
            A coming-soon features is the Reflection Journal. This feature
            allows you to jot down ideas, prayers, revelation, and scriptures
            the Lord brings to mind as He takes you on your purpose journey!
          </p>

          <p>
            We encourage you to use this feature to get even more out of your
            goal-setting experience.
          </p>
        </>
      </SectionBoxCTA>
      <div className="pt-12 pb-16 px-4">
        <div className="max-w-[620px] text-center mx-auto">
          <div className="w-[150px] h-[1px] bg-gradient-1 opacity-70 mx-auto mb-14"></div>
          <h1 className="mb-4">Make a Donation</h1>
          <p className="mb-8 text-xl">
            If you want to see others fulfill their God-given purposes and make
            a great impact for His Kingdom, prayerfully consider donating. Every
            donation helps to advance His Kingdom and His purposes through
            others like you!
          </p>
          <Link href="https://shop.curtlandry.com/donate/" target="_blank">
            <Button standardBtn={"primary"}>Donate</Button>
          </Link>
        </div>
        <div className="w-[150px] h-[1px] bg-gradient-1 opacity-70 mx-auto mt-14"></div>
      </div>

      <ImageBGSection imageUrl="/images/bg-image.png">
        <div className="content-container flex flex-col items-center text-center gap-4 text-white">
          <Image
            src="/images/LS-logo.webp"
            width={80}
            height={80}
            alt="LionSentry Logo"
            className="mb-6"
          />
          <h1>About Our Ministry</h1>
          <p className="text-lg">
            We know that feeling stuck and without direction leaves you feeling
            unfulfilled. We want to help Believers refocus and set their minds
            and missions on the things that matter most, equipping them with the
            confidence they need to make a great impact for the Kingdom.
          </p>
          <p className="text-lg">
            This is LionSentry’s mission—our “why”—to provide a starting point
            and a step-by-step direction and encouragement to help you grow in
            faith and experience a more fulfilling and purposeful life.
          </p>
          <p className="text-lg">
            The journey of discovering your God-given mission is worth it.
            You’re worth it. And we trust that with the guidance and direction
            you need, your life will make a great impact on others.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Link href="/signup">
              <Button standardBtn={"primary"}>
                Discover My &quot;Why&quot;
              </Button>
            </Link>
            <Link href="/login">
              <Button standardBtn={"secondary"}>Learn More</Button>
            </Link>
          </div>
        </div>
      </ImageBGSection>
    </section>
  );
};

export default Home;
