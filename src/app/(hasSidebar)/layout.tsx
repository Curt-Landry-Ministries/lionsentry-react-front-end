import Footer from "@/components/Global/Footer";
import Header from "@/components/Global/Header";
import Sidebar from "@/components/Global/Sidebar";
import React from "react";
import { SidebarProvider } from "../providers/sidebarContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex flex-col items-center justify-center w-full">
            <div
              className={`flex-1 w-full p-6 transition-all duration-300 overflow-scroll sidebar-open:ml-64`}
            >
              {children}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
