import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";
import Button from "@/components/Global/Button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { AuthedPaths } from "@/lib/constants";

const GoalPrinciples = () => {
  const principles = [
    {
      image: "/icons/goals/principle-1.svg",
      title: "Seek His Kingdom and Righteousness First",
      content:
        '<p>Matthew 6:33-34 says, <span class="font-semibold">"But seek first the kingdom of God and His righteousness, and all these things shall be added to you. Therefore do not worry about tomorrow, for tomorrow will worry about its own things. Sufficient for the day is its own trouble."</span></p><p>Matthew 6:33 is where you start. This is to be your focus. The key to growing and being successful in the spirit this coming year—having all you need to answer the call—must be tied to seeking His Kingdom first. Untie the mindset that your performance will get you where you need to go.</p>',
    },
    {
      image: "/icons/goals/principle-2.svg",
      title: "Remember Who Gives You Power",
      content:
        '<p>Deuteronomy 8:18-20 says, <span class="font-semibold">"And you shall remember the Lord your God, for it is He who gives you power to get wealth, that He may establish His covenant which He swore to your fathers, as it is this day. Then it shall be, if you by any means forget the Lord your God, and follow other gods, and serve them and worship them, I testify against you this day that you shall surely perish. As the nations which the Lord destroys before you, so you shall perish, because you would not be obedient to the voice of the Lord your God."</span></p><p>Deuteronomy 8:18-20 comes next. He gives you what you need when you seek His Kingdom and righteousness first. Never forget that the Lord gives you the ability and the wealth to do what you need to do. He does this to establish His covenant with you.</p>',
    },
    {
      image: "/icons/goals/principle-3.svg",
      title: "Allow Him to Establish His Covenant with You",
      content:
        '<p>The Lord wants to establish a One New Man covenant, and there must be a testimony. This is what the year ahead is about, building up a testimony of God\'s covenant with you.</p><p>Ephesians 4:13 is a description of the covenant. It says, <span class="font-semibold">“…till we all come to the unity of the faith and of the knowledge of the Son of God, to a perfect man, to the measure of the stature of the fullness of Christ...”</span> He is creating unity as the One New Man.</p>',
    },
    {
      image: "/icons/goals/principle-4.svg",
      title: "Walk in the Fruit of the Spirit",
      content:
        '<p>The fruit of the Spirit is evidence of the covenant. When you walk in the Spirit, the enemy can\'t bring an accusation against you that will stick.</p><p>Galatians 5:22-23 says, <span class="font-semibold">“But the fruit of the Spirit is love, joy, peace, longsuffering, kindness, goodness, faithfulness, gentleness, self-control. Against such there is no law.”</span></p>',
    },
    {
      image: "/icons/goals/principle-5.svg",
      title:
        "Know You Are Able with the Power of God, and You Are More Than a Conqueror",
      content:
        '<p>Philippians 4:13 says, <span class="font-semibold">“I can do all things through Christ who strengthens me.”</span></p><p>Romans 8:37-39 says, <span class="font-semibold">“Yet in all these things we are more than conquerors through Him who loved us. For I am persuaded that neither death nor life, nor angels nor principalities nor powers, nor things present nor things to come, nor height nor depth, nor any other created thing, shall be able to separate us from the love of God which is in Christ Jesus our Lord.”</span></p><p>In the year ahead, you must cut off the lie that you have lack or will lose. The war has already been won. Operate out of a victor, not a victim, mindset. You’ve been given an inheritance. You are a king and priest. You are a King’s kid! This is your identity.</p>',
    },
  ];
  return (
    <div className="flex flex-col w-full max-w-screen-sm mx-auto px-4">
      <h3>Let&apos;s Prepare for Setting Goals</h3>

      <p className="mb-10">
        Please read about 5 Key principles. This will help you get into the
        right mindset for this important exercise. We will then have you answer
        7 questions that will help you further prepare to create your goals.
      </p>

      <iframe
        src="https://www.youtube.com/embed/u31qwQUeGuM?si=hQpRtxns7WLx-KE1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="w-full min-h-[200px] md:min-h-[340px]"
      />
      <div className="mt-10">
        {principles.map((item, index) => (
          <div
            className={classNames("flex gap-10 mobile-only:flex-wrap", {
              "mb-12 md:mb-24": index < principles.length - 1,
            })}
            key={`princile-${index}`}
          >
            <div className="w-[150px] h-[150px] relative flex-shrink-0">
              <Image
                src={item.image}
                fill
                objectFit="contain"
                alt={`Principle ${index + 1} Image`}
              />{" "}
            </div>
            <div className="mobile-only:w-full">
              <p className="text-[#7B7B7B] font-semibold mb-1">
                Principle {index + 1}
              </p>
              <h3 className="mb-5">{item.title}</h3>

              <div
                className="[&>p]:mb-5"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="my-12">
        <h3 className="mb-8">Let&apos;s get started!</h3>
        <p>
          As you read through and prayerfully consider each principle above,
          think about the habits and patterns you want to change to grow your
          faith, get healthier, live generously, and find more joy in life. Tie
          the goals you set back to your why statement.
        </p>
      </div>

      <Link href={AuthedPaths.OnboardingGoals} className="ml-auto">
        <Button standardBtn={"primary"} hasIcon={true}>
          Set My Goals <ChevronRightIcon />
        </Button>
      </Link>
    </div>
  );
};

export default GoalPrinciples;
