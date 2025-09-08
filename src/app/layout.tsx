import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "My Body Healer",
  description: "Natural and effective products for holistic wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Navbar /> 
        <main className="pt-20"> {/* ✅ Corrected self-closing tag */}
        {children}
        <Footer/></main> 
      </body>
    </html>
  );
}
