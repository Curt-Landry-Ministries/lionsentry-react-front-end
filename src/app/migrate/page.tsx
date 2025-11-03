const Migrate = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-8 py-10 ">
            {/* YouTube Video */}
            <div className="w-full max-w-[900px] aspect-video rounded-2xl overflow-hidden shadow-md">
                <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/mWIAPYuYRDo?si=3BTtV2r3OI8NQsa8"
                    title="LionSentry Migration Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Divider / Label */}
            <div className="text-center text-gray-600 font-medium text-lg">↓ Complete the Consent Form ↓</div>

            {/* JotForm */}
            <div className="w-full max-w-[900px] h-[80vh] rounded-2xl overflow-hidden shadow-md border border-gray-200">
                <iframe
                    id="JotFormIFrame-252514126104040"
                    title="Data Migration Consent Agreement"
                    allow="geolocation; microphone; camera; fullscreen; payment"
                    src="https://form.jotform.com/252514126104040"
                    frameBorder="0"
                    style={{
                        width: "100%",
                        height: "80vh", // adjust dynamically
                        border: "none",
                    }}
                    scrolling="yes"
                ></iframe>
            </div>
        </div>

    )
}

export default Migrate