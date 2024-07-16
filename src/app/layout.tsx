// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from '../components/themeContext'; // Adjust the import path if necessary

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
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
