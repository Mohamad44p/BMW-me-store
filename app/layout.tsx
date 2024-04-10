import { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";
import NavbarLayout from "./components/NavbarLayout";

const metadata: Metadata = {
  title: "BMW Landing Page",
  description: "BMW Landing Page built with Next.js and Tailwind CSS and gsap animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavbarLayout />
        {children}
      </body>
    </html>
  );
}
