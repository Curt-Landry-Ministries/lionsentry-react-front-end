"use client";

import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

const Settings = () => {
    const [whyStatement, setWhyStatement] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // Retrieve the Why statement from local storage
        const storedWhyStatement = localStorage.getItem('whyStatement');
        setWhyStatement(storedWhyStatement);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className={`flex-1 p-6 bg-black transition-all duration-300 ${isSidebarOpen ? 'ml-64' : ''}`}>
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full max-w-3xl p-6 bg-black rounded-lg shadow-lg mt-10 text-white">
                            <h1 className="text-2xl font-bold mb-4 text-center leading-tight tracking-tight md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 rounded-lg px-4 py-2 text-center dark:focus:ring-blue-800">Settings</h1>
                            <p> This is a settings page - work in progress</p>
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

export default Settings;
