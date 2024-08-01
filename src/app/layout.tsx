// src/app/layout.tsx
import Footer from "@/components/footer";
import "./globals.css";
import { ThemeProvider } from "./providers/themeContext"; // Adjust the import path if necessary

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
    <ThemeProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
}
