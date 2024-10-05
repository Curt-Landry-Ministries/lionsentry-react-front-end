import Header from "@/components/Global/Header";
import React from "react";

export default function noFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-start">
      <Header />
      <div className="flex flex-1 w-full">
        <div className="flex flex-col items-center justify-center w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
