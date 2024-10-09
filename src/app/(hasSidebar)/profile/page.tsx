"use client";

import React, { useEffect, useState } from "react";

const Profile = () => {
  const [whyStatement, setWhyStatement] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the Why statement from local storage
    const storedWhyStatement = localStorage.getItem("whyStatement");
    setWhyStatement(storedWhyStatement);
  }, []);

  return (
    <div className="w-full max-w-3xl p-6 mx-auto rounded-lg shadow-lg mt-10 bg-white dark:bg-black border">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 leading-tight tracking-tight md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 rounded-lg px-4 py-2 text-center dark:focus:ring-blue-800">
            Profile
          </h1>
          <p> This is a profile page - work in progress</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
