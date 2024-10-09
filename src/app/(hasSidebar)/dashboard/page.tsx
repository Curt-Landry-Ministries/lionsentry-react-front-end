"use client";

import React, { useEffect, useState } from "react";
import { getLatestWhyStatement } from "@/lib/app/actions";

const Dashboard = () => {
  const [whyStatement, setWhyStatement] = useState<string | null>(null);
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

  return (
    <div className="w-full max-w-3xl p-6 mx-auto rounded-lg shadow-lg mt-10 bg-white dark:bg-black border">
      <h1 className="text-2xl font-bold mb-4 leading-tight tracking-tight md:text-2xl gradient-text rounded-lg px-4 py-2 text-center">
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
  );
};

export default Dashboard;
