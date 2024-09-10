import Footer from "@/components/Global/Footer";
import Header from "@/components/Global/Header";
import React from "react";

export default function UnauthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-start">
      <Header />
      <div className="flex flex-1 w-full">
        <div className="flex flex-col items-center justify-center w-full">
          {/* <div
            className={`flex-1 w-full transition-all duration-300 overflow-scroll sidebar-open:ml-64`}
          > */}
          {children}
          {/* </div> */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
