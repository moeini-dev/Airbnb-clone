import type { Metadata } from "next";
import {Nunito} from 'next/font/google';
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import LoginModal from "./components/Modals/LoginModal";
import RentModal from "./components/Modals/RentModal";

const fontNunito = Nunito({subsets: ['latin']});

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "An Airbnb clone using Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className={`${fontNunito.className} min-h-full flex flex-col`}>
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
