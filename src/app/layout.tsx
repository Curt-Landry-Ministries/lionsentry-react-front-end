// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "./providers/themeContext"; // Adjust the import path if necessary
import AnalyticsProvider from './providers/analyticsProvider';
import { inter, astoria } from "../fonts/fonts";

export const metadata = {
  title: "Lionsentry",
  description: "Vision Statement Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AnalyticsProvider>

    <ThemeProvider>
      <html lang="en" className={`${inter.variable} ${astoria.variable}`}>
        <body>{children}</body>
      </html>
    </ThemeProvider>
    </AnalyticsProvider>
  );
}
