// src/components/Sidebar.tsx
"use client";
import React from "react";
import Link from "next/link";
import { logout } from "@/lib/auth/actions";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSidebar } from "@/app/providers/sidebarContext";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  const handleLogout = async () => {
    await logout();
  };

  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed z-10 top-0 left-0 min-h-full w-64 bg-gray-50 border-r border-gray-200 dark:bg-gray-950 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <button
            className="md:hidden mt-4 mr-4 ml-auto"
            onClick={toggleSidebar}
          >
            <Cross1Icon width={24} height={24} />
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
      <button
        className="md:hidden bg-white dark:bg-black fixed bottom-24 right-4 w-12 h-12 border rounded-full shadow-lg flex justify-center items-center z-10"
        onClick={toggleSidebar}
      >
        <HamburgerMenuIcon height={24} width={24} />
      </button>
      <div
        className={classNames(
          "bg-black transition-all duration-100 absolute h-full w-full top-0 left-0 z-0",
          {
            "bg-opacity-70": isOpen,
            "bg-opacity-0 hidden": !isOpen,
          }
        )}
        onClick={toggleSidebar}
      />
    </>
  );
};

export default Sidebar;
