/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";

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
        <ClientOnly>
          {/* <Modal isOpen title="Login" actionLabel="Submit" secondaryLabel="" /> */}
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
