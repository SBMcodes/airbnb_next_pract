/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Clone",
};

const nunitoFont = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoFont.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
