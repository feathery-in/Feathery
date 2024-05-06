import type { Metadata } from "next";
import "../globals.css";
import AuthProvider from "@/context/authProvider";

import "./layout.css";
import { ThemeProvider } from "@/context/themProvider";
import Footer from "@/components/public/footer";
import { Toaster } from "@/components/ui/toaster";
import SidBar from "@/components/SidBar";
import MobileNav from "@/components/MobilNav";
import Hader from "@/components/Hader";
import NavBar from "@/components/public/NavBar";
export const metadata: Metadata = {
  title: "Feathery",
  description: "Generated by Feathery",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <AuthProvider>
        <ThemeProvider>
          <body className="">
            <NavBar/>
            <div className="flex">
              <SidBar/>
              {children}
            </div>
            
            <MobileNav/>
            <Toaster/>
          </body>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
}
