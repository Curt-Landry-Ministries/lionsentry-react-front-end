"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { getLatestWhyStatement } from "@/lib/app/actions";
import Footer from "@/components/footer";

const Dashboard = () => {
  const [whyStatement, setWhyStatement] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading

  useEffect(() => {
    const fetchWhyStatement = async () => {
      try {
        setLoading(true);

        const statement = await getLatestWhyStatement();
        setWhyStatement(statement);
      } catch (err) {
        console.error("Error fetching the latest why statement:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWhyStatement();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`flex-1 p-6 transition-all duration-300 overflow-scroll ${
            isSidebarOpen ? "ml-64" : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-3xl p-6 rounded-lg shadow-lg mt-10 bg-white dark:bg-black border">
              <h1 className="text-2xl font-bold mb-4 leading-tight tracking-tight md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 rounded-lg px-4 py-2 text-center dark:focus:ring-blue-800">
                Dashboard
              </h1>
              {loading ? (
                <p className="text-center dark:text-gray-600">
                  Loading your Why Statement...
                </p>
              ) : whyStatement ? (
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-center">
                    Your Why Statement:
                  </h2>
                  <p className="text-lg leading-relaxed text-justify whitespace-pre-line">
                    {whyStatement}
                  </p>
                </div>
              ) : (
                <p className="text-center dark:text-gray-600">
                  No Why Statement found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        className="md:hidden fixed bottom-4 right-4 p-3 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <Footer />
    </div>
  );
};

export default Dashboard;
