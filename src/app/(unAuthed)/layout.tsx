import Header2 from "@/components/Global/Header2";
import FooterHome2 from "@/components/Home2/FooterHome2";
import React from "react";

export default function UnauthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-start">
      <Header2 />
      <div className="flex flex-1 w-full">
        <div className="flex flex-col items-center justify-center w-full h-full">
          {children}
            <FooterHome2 />
       
        </div>
      </div>
    </div>
  );
}
