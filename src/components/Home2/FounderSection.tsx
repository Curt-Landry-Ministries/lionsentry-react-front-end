"use client";

import React from 'react';
import Image from 'next/image';
import founderImg from "../../../public/images/Placeholder.png";
import bgGlow from "../../../public/images/bg-blur.png";
import bgGlowMobile from "../../../public/images/bg-blur-mobile.png";

const FounderSection = () => {
    return (
        <section className="relative w-full py-20 md:py-24 lg:px-6 px-[20px] overflow-hidden flex items-center justify-center min-h-[504px]">
            <div className="absolute inset-0 z-0 md:block hidden">
                <Image
                    src={bgGlow}
                    alt="Background Glow"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="absolute inset-0 z-0 md:hidden  block">
                <Image
                    src={bgGlowMobile}
                    alt="Background Glow"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="relative z-10 max-w-7xl w-full bg-white rounded-[20px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-white/50 p-[30px] md:p-[40px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center">

                    {/*  LEFT SIDE: TEXT  */}
                    <div className="order-2 lg:order-2"> 
                        <h2 className="text-[38px] font-bold text-slate-900 tracking-tight lg:block hidden">
                            From the Founder
                        </h2>

                        <div className="lg:space-y-1 space-y-0  lg:pt-3 pt-0">
                            <p className="text-black text-[20px] leading-relaxed font-normal">
                                “I've witnessed countless people living divided lives—successful by external measures but internally disconnected from their true purpose. LionSentry was born from my conviction that we were each created with intention, designed to make a unique contribution that only we can make.
                            </p>
                            <p className="text-black text-[20px] leading-relaxed font-normal">
                                Our technology isn't just innovative for innovation's sake—it's transformative by design. We've built platforms that adapt to each user's journey because purpose isn't static; it unfolds and deepens through every season of life. We prioritize both psychological and digital safety, ensuring their personal journey remains private and secure throughout this process of self-discovery. The transformation I've witnessed in individuals who embrace this journey continues to inspire our mission of guiding people into purposeful living for extraordinary meaning and impact.
                            </p>
                        </div>

                        <div className="pt-3">
                            <p className="text-black font-normal text-[20px]">
                                — Paul Marcellino, Founder & CEO
                            </p>
                        </div>
                    </div>

                    {/*  RIGHT SIDE: IMAGE-*/}
                    <div className="order-1 lg:order-2 flex justify-center flex-col lg:justify-end">
                        <h2 className="text-[32px] pb-8 font-bold text-slate-900 tracking-tight lg:hidden block">
                            From the Founder
                        </h2>
                        <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden">
                            <Image
                                src={founderImg}
                                alt="Paul Marcellino"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default FounderSection;