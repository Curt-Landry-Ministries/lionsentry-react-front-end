"use client";

import React from 'react';
import Image from 'next/image';
import deviceMockup from "../../../public/images/devices.png"; 

const WisdomSection = () => {
    return (
        <section className="overflow-hidden pb-6 px-[20px]">
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center px-4 sm:px-6 lg:px-8">

                {/*  LEFT CONTENT  */}
                <div className="animate-in fade-in slide-in-from-left duration-700">
                    <h2 className="md:text-[38px] text-[32px] font-bold text-[#000] dark:text-white mb-8 leading-[1.1] tracking-tight lg:max-w-md ">
                        Where Timeless Wisdom Meets Adaptive Technology
                    </h2>
                    <p className="text-black dark:text-white text-[20px] leading-relaxed font-normal mx-auto 2xl:mx-0">
                        Our approach combines faith-integrated perspective with adaptive personalization,
                        timeless wisdom with modern technology, creating solutions that meet users
                        where they are while guiding them toward who they were created to be.
                    </p>
                </div>

                {/* RIGHT IMAGE MOCKUP */}
                <div className="relative flex justify-center items-center">
                    {/* Background subtle glow effect can be added here if needed */}
                    <Image
                        src={deviceMockup}
                        alt="PurposeQuest App Mockup"
                        priority
                        className="max-w-full h-auto"
                    />
                </div>

            </div>
        </section>

    );
};

export default WisdomSection;