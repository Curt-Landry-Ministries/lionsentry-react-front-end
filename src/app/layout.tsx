// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "./providers/themeContext"; // Adjust the import path if necessary
import { inter, astoria } from "../fonts/fonts";
import { UserStoreProvider } from "./providers/userContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import SupportFloater from "@/components/Global/SupportFloater";

export const metadata = {
  title: "Lionsentry",
  description: "Vision Statement Generator",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en" className={`${inter.variable} ${astoria.variable}`}>
        <body>
          <UserStoreProvider>{children}</UserStoreProvider>
          <SupportFloater />
        </body>
        <GoogleAnalytics gaId="G-MS69VFWLH5" />
      </html>
    </ThemeProvider>
  );
}
