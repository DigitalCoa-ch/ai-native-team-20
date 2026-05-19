import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Client Alert Dashboard — Team 20 Banking",
  description: "AI-powered financial stress monitoring for retail banking account managers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full min-h-full">{children}</body>
    </html>
  );
}