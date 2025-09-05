import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

// Use Inter as your base font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hidden Spot Quotation System",
  description: "A simple quotation system for hidden spots.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        {/* Recoil state accessible to all children */}
        <Providers>
            {/* Main content grows to fill the remaining space */}
          <main className="flex-grow">
            {children}
          </main>
          </Providers>
      </body>
    </html>
  );
}
