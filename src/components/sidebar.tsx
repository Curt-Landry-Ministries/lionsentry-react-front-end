// src/components/Sidebar.tsx

import React from 'react';
import Link from 'next/link';
import { logoutUser } from "../api/auth";

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: () => void }) => {

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-black text-white transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-6">
        <button className="md:hidden text-2xl" onClick={toggleSidebar}>
          ✖
        </button>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link href="/dashboard" className="px-4 py-2 text-white bg-gradient-to-br hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium" >Dashboard</Link>
        <Link href="/devotionals" className="px-4 py-2 text-white bg-gradient-to-br hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium" >Devotionals</Link>
        <Link href="/" className="px-4 py-2 text-white bg-gradient-to-br hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium" >
          <button
            onClick={handleLogout}
          >Logout
          </button></Link>
      </nav>
    </div>
  );
};

export default Sidebar;
