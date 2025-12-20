"use client";
import { useState } from "react";
import jsPDF from "jspdf";
import { fetchOnboaringFromServer } from "@/lib/app/actions";
import Button from "../Global/Button";

// --- Types ---
interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  sex?: string;
  photoURL?: string;
}

interface OnboardingItem {
  question: string;
  answer: string;
}

interface ServerResponse {
  value: {
    user: User;
    onboarding: OnboardingItem[];
    whyStatement?: {
      purposeStatement: string;
      whyStatement: string;

    };
  };
}

// --- Helper Functions ---
const getBase64FromUrl = async (url: string): Promise<string> => {
  try {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve("");
    });
  } catch (error) {
    console.error("Image loading failed:", url);
    return "";
  }
};



const DownloadData = ({ closeModal }: any) => {
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const result = await fetchOnboaringFromServer() as unknown as ServerResponse;

      if (!result || !result.value) {
        return;
      }
      const user = result.value.user;

      // Load Images
      const logo1 = await getBase64FromUrl("/images/purposequest.png");
      const logo2 = await getBase64FromUrl("/images/LS.png");
      // Initialize PDF
      const doc = new jsPDF();
      const pageWidth = 210;
      const margin = 12;
      const contentWidth = pageWidth - (margin * 2);
      console.log(result)
      //  LOGOS
      const logoWidth = 60;
      const logoHeight = 30;
      const gap = 10;
      const totalLogosWidth = (logoWidth * 2) + gap;
      const startX = (pageWidth - totalLogosWidth) / 2;

      if (logo1) doc.addImage(logo1, "PNG", startX, 10, logoWidth, logoHeight);
      if (logo2) doc.addImage(logo2, "PNG", startX + logoWidth + gap, 10, logoWidth, logoHeight);

      let yPos = 60;


      //  TEXT DETAILS
      doc.setTextColor(0, 0, 0);

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("User Profile Report", pageWidth / 2, yPos, { align: "center" });
      yPos += 10;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Full Name: ${user?.firstName || ""} ${user?.lastName || ""}`, pageWidth / 2, yPos, { align: "center" });
      yPos += 6;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Email: ${user?.email || ""}`, pageWidth / 2, yPos, { align: "center" });
      yPos += 5;
      doc.text(`Gender: ${user?.sex || "Not specified"}`, pageWidth / 2, yPos, { align: "center" });
      yPos += 15;

      //  PURPOSE & WHY STATEMENTS
      const wsData = result.value.whyStatement;

      if (wsData) {
        // 1. Purpose Statement
        if (wsData.purposeStatement) {
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          doc.text("Purpose Statement:", margin, yPos);
          yPos += 6;

          doc.setFont("helvetica", "italic");
          doc.setFontSize(10);
          const purposeText = doc.splitTextToSize(wsData.purposeStatement, contentWidth);
          doc.text(purposeText, margin, yPos);

          yPos += (purposeText.length * 5) + 10;
        }

        if (wsData.whyStatement) {
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          doc.text("Why Statement:", margin, yPos);
          yPos += 6;

          doc.setFont("helvetica", "italic");
          doc.setFontSize(10);
          const whyText = doc.splitTextToSize(wsData.whyStatement, contentWidth);
          doc.text(whyText, margin, yPos);

          yPos += (whyText.length * 5) + 12;
        }
      }
      //  Q&A CARDS 
      const onboardingData = result.value.onboarding || [];

      // Design Settings
      const bgLightBlue = "#F0F8FF";
      const borderGray = "#CBD5E1";
      const bgWhite = "#FFFFFF";
      const lineHeight = 5;
      const paddingInside = 4;
      const cardGap = 5;

      onboardingData.forEach((item, index) => {

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        const qLines = doc.splitTextToSize(`${index + 1}. ${item.question}`, contentWidth - (paddingInside * 2));

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        const aLines = doc.splitTextToSize(item.answer || "No answer provided.", contentWidth - (paddingInside * 2) - 4);

        const qBlockHeight = (qLines.length * lineHeight) + paddingInside;
        const aBlockHeight = (aLines.length * lineHeight) + (paddingInside * 2);
        const totalCardHeight = 3 + qBlockHeight + 2 + aBlockHeight + 3;

        // Page Break Logic
        if (yPos + totalCardHeight > 285) {
          doc.addPage();
          yPos = 20;
        }

        // Draw Logic
        doc.setFillColor(bgLightBlue);
        doc.roundedRect(margin, yPos, contentWidth, totalCardHeight, 2, 2, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(20, 30, 50);
        doc.text(qLines, margin + paddingInside, yPos + 7);

        const answerBoxY = yPos + qBlockHeight + 2;
        doc.setFillColor(bgWhite);
        doc.setDrawColor(borderGray);
        doc.setLineWidth(0.1);
        doc.roundedRect(margin + 2, answerBoxY, contentWidth - 4, aBlockHeight, 1, 1, "FD");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(0);
        doc.text(aLines, margin + paddingInside + 2, answerBoxY + 7);

        yPos += totalCardHeight + cardGap;
      });

      doc.save(`${user?.firstName || "user"}.pdf`);

    } catch (err) {
      console.error("Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t-2 pt-8 mt-4 w-full">
      <h3>Download My Data</h3>
      <p className="text-base mb-4 mt-2 text-white">You can download a copy of all the personal data associated with your account. This includes your profile information, Questions, and answers data stored in our system.</p>
      <Button
        className="disabled:opacity-70 disabled:bg-[#01A0CC] disabled:border-none disabled:text-white whitespace-nowrap"
        standardBtn={"primary"}
        disabled={loading}
        onClick={handleFetch}
      >
        {loading ? "Generating..." : "Download"}
      </Button>
    </div>

  );
};

export default DownloadData;