// src/components/footer.tsx
"use client";
import Image from "next/image";
import footer_line from "../../../public/images/footer_lion.png"
import Link from "next/link";
const Footer = () => {

    return (
        <footer className="w-full bg-[#001038] text-white">
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-10">

                {/* Top Content */}
                <div className="flex flex-col lg:flex-row lg:justify-between gap-10">

                    {/* Left: Logo + Text */}
                    <div className="flex flex-col md:flex-row gap-6 ">
                        <Image src={footer_line} className="w-[211px] h-[48px]" alt="faf" />
 
                        <div className="max-w-[418px] space-y-3 md:pl-5 md:pt-0 pt-5 md:pb-0 pb-5">
                            <p className="text-[14px] leading-[24px]">
                                LionSentry™, PurposeQuest™ and PurposePlan™ are registered trademarks
                                of LionSentry, Inc.
                            </p>
                            <p className="text-[14px] leading-[24px]">
                                LionSentry pioneers purpose-driven technology that empowers individuals
                                to discover their divine design and live out their unique calling for
                                extraordinary meaning and impact.
                            </p>
                         </div>

                        {/* Right: Links */}
                        <div className="flex flex-col gap-2 text-[14px] md:leading-[35px] md:pl-5">
                            <Link
                                href="tos"
                                className="underline underline-offset-4 hover:text-slate-300 transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <a
                                href="privacy"
                                className="underline underline-offset-4 hover:text-slate-300 transition-colors"
                            >
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-1 opacity-70 md:my-8 my-5" />

                {/* Bottom */}
                <div className="text-center">
                    <p className="text-white text-[12px] font-normal">
                        ©2026 LionSentry. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>

    );
};

export default Footer;


