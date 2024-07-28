// src/components/Sidebar.tsx

import React from "react";
import Link from "next/link";
import { logoutUser } from "../api/auth";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const pathname = usePathname();

  return (
    <div
      className={`fixed top-0 left-0 min-h-full w-64 bg-gray-50 border-r border-gray-200 dark:bg-gray-950 transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:static md:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-6">
        <button className="md:hidden text-2xl" onClick={toggleSidebar}>
          ✖
        </button>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link
          href="/dashboard"
          className={classNames("px-4 py-2 font-medium hover:gradient-text", {
            "gradient-text": pathname === "/dashboard",
          })}
        >
          Dashboard
        </Link>
        <Link
          href="/devotionals"
          className={classNames("px-4 py-2 font-medium hover:gradient-text", {
            "gradient-text": pathname === "/devotionals",
          })}
        >
          Devotionals
        </Link>
        <Link
          href="/"
          className={classNames("px-4 py-2 font-medium hover:gradient-text", {
            "gradient-text": pathname === "/",
          })}
        >
          <button onClick={handleLogout}>Logout</button>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
