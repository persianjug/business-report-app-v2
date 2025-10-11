import "./globals.css";
import { Inter } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";

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
        <ToastContainer
          position="bottom-right"
          hideProgressBar={true}
          theme="colored"
          transition={Bounce}
          closeOnClick={true}
        />
      </body>
    </html>
  );
}
