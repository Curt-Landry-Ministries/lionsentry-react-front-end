import AuthedHeader from "@/components/Global/AuthedHeader";
import SimpleFooter from "@/components/Global/SimpleFooter";
import React from "react";

export default function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-start">
      <AuthedHeader />
      <div className="flex flex-1 w-full">
        <div className="flex flex-col items-center justify-between w-full">
          <div className="py-24 md:py-36 container mx-auto">{children}</div>
          <SimpleFooter />
        </div>
      </div>
    </div>
  );
}
