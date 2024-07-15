import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
