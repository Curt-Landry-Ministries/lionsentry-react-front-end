"use client";

import React, { useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { generateDevotional, DevotionalContent } from "../../api/app"; // Import the function and type
import LoadingScreen from "../../components/loading"; // Import the existing loader component

const Devotionals: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [devotionals, setDevotionals] = useState<DevotionalContent[]>([]); // State to store devotionals
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchDevotional = async () => {
    setIsLoading(true); // Show the loading screen
    try {
      const newDevotional = await generateDevotional(); // Fetch devotional from server
      setDevotionals([...devotionals, newDevotional]); // Add new devotional to state
    } catch (error) {
      console.error("Failed to fetch devotional:", error);
      // Optionally handle error, e.g., show a notification to the user
    } finally {
      setIsLoading(false); // Hide the loading screen after fetching
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "ml-64" : ""
          }`}
        >
          <div className="max-w-3xl mx-auto p-2 rounded-lg shadow-lg bg-white dark:bg-black">
            <h1 className="text-3xl font-bold mb-6 text-center leading-tight tracking-tight bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Devotionals
            </h1>
            <button
              className="text-white w-full mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:focus:ring-blue-800"
              onClick={fetchDevotional}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Generating..." : "Generate Devotional"}
            </button>
            {isLoading ? (
              <LoadingScreen message="Generating Devotional" /> // Show the loading screen
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {devotionals.map((devotional, index) => (
                  <div key={index} className="p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">
                      {devotional.Title}
                    </h2>
                    <p className="mb-1">
                      <strong>Bible Passage:</strong> {devotional.BiblePassage}
                    </p>
                    <p className="mb-1">
                      <strong>Personalization:</strong>{" "}
                      {devotional.Personalization}
                    </p>
                    <p>
                      <strong>Journaling Prompt:</strong>{" "}
                      {devotional.JournalingPrompt}
                    </p>
                  </div>
                ))}
                {!devotionals.length && (
                  <p className="text-center dark:text-gray-600">
                    No devotionals generated yet. Click the button to generate
                    one.
                  </p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      <button
        className="md:hidden fixed bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        ☰
      </button>
    </div>
  );
};

export default Devotionals;
