"use client";

import React from 'react';
import missionImage from "../../../public/images/missionImage.png"
import missionImagemobile from "../../../public/images/missionImagemobile.png"
import Image from 'next/image';
const MissionSection = () => {
    return (

        <div className="max-w-screen-2xl mx-auto md:px-6 px-[20px] md:pt-32 pt-16 grid grid-cols-1 lg:grid-cols-2 md:gap-16 gap-12 2xl:items-start items-center justify-center">
            {/* Left Side: Content */}
            <div className="space-y-6 ">
                <h2 className="md:text-[38px] text-[32px] font-extrabold text-black dark:text-white leading-tight">
                    Pioneering Purpose-Driven Technology
                </h2>
                <p className="text-[20px] text-black dark:text-white leading-relaxed font-medium">
                    LionSentry stands at the intersection of faith, technology, and human potential. Our vision is to inspire hundreds of millions of people worldwide to fully live out their divine design, while our mission guides people into purposeful living for extraordinary meaning and impact.
                </p>
            </div>


            <div className="relative h-full w-full">
                {/* 3. Family (Right Top Overlap) */}
                <div className="2xl:absolute 2xl:top-[-88%] 2xl:right-[-25%] md:block hidden">
                    <Image src={missionImage} alt='missionImage' />
                </div>

                <div className="md:hidden block ">
                    <Image src={missionImagemobile}  className="w-[355px] h-[284px]" alt='missionImage' />
                </div>



            </div>
        </div>


    );
};

export default MissionSection;