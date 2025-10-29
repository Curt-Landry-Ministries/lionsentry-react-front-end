"use client"
import React, { useState, useEffect, useRef } from "react";

const Modal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const hasSubmitted = useRef(false);

    useEffect(() => {
        const iframeId = "JotFormIFrame-252514126104040";

        // ✅ Load JotForm script
        const script = document.createElement("script");
        script.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
        script.onload = () => {
            (window as any).jotformEmbedHandler(
                `iframe[id='${iframeId}']`,
                "https://form.jotform.com/"
            );
        };
        document.body.appendChild(script);

        // ✅ Listen for postMessage from JotForm
        const handleMessage = (event: MessageEvent) => {
            if (!event.origin.includes("jotform.com")) return;

            const data = event.data;

            // Debug
            // console.log("📩 JotForm message:", data);

            // 🧩 Handle different message types safely
            if (
                typeof data === "object" &&
                data?.type === "submission-completed" &&
                !hasSubmitted.current
            ) {
                hasSubmitted.current = true;
                setIsOpen(false);
            }

            if (
                typeof data === "string" &&
                data.includes("thankyou") &&
                !hasSubmitted.current
            ) {
                hasSubmitted.current = true;
                setIsOpen(false);
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
            if (script.parentNode) script.parentNode.removeChild(script);
        };
    }, []);

    const closeModal = () => setIsOpen(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
            <div
                className="relative bg-white rounded-md shadow-lg max-w-3xl w-full mx-auto"
                style={{
                    maxHeight: "90vh", // responsive height
                    overflowY: "auto", // scrollable if too tall
                }}
            >
                {/* ❌ Close button */}
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold z-10"
                >
                    ×
                </button>

                <iframe
                    id="JotFormIFrame-252514126104040"
                    title="Data Migration Consent Agreement"
                    allow="geolocation; microphone; camera; fullscreen; payment"
                    src="https://form.jotform.com/252514126104040"
                    frameBorder={0}
                    style={{
                        width: "100%",
                        height: "80vh", // adjust dynamically
                        border: "none",
                    }}
                    scrolling="no"
                ></iframe>
            </div>
        </div>
    );

};

export default Modal;
