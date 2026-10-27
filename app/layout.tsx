import type { Metadata } from "next";
import {Nunito} from 'next/font/google';
import "./globals.css";
import Navbar from "./components/navbar/Navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
