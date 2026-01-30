"use client";

import React from 'react';
import mission1 from "../../../public/images/mission1.png";
import mission2 from "../../../public/images/mission2.png";
import Image from 'next/image';
import Button from '../Global/Button';

const MissionSection = () => {
    return (

        <section className='md:pt-60  pt-16 pb-20 px-[20px]'>
            <div className="max-w-7xl mx-auto bg-[#F4F7FF] rounded-[24px] py-[40px] px-[40px] md:px-[80px] md:py-[40px] text-center border border-slate-100">

                {/* Title */}
                <h2 className="md:text-[38px] text-[24px] font-bold text-[#0f172a] mb-16 leading-tight max-w-2xl mx-auto">
                    Our Mission, Activated Through Two Core Innovations
                </h2>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-12">

                    {/* Feature 1: PurposeQuest */}
                    <div className="flex flex-col items-center group">
                        <div className="md:mb-7 mb-3">
                            <Image src={mission1} alt='mission1' />
                        </div>
                        {/* Content */}
                        <h2 className="md:text-[24px] text-[20px] font-bold text-[#002C61] md:mb-4 mb-3">PurposeQuest™</h2>
                        <p className="text-[#262836] leading-relaxed max-w-[336px] text-[16px] font-medium">
                            A personalized self-discovery experience revealing divine design through interactive, guided quests.
                        </p>
                    </div>

                    <div className="flex flex-col items-center group">
                        <div className="md:mb-7 mb-3">
                            <Image src={mission2} alt='mission2' />
                        </div>
                        {/* Content */}
                        <h2 className="md:text-[24px] text-[20px] font-bold text-[#002C61] md:mb-4 mb-3">PurposePlan™</h2>
                        <p className="text-[#262836] leading-relaxed max-w-[336px] text-[16px] font-medium">
                            A dynamic tool providing clear goals and actionable steps across every dimension of life that evolves with each user's journey.
                        </p>
                    </div>
                </div>

                {/* Bottom Button */}

                <Button standardBtn={"primary"}>Learn More</Button>

            </div>
        </section>

    );
};

export default MissionSection;