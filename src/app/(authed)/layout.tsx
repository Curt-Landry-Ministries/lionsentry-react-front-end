"use client";
import AuthedHeader from "@/components/Global/AuthedHeader";
import SimpleFooter from "@/components/Global/SimpleFooter";
import React, { useEffect } from "react";
import { useUserStore } from "../providers/userContext";
import { useRouter } from "next/navigation";
import { AuthedPaths } from "@/lib/constants";

export default function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchUserData, whyStatements } = useUserStore((s) => s);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    // Waiting for the endpoint to validate auth token before turning this on to make sure the flow work correctly
    // if (whyStatements.length === 0) router.push(AuthedPaths.Questionnaire);
  }, [whyStatements]);
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
