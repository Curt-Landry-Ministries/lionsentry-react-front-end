// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "./providers/themeContext"; // Adjust the import path if necessary
import { inter, astoria ,poppins} from "../fonts/fonts";
import { UserStoreProvider } from "./providers/userContext";
import { GoogleTagManager } from "@next/third-parties/google";

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
      <html lang="en" className={`${inter.variable} ${astoria.variable} ${poppins?.variable}`}>
        <body>
          <UserStoreProvider>{children}</UserStoreProvider>
        </body>
        <GoogleTagManager gtmId="GTM-MXDZZH3D" />
      </html>
    </ThemeProvider>
  );
}
