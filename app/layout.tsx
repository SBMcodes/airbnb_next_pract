/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import Modal from "./components/modals/Modal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import { SessionProvider } from "next-auth/react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Clone",
};

const nunitoFont = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${nunitoFont.className} antialiased`}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
