import { useUserStore } from "@/app/providers/userContext";
import { useState } from "react";


const SignedModal = () => {
    const { firstName, email } = useUserStore((s) => s);
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    const handleGoToPlatform = () => {
        const safeEmail = encodeURIComponent(email);
        window.location.href = `https://mypurposequest.com/sign/forget-password?email=${safeEmail}`;

    };
    const closeModal = () => setIsOpen(false);
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-sans">

            <div className="relative bg-white rounded-xl shadow-2xl w-[550px] min-h-[500px] p-8 flex flex-col">

                {/* STEP 1: VIDEO INTRO */}
                {step === 1 && (
                    <div className="flex-1 flex flex-col animate-in fade-in duration-300">

                        {/* Title Section */}
                        <div className="text-center mb-6">
                            <h3 className="text-[20px] font-bold text-gray-900 mb-2">
                                Introducing our New Platform: PurposeQuest
                            </h3>
                            <p className="text-gray-800 text-base leading-relaxed ">
                                Watch this brief video to bring the existing work you've already done into our new platform.
                            </p>
                        </div>

                        {/* Video Placeholder (Grey Box with Rotated Text) */}
                        <div className="relative w-full aspect-video bg-gray-200 rounded-xl overflow-hidden mb-8 shadow-lg">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/Uk8tryh1cgE?si=yMwhF5YT1tmGGhGk&amp;controls=0"
                                title="PurposeQuest Introduction Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>


                        {/* Footer - Pushed to bottom */}
                        <div className="mt-auto flex justify-between items-center pt-6">
                            <button
                                onClick={closeModal}
                                className="h-10 w-[100px] px-[15px] bg-transparent border-2 border-[#0055ed]   rounded-[4px] flex items-center justify-center text-[#0055ed] cursor-pointer relative overflow-hidden text-base font-bold leading-none  transition-all duration-300"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => setStep(2)}
                                className="h-10 w-[100px] px-[15px] bg-[#0055ed] border-2 border-transparent rounded-[4px] flex items-center justify-center text-white cursor-pointer relative overflow-hidden text-base font-bold leading-none hover:bg-transparent hover:border-[#0055ed] hover:text-[#0055ed] transition-all duration-300"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2*/}
                {step === 2 && (
                    <div className="flex-1 flex flex-col animate-in fade-in duration-300">

                        <h3 className="text-[20px] font-bold text-gray-900 mb-8 text-center">
                            Reset Password & Update Account
                        </h3>

                        <div className="text-gray-700 text-base leading-relaxed space-y-6 px-1 pt-6">
                            <p className="font-semibold text-gray-900 text-base">
                                Hi, {firstName || "[First Name]"}!
                            </p>

                            <p>
                                We hope you had a chance to watch the short tutorial on how to reset your password in PurposeQuest.
                            </p>

                            <p>
                                When you're ready, click <span className="font-bold text-gray-900">"Go to PurposeQuest"</span> to log in and reset your password so your data is updated and applied to your account.
                            </p>
                        </div>

                        {/* Footer - Pushed to bottom */}
                        <div className="mt-auto flex justify-between items-center pt-6">
                            <button
                                onClick={() => setStep(1)}
                                className="h-10 w-[150px] px-[15px] bg-transparent border-2 border-[#0055ed]   rounded-[4px] flex items-center justify-center text-[#0055ed] cursor-pointer relative overflow-hidden text-base font-bold leading-none  transition-all duration-300"
                            >
                                Previous
                            </button>

                            <button
                                onClick={handleGoToPlatform}
                                className="h-10 w-[200px] px-[15px] bg-[#0055ed] border-2 border-transparent  rounded-[4px] flex items-center justify-center text-white cursor-pointer relative overflow-hidden text-base font-bold leading-none hover:bg-transparent hover:border-[#0055ed] hover:text-[#0055ed] transition-all duration-300"
                            >
                                Go to PurposeQuest
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};



export default SignedModal