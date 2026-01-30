"use client";

import React from 'react';
import Image from 'next/image';
import leftGlow from "../../../public/images/Gradient Left.png";
import rightGlow from "../../../public/images/Gradient Right.png";
import Vector1 from "../../../public/images/Vector1.png";
import Vector2 from "../../../public/images/Vector2.png";
import Vector3 from "../../../public/images/Vector3.png";
import Button from '../Global/Button';

const PartnershipSection = () => {
    return (
        <section className="relative w-full bg-[#001956] py-16 sm:py-24 md:py-32 px-[20px] overflow-hidden flex flex-col items-center text-center">

            {/*  SIDE BLURRY IMAGES  */}
            <div className="absolute left-0 top-0 bottom-0 z-0 opacity-70 pointer-events-none">
                <Image
                    src={leftGlow}
                    alt=""
                    className="h-full w-full object-cover object-left"
                />
            </div>

            <div className="absolute right-0 top-0 bottom-0 z-0 opacity-70 pointer-events-none">
                <Image
                    src={rightGlow}
                    alt=""
                    className="h-full w-full object-cover object-right"
                />
            </div>

            {/* CONTENT  */}
            <div className="relative z-10 w-full max-w-7xl mx-auto">

                {/* Header */}
                <div className="max-w-3xl mx-auto mb-14 sm:mb-20 space-y-3">
                    <h2 className="text-[32px] lg:text-[38px] font-bold text-white tracking-tight leading-tight">
                        Partnership Opportunities
                    </h2>
                    <p className="text-slate-300 text-[20px] leading-relaxed">
                        Our innovative purpose technology creates new possibilities for leaders
                        and organizations seeking to cultivate deeper meaning and greater impact:
                    </p>
                </div>

                {/*  Cards Grid  */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">

                    {/* Card */}
                    {[
                        {
                            title: <>For  Business</>,
                            text:
                                "Enhance organizational purpose and employee engagement through customized purpose discovery platforms.",
                            icon: Vector1,
                        },
                        {
                            title: <>For Faith Communities</>,
                            text:
                                "Provide congregation members with tools for deepening their understanding of divine purpose and practical application.",
                            icon: Vector2,
                        },
                        {
                            title: <>For Educational Institutions</>,
                            text:
                                "Integrate purpose discovery into curriculum to help students identify their unique contributions and pathways.",
                            icon: Vector3,
                        },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className="bg-[#FBFBFD] rounded-[17px] px-8 py-6 sm:p-10 flex flex-col items-center text-center md:w-[373.33px] w-[335px] mx-auto"
                        >
                            <div className="w-[124px] h-[124px] rounded-full bg-[#EAF0FF] flex items-center justify-center border border-slate-100 mb-4">
                                <Image src={card.icon} alt="" />
                            </div>

                            <h3 className=" text-[24px] font-bold leading-tight text-[#002C61] mb-4 w-[244px]">
                                {card.title}
                            </h3>

                            <p className="text-[#262836] text-[16px] leading-relaxed font-medium ">
                                {card.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-32 sm:w-40 h-px bg-white/20 mx-auto mb-20" />

                {/* Connect Section */}
                <div className="max-w-xl mx-auto space-y-5">
                    <h2 className="text-[32px] lg:text-[38px] font-bold text-white tracking-tight leading-tight">
                        Connect with LionSentry
                    </h2>
                    <p className="text-white text-[20px] pb-5 leading-relaxed">
                        Explore how LionSentry's innovative solutions can help your organization
                        activate purpose. Contact our team today.
                    </p>

                    <Button standardBtn="primary">Contact Us</Button>
                </div>

            </div>
        </section>

    );
};

export default PartnershipSection;