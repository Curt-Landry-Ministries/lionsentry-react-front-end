"use client";

import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { generateDevotional, DevotionalContent } from '../../api/app'; // Import the function and type

const Devotionals: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [devotionals, setDevotionals] = useState<DevotionalContent[]>([]); // State to store devotionals

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchDevotional = async () => {
    try {
      const newDevotional = await generateDevotional(); // Fetch devotional from server
      setDevotionals([...devotionals, newDevotional]); // Add new devotional to state
    } catch (error) {
      console.error('Failed to fetch devotional:', error);
      // Optionally handle error, e.g., show a notification to the user
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 p-6 bg-black transition-all duration-300 ${isSidebarOpen ? 'ml-64' : ''}`}>
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-3xl p-6 rounded-lg shadow-lg mt-10 text-white">
              <h1 className="text-2xl font-bold mb-4 text-center leading-tight tracking-tight md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 rounded-lg px-4 py-2 text-center dark:focus:ring-blue-800">Devotionals</h1>
              <button
                className="text-white bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={fetchDevotional} // Fetch devotional on button click
              >
                Generate Devotional
              </button>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 text-white mt-6">
                {devotionals.map((devotional, index) => (
                  <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-black">{devotional.Title}</h2>
                    <p className="text-gray-700"><strong>Bible Passage:</strong> {devotional.BiblePassage}</p>
                    <p className="text-gray-700"><strong>Personalization:</strong> {devotional.Personalization}</p>
                    <p className="text-gray-700"><strong>Journaling Prompt:</strong> {devotional.JournalingPrompt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="md:hidden fixed bottom-4 right-4 bg-black text-white p-3 rounded-full"
        onClick={toggleSidebar}
      >
        ☰
      </button>
    </div>
  );
};

export default Devotionals;
