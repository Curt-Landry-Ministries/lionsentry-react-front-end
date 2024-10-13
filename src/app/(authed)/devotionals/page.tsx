"use client";

import React, { useState } from "react";

import LoadingScreen from "../../../components/Global/LoadingScreen"; // Import the existing loader component
import DevotionalCard from "@/components/Devotionals/devotionalCard";
import classnames from "classnames";
import Modal from "@/components/Global/Modal";
import DevotionalSlider from "@/components/Devotionals/devotionalSlider";
import { generateDevotional } from "@/lib/app/actions";

const Devotionals: React.FC = () => {
  const [devotionals, setDevotionals] = useState<DevotionalContent[]>([]); // State to store devotionals
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [currentDevotional, setCurrentDevotional] = useState<number | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);

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
    <>
      <div className="w-full max-w-5xl p-6 rounded-lg shadow-lg mt-10 mx-auto flex justify-center flex-col items-center bg-white dark:bg-black border">
        <h1 className="text-2xl font-bold mb-4 leading-tight tracking-tight md:text-2xl gradient-text hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 rounded-lg px-4 py-2 text-center dark:focus:ring-blue-800">
          Devotionals
        </h1>
        <div
          className={classnames("grid lg:grid-cols-3 md:grid-cols-2 gap-3", {
            "mb-16": devotionals.length > 0,
          })}
        >
          {devotionals.map((devotional, index) => (
            <DevotionalCard
              devotional={devotional}
              key={index}
              onClick={() => {
                setOpenModal(true);
                setCurrentDevotional(index);
              }}
            />
          ))}
        </div>

        {isLoading ? (
          <LoadingScreen message="Generating Devotional" /> // Show the loading screen
        ) : (
          <button
            className="main-btn"
            onClick={fetchDevotional} // Fetch devotional on button click
          >
            Generate Devotional
          </button>
        )}
      </div>
      <Modal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setCurrentDevotional(null);
        }}
      >
        {currentDevotional !== null && (
          <DevotionalSlider
            current={currentDevotional}
            devotionals={devotionals}
            onChange={(next) => setCurrentDevotional(next as number)}
          />
        )}
      </Modal>
    </>
  );
};

export default Devotionals;
