import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
// import AuthWrapper from "@/components/AuthWrapper";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "業務報告書管理システム",
  description: "業務報告書の作成、管理、エクスポートができるシステム",
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
        {/* <Header /> */}
        {/* <main className="pt-4"> */}
          {/* <AuthWrapper>{children}</AuthWrapper> */}
        {/* </main> */}
      </body>
    </html>
  );
}
